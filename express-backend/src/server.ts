import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import routes from "./routes/index.js";
import connectDB from "./db/index.js";
import config from "./config/index.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => console.log(message.trim()),
    },
  }
);

app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use("/", routes);

// Use the centralized error handling middleware
app.use(errorHandler);

const port = config.port || 5000;
const server = app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server started on port: ${port}`);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
