import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import employeeRoute from "./employees/employee.route";
import specialtyRoute from "./specialties/specialty.route";
import {authController} from "./auth/auth.controller";
import hospitalRoute from "./hospital/hospital.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/doctor", doctorRoute);
router.use("/employees", authController.authMiddleware, employeeRoute);
router.use("/hospitals", authController.authMiddleware, hospitalRoute);
router.use("/roles", authController.authMiddleware, roleRoute);
router.use("/specialties", authController.authMiddleware, specialtyRoute);
router.use("/regulatoryDoctors", authController.authMiddleware, regulatoryDoctorRoute);
router.use("/users", authController.authMiddleware, userRoute);

export {router};
