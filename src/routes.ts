import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import employeeRoute from "./employees/employee.route";
import specialtyRoute from "./specialties/specialty.route";
import {authController} from "./auth/auth.controller";
import hospitalRoute from "./hospital/hospital.route";
import roleRoute from "./roles/role.route";
import drugsRoute from "./drugs/drugs.route";
import regulatoryDoctorRoute from "./regulatoryDoctors/regulatoryDoctor.route";
import doctorRoute from "./doctor/doctor.route";
import transferDocumentRoute from "./transferDocument/transferDocument.route";
import medicalRecordRoute from "./medicalRecord/medicalRecord.route";


const router = Router();

router.use("/auth", authRoute);
router.use("/doctor", doctorRoute);
router.use("/employees", authController.authMiddleware, employeeRoute);
router.use("/hospitals", authController.authMiddleware, hospitalRoute);
router.use("/roles", authController.authMiddleware, roleRoute);
router.use("/specialties", authController.authMiddleware, specialtyRoute);
router.use("/regulatoryDoctors", authController.authMiddleware, regulatoryDoctorRoute);
router.use("/users", authController.authMiddleware, userRoute);
router.use("/drugs", authController.authMiddleware, drugsRoute);
router.use("/transferdoc", transferDocumentRoute);
router.use("/medrecord", medicalRecordRoute);

export {router};
