import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import blogSchemaValidations from "../validations/blog.validation";
import blogControllers from "../controllers/blog.controller";
import { upload } from "../utils/fileUpload";
import deleteExistingFile from "../middlewares/deleteExistingFile";

const router = Router();

// create new blog
router.post(
  "/",
  deleteExistingFile,
  upload.single("image"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(blogSchemaValidations.createBlogSchemaValidation),
  blogControllers.createBlog
);

// update blog
router.put(
  "/:id",
  deleteExistingFile,
  upload.single("image"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(blogSchemaValidations.updateBlogSchemaValidation),
  blogControllers.updateBlog
);

// get all blog
router.get("/", blogControllers.getAllBlog);

// get single blog
router.get("/:id", blogControllers.getSingleBlog);

// delete blog
router.delete("/:id", blogControllers.deleteBlog);

const blogRouter = router;
export default blogRouter;
