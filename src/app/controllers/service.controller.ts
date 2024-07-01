import serviceServices from "../lib/service.service";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import sendResponse from "../utils/sendResponse";

const getAllServices = catchAsyncHandler(async (req, res) => {
  const result = await serviceServices.getAllServicesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all services",
    data: result,
  });
});

const createService = catchAsyncHandler(async (req, res) => {
  const result = await serviceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Service is successfully created",
    data: result,
  });
});

const updateService = catchAsyncHandler(async (req, res) => {
  const result = await serviceServices.updateServiceIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service is successfully updated",
    data: result,
  });
});

const deleteService = catchAsyncHandler(async (req, res) => {
  const result = await serviceServices.deleteServiceIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service is successfully deleted",
    data: result,
  });
});

const serviceControllers = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};

export default serviceControllers;
