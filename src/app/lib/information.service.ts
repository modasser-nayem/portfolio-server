import AppError from "../error/AppError";
import {
  IAbout,
  IContactInfo,
  IIntroduction,
  ISortDescriptions,
} from "../interface/information.interface";
import Information from "../models/information.model";
import { uploadImageToCloudinary } from "../utils/fileUpload";

const getInformationFormDB = async () => {
  const result = await Information.findOne({}, { __v: 0, _id: 0 });
  return result;
};

const introductionUpdateIntoDB = async (
  file: any,
  data: Partial<IIntroduction>
) => {
  if (!data.image && file) {
    const cloudinaryResponse = await uploadImageToCloudinary(
      file.fieldname,
      file.path
    );
    if (!cloudinaryResponse?.secure_url) {
      throw new AppError(400, "Failed to update image, please try again.");
    }
    data.image = cloudinaryResponse?.secure_url;
  }

  await Information.updateOne(
    {},
    {
      $set: {
        name: data.name,
        title: data.title,
        "images.introduction": data.image,
      },
    },
    { upsert: true }
  );

  return null;
};

const aboutUpdateIntoDB = async (file: any, data: Partial<IAbout>) => {
  if (!data.image && file) {
    const cloudinaryResponse = await uploadImageToCloudinary(
      file.fieldname,
      file.path
    );
    if (!cloudinaryResponse?.secure_url) {
      throw new AppError(400, "Failed to update image, please try again.");
    }
    data.image = cloudinaryResponse.secure_url;
  }

  await Information.updateOne(
    {},
    {
      $set: {
        speech: data.speech,
        about: data.about,
        "images.about": data.image,
      },
    }
  );

  return null;
};

const contactInfoUpdateInfoIntoDB = async (data: Partial<IContactInfo>) => {
  const { socialMedia, ...primitiveData } = data;
  const modifyNewData: Record<string, any> = { ...primitiveData };

  if (socialMedia && Object.keys(socialMedia).length) {
    for (const [key, value] of Object.entries(socialMedia)) {
      modifyNewData[`socialMedia.${key}`] = value;
    }
  }

  await Information.updateOne({}, modifyNewData);

  return null;
};

const sortDescriptionUpdateIntoDB = async (
  data: Partial<ISortDescriptions>
) => {
  const modifyNewData: Record<string, any> = {};

  if (data && Object.keys(data).length) {
    for (const [key, value] of Object.entries(data)) {
      modifyNewData[`sortDescriptions.${key}`] = value;
    }
  }

  await Information.updateOne({}, modifyNewData);

  return null;
};

const informationServices = {
  getInformationFormDB,
  introductionUpdateIntoDB,
  aboutUpdateIntoDB,
  contactInfoUpdateInfoIntoDB,
  sortDescriptionUpdateIntoDB,
};
export default informationServices;
