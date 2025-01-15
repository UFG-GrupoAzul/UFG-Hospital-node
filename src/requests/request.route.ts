import {Router} from "express";
import {requestController} from "./request.controller";

const router = Router();

router.get("/", requestController.findAll);
router.get("/:id", requestController.verifyIfExists, requestController.findById);
router.post("/", requestController.create);
router.put("/:id", requestController.verifyIfExists, requestController.update);
router.delete("/:id", requestController.verifyIfExists, requestController.delete);
router.put("/:id/completed", requestController.verifyIfExists, requestController.updateComplete);


export default router;