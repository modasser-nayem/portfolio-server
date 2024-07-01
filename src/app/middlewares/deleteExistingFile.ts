import fs from "fs";
import AppError from "../error/AppError";
import path from "path";
import { RequestHandler } from "express";

const deleteExistingFile: RequestHandler = (req, res, next) => {
  const uploadDir = "./uploads";
  fs.readdir(uploadDir, (err, filles) => {
    if (err) {
      throw new AppError(500, "Server error");
    }
    filles.forEach((file) => {
      fs.unlink(path.join(uploadDir, file), (err) => {
        if (err) {
          console.log("Error deleting file");
        } else {
          console.log("Deleted file");
        }
      });
    });
  });
  next();
};

export default deleteExistingFile;
