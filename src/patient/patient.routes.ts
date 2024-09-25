import { Router } from "express";
import {patientController} from "./patient.controller";


const router = Router();

router.post("/", patientController.create);
router.get("/", patientController.findAll);
router.get("/:id", patientController.findById);
router.put("/:id", patientController.update);
router.delete("/:id", patientController.delete);

export default router;
