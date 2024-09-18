import {Router} from "express";
import {SpecialtyController} from "./specialty.controller";

const router = Router();
const specialityController = new SpecialtyController();

router.get("/",  specialityController.findAll);
router.get("/:id",  specialityController.verifyIfExists, specialityController.findById);
router.post("/",  specialityController.create);
router.put("/:id",  specialityController.verifyIfExists, specialityController.update);
router.delete("/:id",  specialityController.verifyIfExists, specialityController.delete);

export default router;