import { Router } from "express";
import {authController} from "../index";

const router = Router();


router.post("/", authController.authenticate)
router.post("/admin", authController.createAdmin)

export default router;