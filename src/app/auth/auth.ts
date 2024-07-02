import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { z } from "zod";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import sendResponse from "../utils/sendResponse";
import { config } from "../config";
import AppError from "../error/AppError";
import jwtHelper from "../utils/jwtHelper";

export const authRoute = Router();

// login validation
const loginUserValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "Invalid email address" })
      .refine((value) => value !== "", { message: "email is required" }),
    password: z
      .string({ required_error: "password is required" })
      .refine((value) => value !== "", { message: "password is required" }),
  }),
});

// login type
export type TLoginUser = {
  email: string;
  password: string;
};

// controller
const loginController = catchAsyncHandler(async (req, res) => {
  const result = await loginServices(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully login",
    data: result,
  });
});

// service
const loginServices = async (data: TLoginUser) => {
  if (data.email !== config.login_email) {
    throw new AppError(404, "User not found!");
  }

  if (data.password !== config.login_password) {
    throw new AppError(400, "Password does't match");
  }

  const token = jwtHelper.generateToken(
    { email: data.email },
    config.jwt_access_secret as string,
    config.jwt_access_expiresin as string,
  );

  return {
    access_token: token,
  };
};

// login route
authRoute.post("/login", validateRequest(loginUserValidation), loginController);
