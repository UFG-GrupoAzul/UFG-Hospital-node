import {Router} from "express";
import {prescribedDrugController} from "./prescribedDrug.controller";

const router = Router();

router.get("/", prescribedDrugController.findAll);
router.get("/:id", prescribedDrugController.verifyIfExists, prescribedDrugController.findById);
router.post("/", prescribedDrugController.create);
router.put("/:id", prescribedDrugController.verifyIfExists, prescribedDrugController.update);
router.delete("/:id", prescribedDrugController.verifyIfExists, prescribedDrugController.delete);

export default router;