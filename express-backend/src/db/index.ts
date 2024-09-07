import mongoose from "mongoose";
import config from "../config/index.js";

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

const connectDB = async (retryCount = 0): Promise<void> => {
  const mongoUri = config.mongoUri;
  if (!mongoUri) {
    console.error("MONGO_URI is not defined in the environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      // Optimized connection pooling options
      maxPoolSize: 100, // Increase max connections for high-traffic scenarios
      minPoolSize: 5, // Maintain a minimum of 5 connections
      maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
      connectTimeoutMS: 10000, // Connection timeout after 10 seconds
    });
    console.log("MongoDB connected with optimized pooling");

    // Listen for termination signals to close the connection gracefully
    process.on("SIGINT", closeConnection);
    process.on("SIGTERM", closeConnection);
  } catch (err) {
    console.error(
      `Error connecting to MongoDB (attempt ${retryCount + 1}):`,
      err
    );
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
      setTimeout(() => connectDB(retryCount + 1), RETRY_INTERVAL);
    } else {
      console.error("Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};

const closeConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection", err);
    process.exit(1);
  }
};

export default connectDB;
