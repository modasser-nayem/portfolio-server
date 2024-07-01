import { Router } from "express";
import serviceControllers from "../controllers/service.controller";
import validateRequest from "../middlewares/validateRequest";
import serviceSchemaValidations from "../validations/service.validation";

const router = Router();

// get All services
router.get("/", serviceControllers.getAllServices);

// create new service
router.post(
  "/",
  validateRequest(serviceSchemaValidations.createServiceSchemaValidation),
  serviceControllers.createService,
);

// update service
router.put(
  "/:id",
  validateRequest(serviceSchemaValidations.updateServiceSchemaValidation),
  serviceControllers.updateService,
);

// delete service
router.delete("/:id", serviceControllers.deleteService);

const serviceRouter = router;
export default serviceRouter;
