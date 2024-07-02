import projectServices from "../lib/project.service";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import sendResponse from "../utils/sendResponse";

const getAllProject = catchAsyncHandler(async (req, res) => {
  const result = await projectServices.getAllProjectFromDB({
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects successfully retrieved",
    data: result,
  });
});

const getSingleProject = catchAsyncHandler(async (req, res) => {
  const result = await projectServices.getSingleProjectFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project successfully retrieved",
    data: result,
  });
});

const createProject = catchAsyncHandler(async (req, res) => {
  const result = await projectServices.createProjectIntoDB(req.file, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project is successfully Added",
    data: result,
  });
});

const updateProject = catchAsyncHandler(async (req, res) => {
  const result = await projectServices.updateProjectIntoDB(
    req.params.id,
    req.file,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project is successfully updated",
    data: result,
  });
});

const deleteProject = catchAsyncHandler(async (req, res) => {
  const result = await projectServices.deleteProjectIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project is successfully deleted",
    data: result,
  });
});

const projectControllers = {
  getAllProject,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
export default projectControllers;
