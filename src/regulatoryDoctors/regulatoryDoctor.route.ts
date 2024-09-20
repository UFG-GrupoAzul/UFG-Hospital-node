import {regulatoryDoctorController} from "./regulatoryDoctor.controller";
import {Router} from "express";

const router = Router();

router.get("/", regulatoryDoctorController.findAll);
router.get("/:id", regulatoryDoctorController.verifyIfExists, regulatoryDoctorController.findById);
router.post("/", regulatoryDoctorController.create);
router.put("/:id", regulatoryDoctorController.verifyIfExists, regulatoryDoctorController.update);
router.delete("/:id", regulatoryDoctorController.verifyIfExists, regulatoryDoctorController.delete);

export default router;