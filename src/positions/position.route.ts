import {Router} from "express";
import {positionController} from "./position.controller";

const router = Router();

router.get("/", positionController.findAll);
router.get("/:id", positionController.verifyIfExists, positionController.findById);
router.post("/", positionController.create);
router.put("/:id", positionController.verifyIfExists, positionController.update);
router.delete("/:id", positionController.verifyIfExists, positionController.delete);

export default router;