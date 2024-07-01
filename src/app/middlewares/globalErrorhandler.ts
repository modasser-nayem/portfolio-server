import { ErrorRequestHandler } from "express";
import { config } from "../config";
import { ZodError } from "zod";
import { MulterError } from "multer";
import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues[0].message;
    error = err.issues.map((issue) => ({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid _id";
    error = {};
  } else if (err instanceof MulterError) {
    statusCode = 400;
    if (
      err.code === "LIMIT_FILE_SIZE" ||
      err.code === "LIMIT_UNEXPECTED_FILE"
    ) {
      message = "image could be lase then 1mb";
      error = null;
    } else {
      message = err.message;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errors: error,
    err: err,
    stack: config.node_env === "development" ? err.stack : null,
  });
};

export default globalErrorhandler;
