import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import skillValidationSchemas from "../validations/skill.validation";
import skillControllers from "../controllers/skill.controller";
import auth from "../middlewares/auth";

const router = Router();

// get all skill
router.get("/", skillControllers.getSkills);

// get single skill
router.get("/:id", skillControllers.getSingleSkills);

// add a skill
router.post(
  "/",
  auth(),
  validateRequest(skillValidationSchemas.createSkillValidationSchema),
  skillControllers.createNewSkill,
);

// update a skill
router.put(
  "/:id",
  auth(),
  validateRequest(skillValidationSchemas.updateSkillValidationSchema),
  skillControllers.updateSkill,
);

// delete a skill
router.delete("/:id", auth(), skillControllers.deleteSkill);

const skillRouter = router;
export default skillRouter;
