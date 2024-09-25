import {transferController} from "./transfer.controller";
import {Router} from "express";

const router = Router();

router.post("/",  transferController.create);
router.get("/", transferController.findAll);
router.get("/:id",  transferController.verifyIfExists, transferController.findById);
router.put("/:id",  transferController.verifyIfExists, transferController.update);
router.delete("/:id",  transferController.verifyIfExists, transferController.delete);

export default router;