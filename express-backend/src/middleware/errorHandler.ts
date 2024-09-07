import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Log the error (you can replace this with a more sophisticated logging mechanism)
  console.error(`Error ${status}: ${message}`);
  console.error(err.stack);

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};

export default errorHandler;
