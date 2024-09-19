import {authController} from "./auth.controller";
import {Router} from "express";

const router = Router();


router.post("/", authController.authenticate)
router.post("/admin", authController.createAdmin)

export default router;