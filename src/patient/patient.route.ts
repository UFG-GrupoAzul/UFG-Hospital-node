import {Router} from "express";
import {patientController} from "./patient.controller";
import {employeeController} from "../employees/employee.controller";


const router = Router();

router.post("/", patientController.create);
router.get("/", patientController.findAll);
router.get("/:id", patientController.verifyIfExists, patientController.findById);
router.put("/:id", patientController.verifyIfExists, patientController.update);
router.delete("/:id", patientController.verifyIfExists, patientController.delete);

export default router;
