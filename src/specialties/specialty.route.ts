import {specialtyController} from "./specialty.controller";
import {Router} from "express";

const router = Router();

router.get("/", specialtyController.findAll);
router.get("/:id", specialtyController.verifyIfExists, specialtyController.findById);
router.post("/", specialtyController.create);
router.put("/:id", specialtyController.verifyIfExists, specialtyController.update);
router.delete("/:id", specialtyController.verifyIfExists, specialtyController.delete);

export default router;