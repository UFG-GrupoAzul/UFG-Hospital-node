import {Router} from "express";
import {drugController} from "./drugs.controller";

const router = Router();

router.get("/", drugController.findAll);
router.get("/:id", drugController.verifyIfExists, drugController.findById);
router.post("/", drugController.create);
router.put("/:id", drugController.verifyIfExists, drugController.update);
router.delete("/:id", drugController.verifyIfExists, drugController.delete);

export default router;