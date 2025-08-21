import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      process.env.DATABASE_URL ||
      "mongodb+srv://FaizanJaved246:Un5iMvxDdGOtknhq@cluster0.rnikvi2.mongodb.net/mern_ecommerce_pro";

    console.log("🔄 Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(mongoURI, {
      // MongoDB Atlas optimized settings
      serverSelectionTimeoutMS: 30000, // 30 seconds for Atlas
      socketTimeoutMS: 75000, // 75 seconds for Atlas
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain a minimum of 2 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    });

    // Connection event listeners
    mongoose.connection.on("connected", () => {
      console.log(
        `✅ MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`
      );
      console.log("☁️  Using cloud database - Atlas cluster");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️  MongoDB disconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("🔄 MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        console.error("❌ Error during MongoDB disconnection:", err);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // Retry connection after 5 seconds in development
    if (process.env.NODE_ENV === "development") {
      console.log("🔄 Retrying connection in 5 seconds...");
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

export default connectDB;
