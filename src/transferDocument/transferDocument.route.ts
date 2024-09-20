import {transferDocumentController} from "./transferDocument.controller";
import {Router} from "express";


const router = Router();

//router.get("/", doctorController.findAll);
//router.get("/:id", doctorController.verifyIfExists, doctorController.findById);
router.post("/", transferDocumentController.create);
//router.put("/:id", doctorController.verifyIfExists, doctorController.update);
//router.delete("/:id", doctorController.verifyIfExists, doctorController.delete);

export default router;