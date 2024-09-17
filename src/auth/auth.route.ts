import { Router } from "express";
import {authController} from "../index";

const router = Router();

router.post("/", authController.authenticate);

export default router;