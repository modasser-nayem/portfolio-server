import AppError from "../error/AppError";
import { TService } from "../interface/service.interface";
import Service from "../models/service.model";

const getAllServicesFromDB = async () => {
  const result = await Service.find();

  return result;
};

const createServiceIntoDB = async (data: TService) => {
  if (await Service.findOne({ name: data.name })) {
    throw new AppError(400, "Service name already exist!");
  }
  const countService = await Service.countDocuments();
  data.order = countService + 1;
  const result = await Service.create(data);

  return result;
};

const updateServiceIntoDB = async (id: string, data: Partial<TService>) => {
  if (!(await Service.findById(id))) {
    throw new AppError(404, "Service not found, invalid id");
  }
  if (await Service.findOne({ name: data.name })) {
    throw new AppError(400, "Service name already exist!");
  }
  const result = await Service.findByIdAndUpdate(id, data, { new: true });

  return result;
};

const deleteServiceIntoDB = async (id: string) => {
  if (!(await Service.findById(id))) {
    throw new AppError(404, "Service not found, invalid id");
  }
  await Service.findByIdAndDelete(id);

  return null;
};

const serviceServices = {
  getAllServicesFromDB,
  createServiceIntoDB,
  updateServiceIntoDB,
  deleteServiceIntoDB,
};

export default serviceServices;
