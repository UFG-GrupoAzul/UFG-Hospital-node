import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import {authController} from "./index";

const router = Router();

router.use("/users", authController.authMiddleware, userRoute);
// router.use("/users", userRoute);
router.use("/auth", authRoute);

export {router};
