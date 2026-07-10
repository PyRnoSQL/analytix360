import type { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  const error: ApiError = new Error(`Not Found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message;

  console.error(`[ERROR] ${statusCode} - ${err.message}`, err.stack);

  res.status(statusCode).json({
    error: {
      message,
      code: err.code ?? "UNKNOWN_ERROR",
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
}
