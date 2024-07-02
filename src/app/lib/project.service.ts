import { QueryOptions } from "mongoose";
import AppError from "../error/AppError";
import { TProject } from "../interface/project.interface";
import Project from "../models/project.model";
import { uploadImageToCloudinary } from "../utils/fileUpload";
import { isNumeric } from "../utils/global";

const getAllProjectFromDB = async (payload: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: Record<string, any>;
}) => {
  const queryOptions: QueryOptions = {
    sort: {
      order: "desc",
    },
  };

  if (payload?.query?.limit && isNumeric(payload.query.limit)) {
    queryOptions.limit = Number(payload.query.limit);
  }

  const result = await Project.find(
    {},
    {
      _id: 1,
      title: 1,
      image: 1,
      about: 1,
      technology: 1,
      code: 1,
      preview: 1,
      order: 1,
    },
    queryOptions,
  );

  return result;
};

const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findById(id, {
    _id: 1,
    title: 1,
    image: 1,
    about: 1,
    description: 1,
    features: 1,
    technology: 1,
    code: 1,
    preview: 1,
    order: 1,
  });

  if (!result) {
    throw new AppError(404, "Project not found");
  }

  return result;
};

const createProjectIntoDB = async (file: any, data: TProject) => {
  if (await Project.findOne({ title: data.title })) {
    throw new AppError(400, "Project title is already exist!");
  }

  if (!file && !data.image) {
    throw new AppError(400, "image is required");
  }

  // upload image
  if (!data.image && file) {
    const cloudinaryResponse = await uploadImageToCloudinary(
      file.originalname,
      file.path,
    );
    if (!cloudinaryResponse?.secure_url) {
      throw new AppError(400, "Failed to update image, please try again.");
    }
    data.image = cloudinaryResponse.secure_url;
  }

  if (!data.order) {
    const countProject = await Project.countDocuments();
    data.order = countProject + 1;
  }

  const result = await Project.create(data);

  return result;
};

const updateProjectIntoDB = async (
  id: string,
  file: any,
  data: Partial<TProject>,
) => {
  if (!(await Project.findById(id))) {
    throw new AppError(404, "Project not found!");
  }

  // upload image
  if (!data.image && file) {
    const cloudinaryResponse = await uploadImageToCloudinary(
      file.fieldname,
      file.path,
    );
    if (!cloudinaryResponse?.secure_url) {
      throw new AppError(400, "Failed to update image, please try again.");
    }
    data.image = cloudinaryResponse.secure_url;
  }

  const { code, ...primitiveData } = data;

  const modifyNewData: Record<string, any> = { ...primitiveData };

  if (code && Object.keys(code).length) {
    for (const [key, value] of Object.entries(code)) {
      modifyNewData[`code.${key}`] = value;
    }
  }

  const result = await Project.findByIdAndUpdate(id, modifyNewData, {
    new: true,
  });

  return result;
};

const deleteProjectIntoDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, "Project not found!");
  }

  return null;
};

const projectServices = {
  getAllProjectFromDB,
  getSingleProjectFromDB,
  createProjectIntoDB,
  updateProjectIntoDB,
  deleteProjectIntoDB,
};
export default projectServices;
