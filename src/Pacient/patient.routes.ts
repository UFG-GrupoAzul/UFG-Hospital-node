import { Router } from "express";
import * as patientController from './patient.controller';

const router = Router();

router.post('/', patientController.createPatient);
router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

export default router;
