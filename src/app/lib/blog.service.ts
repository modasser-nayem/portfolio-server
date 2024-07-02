import { QueryOptions } from "mongoose";
import AppError from "../error/AppError";
import { TBlog } from "../interface/blog.interface";
import Blog from "../models/blog.model";
import { uploadImageToCloudinary } from "../utils/fileUpload";
import { isNumeric } from "../utils/global";

const createBlogIntoDB = async (file: any, data: TBlog) => {
  if (await Blog.findOne({ title: data.title })) {
    throw new AppError(400, "Blog title is already exist!");
  }

  if (!file && !data.thumbnail) {
    throw new AppError(400, "thumbnail is required");
  }

  // upload image
  if (!data.thumbnail && file) {
    const cloudinaryResponse = await uploadImageToCloudinary(
      file.filename,
      file.path,
    );
    if (!cloudinaryResponse?.secure_url) {
      throw new AppError(400, "Failed to update image, please try again.");
    }
    data.thumbnail = cloudinaryResponse.secure_url;
  }

  const result = await Blog.create(data);

  return result;
};

const updateBlogIntoDB = async (
  id: string,
  file: any,
  data: Partial<TBlog>,
) => {
  if (!(await Blog.findById(id))) {
    throw new AppError(404, "Blog not found!");
  }

  // upload image
  if (!data.thumbnail && file) {
    const cloudinaryResponse = await uploadImageToCloudinary(
      file.filename,
      file.path,
    );
    if (!cloudinaryResponse?.secure_url) {
      throw new AppError(400, "Failed to update image, please try again.");
    }
    data.thumbnail = cloudinaryResponse.secure_url;
  }

  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  });

  return result;
};

const getAllBlogFromDB = async (payload: { query?: Record<string, any> }) => {
  const query = payload?.query;

  const filter = query?.status ? { status: query.status } : {};

  const queryOptions: QueryOptions = {
    sort: {
      createdAt: "desc",
    },
  };

  if (query?.limit && isNumeric(query.limit)) {
    queryOptions.limit = Number(query.limit);
  }

  const result = await Blog.find(
    filter,
    {
      _id: 1,
      title: 1,
      thumbnail: 1,
      category: 1,
      status: 1,
      createdAt: 1,
    },
    queryOptions,
  );

  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id, {
    _id: 1,
    title: 1,
    thumbnail: 1,
    content: 1,
    category: 1,
    tags: 1,
    status: 1,
    createdAt: 1,
  });

  if (!result) {
    throw new AppError(404, "Blog not found");
  }

  return result;
};

const deleteBlogIntoDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, "Blog not found!");
  }

  return null;
};

const blogServices = {
  getAllBlogFromDB,
  getSingleBlogFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
export default blogServices;
