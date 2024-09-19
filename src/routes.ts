import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import employeeRoute from "./employees/employee.route";
import specialtyRoute from "./specialties/specialty.route";
import {authController} from "./auth/auth.controller";
import hospitalRoute from "./hospital/hospital.route";
import regulatoryDoctorRoute from "./regulatoryDoctors/regulatoryDoctor.route";

const router = Router();

router.use("/auth", authRoute);
//router.use("/users", userRoute);
router.use("/users", authController.authMiddleware, userRoute);
router.use("/employees", authController.authMiddleware, employeeRoute);
router.use("/regulatoryDoctors", authController.authMiddleware, regulatoryDoctorRoute);
router.use("/specialties", authController.authMiddleware, specialtyRoute);
router.use("/hospital", authController.authMiddleware, hospitalRoute);

export {router};
