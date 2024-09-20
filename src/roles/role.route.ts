import {Router} from "express";
import {roleController} from "./role.controller";

const router = Router();

router.get("/", roleController.findAll);
router.get("/:id", roleController.verifyIfExists, roleController.findById);
router.post("/", roleController.create);
router.put("/:id", roleController.verifyIfExists, roleController.update);
router.delete("/:id", roleController.verifyIfExists, roleController.delete);

export default router;