import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import { config } from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const uploadImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName, folder: "portfolio", timeout: 30000 },
      function (error, result) {
        if (error) {
          reject(error);
          // fs.unlink(path, (err) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log("File is deleted.");
          //   }
          // });
        }
        resolve(result);
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File is deleted.");
          }
        });
      },
    );
  });
};

// export const uploadImageToCloudinary = async (
//   imageName: string,
//   imagePath: string,
// ) => {
//   // const result = await cloudinary.uploader.upload(imagePath, {
//   //   public_id: imageName.trim(),
//   //   folder: "portfolio",
//   //   timestamp: 100000,
//   // });
//   fs.unlink(imagePath, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File is deleted.");
//     }
//   });

//   return { secure_url: imagePath };
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
