import skillServices from "../lib/skill.service";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import sendResponse from "../utils/sendResponse";

const getSkills = catchAsyncHandler(async (req, res) => {
  const query = req.query;

  const result = await skillServices.getSkillsFormDB({ query });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  });
});

const getSingleSkills = catchAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const result = await skillServices.getSingleSkillFormDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  });
});

const createNewSkill = catchAsyncHandler(async (req, res) => {
  const result = await skillServices.createNewSkillIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Skill is successfully created",
    data: result,
  });
});

const updateSkill = catchAsyncHandler(async (req, res) => {
  const result = await skillServices.updateSkillIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill is successfully updated",
    data: result,
  });
});

const deleteSkill = catchAsyncHandler(async (req, res) => {
  const result = await skillServices.deleteSkillIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill is successfully deleted",
    data: result,
  });
});

const skillControllers = {
  getSkills,
  getSingleSkills,
  createNewSkill,
  updateSkill,
  deleteSkill,
};

export default skillControllers;
