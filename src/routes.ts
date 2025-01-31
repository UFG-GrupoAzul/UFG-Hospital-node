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
import transferRoute from "./transfer/transfer.route";
import transferDocumentRoute from "./transferDocument/transferDocument.route";
import medicalRecordRoute from "./medicalRecord/medicalRecord.route";
import patientRoutes from "./patient/patient.route";
import requestRoute from "./requests/request.route";
import prescribedDrugRoute from "./prescribleDrugs/prescribedDrug.route";
import enumsRoute from "./enums/enums.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", authController.authMiddleware, userRoute);
router.use("/doctors", authController.authMiddleware, doctorRoute);
router.use("/drugs", authController.authMiddleware, drugsRoute);
router.use("/employees", authController.authMiddleware, employeeRoute);
router.use("/enums", enumsRoute);
router.use("/hospitals", authController.authMiddleware, hospitalRoute);
router.use("/medrecords", authController.authMiddleware, medicalRecordRoute);
router.use("/patients", authController.authMiddleware, patientRoutes);
router.use("/prescribedDrugs", authController.authMiddleware, prescribedDrugRoute);
router.use("/regulatoryDoctors", authController.authMiddleware, regulatoryDoctorRoute);
router.use("/requests", authController.authMiddleware, requestRoute);
router.use("/roles", authController.authMiddleware, roleRoute);
router.use("/specialties", authController.authMiddleware, specialtyRoute);
router.use("/transferdocs", authController.authMiddleware, transferDocumentRoute);
router.use("/transfers", authController.authMiddleware, transferRoute);

export {router};
