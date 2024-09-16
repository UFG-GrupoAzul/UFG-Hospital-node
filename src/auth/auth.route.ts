import { Router } from "express";
import {authController} from "../index";

const router = Router();

router.get("/", authController.authenticate);

export default router;