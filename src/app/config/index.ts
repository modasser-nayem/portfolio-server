import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  login_email: process.env.LOGIN_EMAIL,
  login_password: process.env.LOGIN_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expiresin: process.env.JWT_ACCESS_EXPIRESIN,
};
