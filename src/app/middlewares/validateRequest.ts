import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsyncHandler from "../utils/catchAsyncHandler";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req);
      const result = await schema.parseAsync({
        body: req.body,
      });
      req.body = result.body;
      next();
    },
  );
};

export default validateRequest;
