import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import employeeRoute from "./employees/employee.route";
import specialtyRoute from "./specialties/specialty.route";
import {authController} from "./auth/auth.controller";
import hospitalRoute from "./hospital/hospital.route";
import roleRoute from "./roles/role.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", authController.authMiddleware, userRoute);
router.use("/employees", authController.authMiddleware, employeeRoute);
router.use("/specialties", authController.authMiddleware, specialtyRoute);
router.use("/roles", authController.authMiddleware, roleRoute);
router.use("/hospitals", authController.authMiddleware, hospitalRoute);

export {router};
