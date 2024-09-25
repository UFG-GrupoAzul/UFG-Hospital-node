//import {transferDocumentController} from "./transferDocument.controller";
import {medicalRecordController} from "./medicalRecord.controller";
import {Router} from "express";


const router = Router();

router.get("/", medicalRecordController.findAll);
router.get("/:id", medicalRecordController.verifyIfExists, medicalRecordController.findById);
router.post("/", medicalRecordController.create);
router.put("/:id", medicalRecordController.verifyIfExists, medicalRecordController.update);
router.delete("/:id", medicalRecordController.verifyIfExists, medicalRecordController.delete);

export default router;