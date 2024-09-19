import {hospitalController} from './hospital.controller';
import {Router} from "express";

const router = Router();

router.get("/",  hospitalController.findAll);
router.get("/:id",  hospitalController.verifyIfExists, hospitalController.findById);
router.post("/",  hospitalController.create);
router.put("/:id",  hospitalController.verifyIfExists, hospitalController.update);
router.delete("/:id",  hospitalController.verifyIfExists, hospitalController.delete);

export default router;
