import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import {authController} from "./index";
import employeeRoute from "./employees/employee.route";
import specialtyRoute from "./specialties/specialty.route";

const router = Router();

router.use("/users", authController.authMiddleware, userRoute);
//router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/employees", authController.authMiddleware, employeeRoute);
router.use("/specialties", authController.authMiddleware, specialtyRoute);

export {router};
