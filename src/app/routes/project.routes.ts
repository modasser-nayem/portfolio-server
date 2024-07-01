import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import projectSchemaValidations from "../validations/project.validation";
import projectControllers from "../controllers/project.controller";
import { upload } from "../utils/fileUpload";
import deleteExistingFile from "../middlewares/deleteExistingFile";

const router = Router();

// get all project
router.get("/", projectControllers.getAllProject);

// get single project
router.get("/:id", projectControllers.getSingleProject);

// create new project
router.post(
  "/",
  deleteExistingFile,
  upload.single("image"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(projectSchemaValidations.createProjectSchemaValidation),
  projectControllers.createProject
);

// update project
router.put(
  "/:id",
  deleteExistingFile,
  upload.single("image"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(projectSchemaValidations.updateProjectSchemaValidation),
  projectControllers.updateProject
);

// delete project
router.delete("/:id", projectControllers.deleteProject);

const projectRouter = router;
export default projectRouter;
