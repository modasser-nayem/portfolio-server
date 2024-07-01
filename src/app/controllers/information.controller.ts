import informationServices from "../lib/information.service";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import sendResponse from "../utils/sendResponse";

const getInformation = catchAsyncHandler(async (req, res) => {
  const result = await informationServices.getInformationFormDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Information retrieved successfully",
    data: result,
  });
});

const introductionUpdate = catchAsyncHandler(async (req, res) => {
  const result = await informationServices.introductionUpdateIntoDB(
    req.file,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Introduction successfully updated",
    data: result,
  });
});

const aboutUpdate = catchAsyncHandler(async (req, res) => {
  const result = await informationServices.aboutUpdateIntoDB(
    req.file,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "About successfully updated",
    data: result,
  });
});

const contactInfoUpdate = catchAsyncHandler(async (req, res) => {
  const result = await informationServices.contactInfoUpdateInfoIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Contact info successfully updated",
    data: result,
  });
});

const sortDescriptionUpdate = catchAsyncHandler(async (req, res) => {
  const result = await informationServices.sortDescriptionUpdateIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sort Description successfully updated",
    data: result,
  });
});

const informationControllers = {
  getInformation,
  introductionUpdate,
  aboutUpdate,
  contactInfoUpdate,
  sortDescriptionUpdate,
};

export default informationControllers;
