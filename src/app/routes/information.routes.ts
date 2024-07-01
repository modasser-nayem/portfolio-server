import { Router } from "express";
import informationControllers from "../controllers/information.controller";
import validateRequest from "../middlewares/validateRequest";
import informationValidationSchemas from "../validations/Information.validation";
import { upload } from "../utils/fileUpload";
import deleteExistingFile from "../middlewares/deleteExistingFile";

const router = Router();

// get information
router.get("/information", informationControllers.getInformation);

// introduction update
router.put(
  "/introduction",
  deleteExistingFile,
  upload.single("introduction"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(
    informationValidationSchemas.updateIntroductionValidationSchema,
  ),
  informationControllers.introductionUpdate,
);

// about update
router.put(
  "/about",
  deleteExistingFile,
  upload.single("about"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(informationValidationSchemas.updateAboutValidationSchema),
  informationControllers.aboutUpdate,
);

// contact info update
router.put(
  "/contact-info",
  validateRequest(
    informationValidationSchemas.updateContactInfoValidationSchema,
  ),
  informationControllers.contactInfoUpdate,
);

// sort description update
router.put(
  "/sort-descriptions",
  validateRequest(
    informationValidationSchemas.updateSortDescriptionValidationSchema,
  ),
  informationControllers.sortDescriptionUpdate,
);

export const informationRoutes = router;
