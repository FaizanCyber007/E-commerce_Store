// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import connectDB from "./src/config/db.js";
import { getConfig } from "./src/config/index.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import stripeRoutes from "./src/routes/stripeRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import heroRoutes from "./src/routes/heroRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import dealRoutes from "./src/routes/dealRoutes.js";

dotenv.config();
const config = getConfig();

const app = express();
app.set("trust proxy", config.security.trustProxy);

// ---------- Security & utilities ----------
if (config.security && config.security.helmetConfig) {
  app.use(helmet(config.security.helmetConfig));
} else {
  app.use(helmet());
}
app.use(compression());

// ---------- CORS ----------
const frontendOrigin =
  (config.server && config.server.frontendOrigin) || "http://localhost:5173";

const corsOptions =
  config.server && config.server.nodeEnv === "development"
    ? {
        origin: (origin, callback) => {
          if (!origin) return callback(null, true); // allow curl / native apps
          return callback(null, true); // dev = permissive
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        optionsSuccessStatus: 200,
      }
    : {
        origin: frontendOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        optionsSuccessStatus: 200,
      };

console.log("🌐 CORS mode:", config.server?.nodeEnv);
app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (!res.getHeader("Access-Control-Allow-Origin")) {
    res.header(
      "Access-Control-Allow-Origin",
      req.headers.origin || frontendOrigin || "*"
    );
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ---------- Rate limiting ----------
const generalLimiter = rateLimit({
  ...config.rateLimiting.general,
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  ...config.rateLimiting.auth,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// ---------- Mongo Sanitize (manual fix for Express 5) ----------
app.use((req, res, next) => {
  try {
    if (req.body) req.body = mongoSanitize.sanitize(req.body);
    if (req.params) req.params = mongoSanitize.sanitize(req.params);

    // ✅ safer approach for req.query sanitization
    if (req.query && Object.keys(req.query).length > 0) {
      try {
        const sanitizedQuery = mongoSanitize.sanitize(req.query);
        Object.keys(req.query).forEach((key) => {
          if (req.query[key] !== sanitizedQuery[key]) {
            delete req.query[key];
            if (sanitizedQuery[key] !== undefined) {
              req.query[key] = sanitizedQuery[key];
            }
          }
        });
      } catch (queryErr) {
        // If query sanitization fails, continue without it
        console.warn("Query sanitization skipped:", queryErr.message);
      }
    }
  } catch (err) {
    console.error("Sanitization error:", err);
  }
  next();
});

// Other security middleware
app.use(hpp());

// ---------- Logging ----------
if (config.server.nodeEnv === "development") {
  app.use(morgan(config.logging.format || "dev"));
}

// ---------- Parsers ----------
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(cookieParser());

// ---------- Connect DB ----------
try {
  await connectDB();
  console.log("✅ Database connected");
} catch (err) {
  console.error("❌ Database connection failed:", err);
}

// ---------- Request normalization ----------
app.use((req, res, next) => {
  req.parsedQuery = { ...(req.query || {}) };

  try {
    if (
      typeof req.parsedQuery.search !== "undefined" &&
      !req.parsedQuery.keyword
    ) {
      req.parsedQuery.keyword = req.parsedQuery.search;
    }

    if (req.parsedQuery.rating) {
      const rv = Number(req.parsedQuery.rating);
      if (!Number.isNaN(rv)) req.parsedQuery.rating = rv;
    }

    if (
      req.parsedQuery.priceRange &&
      typeof req.parsedQuery.priceRange === "string"
    ) {
      const pr = req.parsedQuery.priceRange.trim();
      if (pr.includes("-")) {
        const [min, max] = pr.split("-").map((s) => Number(s));
        if (!Number.isNaN(min)) req.parsedQuery.priceMin = min;
        if (!Number.isNaN(max)) req.parsedQuery.priceMax = max;
      } else {
        const val = Number(pr);
        if (!Number.isNaN(val)) {
          req.parsedQuery.priceMin = val;
          req.parsedQuery.priceMax = Number.MAX_SAFE_INTEGER;
        }
      }
    }

    if (req.parsedQuery.page) {
      const p = Number(req.parsedQuery.page);
      if (!Number.isNaN(p)) req.parsedQuery.page = p;
    }
    if (req.parsedQuery.limit) {
      const l = Number(req.parsedQuery.limit);
      if (!Number.isNaN(l)) req.parsedQuery.limit = l;
    }
  } catch (e) {
    console.warn("Request normalization warning:", e);
  }

  next();
});

// ---------- Health & config endpoints ----------
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "EliteShop API running",
    version: "2.0.0",
    environment: config.server.nodeEnv,
    timestamp: new Date().toISOString(),
    features: {
      stripe: config.payment.stripe.isDemo ? "demo" : "live",
      cloudinary: config.upload.cloudinary.enabled,
      email: config.email.enabled,
      redis: config.redis.enabled,
    },
  });
});

app.get("/api/config", (req, res) => {
  res.json({
    stripe: {
      publishableKey: config.payment.stripe.publishableKey,
      isDemo: config.payment.stripe.isDemo,
    },
    upload: {
      maxSize: config.upload.maxSize,
      allowedTypes: config.upload.allowedTypes,
    },
    features: config.features,
  });
});

// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stripe", stripeRoutes);

// ---------- 404 & error handlers ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Graceful shutdown ----------
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

const PORT = config.server.port || process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
🚀 EliteShop API Server running in ${config.server.nodeEnv} mode
📡 Port: ${PORT}
🔗 URL: http://${config.server.host || "localhost"}:${PORT}
⏰ Started at: ${new Date().toISOString()}
  `);
});

// ---------- Unhandled rejections ----------
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  server.close(() => process.exit(1));
});

export default app;
