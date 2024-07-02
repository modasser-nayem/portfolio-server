import { config } from "../config";
import AppError from "../error/AppError";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import jwtHelper from "../utils/jwtHelper";

const auth = () => {
  return catchAsyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    const decodeUser = jwtHelper.verifyToken(
      token,
      config.jwt_access_secret as string,
    );

    const user = decodeUser.email === config.login_email;

    if (!user) {
      throw new AppError(401, "You are not authorized!");
    }
    req.user = decodeUser;

    next();
  });
};

export default auth;
