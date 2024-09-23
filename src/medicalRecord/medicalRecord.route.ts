//import {transferDocumentController} from "./transferDocument.controller";
import {medicalRecordController} from "./medicalRecord.controller";
import {Router} from "express";


const router = Router();

//router.get("/", transferDocumentController.findAll);
//router.get("/:id", transferDocumentController.verifyIfExists, transferDocumentController.findById);
router.post("/", medicalRecordController.create);
//router.put("/:id", transferDocumentController.verifyIfExists, transferDocumentController.update);
//router.delete("/:id", transferDocumentController.verifyIfExists, transferDocumentController.delete);

export default router;