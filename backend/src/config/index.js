import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Application Configuration
 * Centralized configuration for easy deployment management
 */
const config = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    host: process.env.HOST || "localhost",
    apiVersion: process.env.API_VERSION || "v1",
  },

  // Database Configuration
  database: {
    mongoUri:
      process.env.MONGO_URI ||
      process.env.DATABASE_URL ||
      "mongodb://localhost:27017/mern_ecommerce_pro",
    options: {
      serverSelectionTimeoutMS: parseInt(process.env.DB_TIMEOUT) || 5000,
      maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE) || 10,
      minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE) || 5,
    },
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    issuer: process.env.JWT_ISSUER || "EliteShop",
    algorithm: process.env.JWT_ALGORITHM || "HS256",
  },

  // Security Configuration
  security: {
    cookieSecure: process.env.COOKIE_SECURE === "true",
    cookieHttpOnly: true,
    cookieSameSite: process.env.COOKIE_SAME_SITE || "lax",
    corsOrigins: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",")
      : [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:5173",
        ],
    trustProxy: process.env.TRUST_PROXY === "true",
    helmetConfig: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
            "https://cdnjs.cloudflare.com",
            "https://kit.fontawesome.com",
          ],
          scriptSrc: [
            "'self'",
            "https://js.stripe.com",
            "https://kit.fontawesome.com",
          ],
          fontSrc: [
            "'self'",
            "https://fonts.gstatic.com",
            "https://cdnjs.cloudflare.com",
            "https://ka-f.fontawesome.com",
          ],
          imgSrc: ["'self'", "data:", "https:", "http:"],
          connectSrc: [
            "'self'",
            "https://api.stripe.com",
            "https://ka-f.fontawesome.com",
          ],
          frameSrc: ["https://js.stripe.com"],
        },
      },
      crossOriginEmbedderPolicy: false,
    },
  },

  // Rate Limiting Configuration
  rateLimiting: {
    general: {
      windowMs:
        parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
      message: {
        error: "Too many requests from this IP, please try again later.",
      },
    },
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.AUTH_RATE_LIMIT) || 5,
      message: {
        error: "Too many authentication attempts, please try again later.",
      },
    },
    api: {
      windowMs:
        parseInt(process.env.API_RATE_LIMIT_WINDOW) * 60 * 1000 ||
        15 * 60 * 1000,
      max: parseInt(process.env.API_RATE_LIMIT_MAX) || 1000,
    },
  },

  // Payment Configuration (Stripe)
  payment: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      currency: process.env.STRIPE_CURRENCY || "usd",
      isDemo:
        !process.env.STRIPE_SECRET_KEY ||
        process.env.STRIPE_SECRET_KEY.includes("demo") ||
        process.env.STRIPE_SECRET_KEY.includes("xxx"),
    },
  },

  // File Upload Configuration
  upload: {
    path: process.env.UPLOAD_PATH || "./uploads",
    maxSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    allowedTypes: process.env.ALLOWED_FILE_TYPES
      ? process.env.ALLOWED_FILE_TYPES.split(",")
      : ["image/jpeg", "image/png", "image/webp", "image/gif"],
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      enabled: !!(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET &&
        !process.env.CLOUDINARY_CLOUD_NAME.includes("demo")
      ),
    },
  },

  // Email Configuration
  email: {
    from: process.env.EMAIL_FROM || "noreply@eliteshop.com",
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    enabled: !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ),
  },

  // Redis Configuration (for sessions/caching)
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    enabled: !!process.env.REDIS_URL,
    options: {
      retry_unfulfilled_commands: true,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    },
  },

  // AWS Configuration (for S3 uploads)
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || "us-east-1",
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
      enabled: !!(
        process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_SECRET_ACCESS_KEY &&
        process.env.AWS_S3_BUCKET &&
        !process.env.AWS_ACCESS_KEY_ID.includes("demo")
      ),
    },
  },

  // Client Configuration
  client: {
    url: process.env.CLIENT_URL || "http://localhost:5173",
    adminUrl:
      process.env.ADMIN_URL ||
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.LOG_FORMAT || "combined",
    file: {
      enabled: process.env.LOG_TO_FILE === "true",
      filename: process.env.LOG_FILENAME || "app.log",
      maxSize: process.env.LOG_MAX_SIZE || "10m",
      maxFiles: parseInt(process.env.LOG_MAX_FILES) || 5,
    },
  },

  // Feature Flags
  features: {
    enableReviews: process.env.ENABLE_REVIEWS !== "false",
    enableWishlist: process.env.ENABLE_WISHLIST !== "false",
    enableNotifications: process.env.ENABLE_NOTIFICATIONS === "true",
    enableAnalytics: process.env.ENABLE_ANALYTICS === "true",
    enableCache: process.env.ENABLE_CACHE === "true",
    enableWebhooks: process.env.ENABLE_WEBHOOKS !== "false",
  },

  // Admin Configuration
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@eliteshop.com",
    password: process.env.ADMIN_PASSWORD || "admin123456",
    name: process.env.ADMIN_NAME || "Admin User",
    role: "admin",
  },

  // Development/Debug Configuration
  debug: {
    enabled:
      process.env.DEBUG === "true" || process.env.NODE_ENV === "development",
    logQueries: process.env.DEBUG_QUERIES === "true",
    logRequests: process.env.DEBUG_REQUESTS === "true",
  },
};

// Validation function
export const validateConfig = () => {
  const errors = [];

  // Required environment variables for production
  if (config.server.nodeEnv === "production") {
    const requiredVars = ["JWT_SECRET", "MONGO_URI"];

    requiredVars.forEach((varName) => {
      if (
        !process.env[varName] ||
        process.env[varName].includes("demo") ||
        process.env[varName].includes("change")
      ) {
        errors.push(
          `${varName} is required for production and should not contain demo values`
        );
      }
    });

    // Warn about demo configurations
    if (config.payment.stripe.isDemo) {
      console.warn("⚠️  Using demo Stripe configuration in production mode");
    }

    if (!config.upload.cloudinary.enabled && !config.aws.s3.enabled) {
      console.warn(
        "⚠️  No cloud storage configured. File uploads will be stored locally."
      );
    }
  }

  return errors;
};

// Get configuration with environment-specific overrides
export const getConfig = () => {
  const errors = validateConfig();

  if (errors.length > 0) {
    console.error("❌ Configuration errors:");
    errors.forEach((error) => console.error(`   ${error}`));

    if (config.server.nodeEnv === "production") {
      throw new Error("Invalid configuration for production");
    }
  }

  // Log configuration status
  if (config.debug.enabled) {
    console.log("⚙️  Configuration loaded:");
    console.log(`   Environment: ${config.server.nodeEnv}`);
    console.log(`   Port: ${config.server.port}`);
    console.log(
      `   Database: ${config.database.mongoUri.replace(
        /\/\/.*@/,
        "//***:***@"
      )}`
    );
    console.log(
      `   Stripe: ${config.payment.stripe.isDemo ? "Demo Mode" : "Live Mode"}`
    );
    console.log(
      `   Cloudinary: ${
        config.upload.cloudinary.enabled ? "Enabled" : "Disabled"
      }`
    );
    console.log(`   Email: ${config.email.enabled ? "Enabled" : "Disabled"}`);
    console.log(`   Redis: ${config.redis.enabled ? "Enabled" : "Disabled"}`);
  }

  return config;
};

export default config;
