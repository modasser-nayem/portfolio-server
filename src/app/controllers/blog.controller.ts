import blogServices from "../lib/blog.service";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import sendResponse from "../utils/sendResponse";

const createBlog = catchAsyncHandler(async (req, res) => {
  const result = await blogServices.createBlogIntoDB(req.file, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog is successfully Added",
    data: result,
  });
});

const updateBlog = catchAsyncHandler(async (req, res) => {
  const result = await blogServices.updateBlogIntoDB(
    req.params.id,
    req.file,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog is successfully updated",
    data: result,
  });
});

const getAllBlog = catchAsyncHandler(async (req, res) => {
  const query = req.query;

  const result = await blogServices.getAllBlogFromDB({ query });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs successfully retrieved",
    data: result,
  });
});

const getSingleBlog = catchAsyncHandler(async (req, res) => {
  const result = await blogServices.getSingleBlogFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog successfully retrieved",
    data: result,
  });
});

const deleteBlog = catchAsyncHandler(async (req, res) => {
  const result = await blogServices.deleteBlogIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog is successfully deleted",
    data: result,
  });
});

const blogControllers = {
  getAllBlog,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
export default blogControllers;
