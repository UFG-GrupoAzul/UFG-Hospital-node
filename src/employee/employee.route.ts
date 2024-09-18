import { Router } from "express";
import {EmployeeController} from "./employee.controller";

const router = Router();
const employeeController = new EmployeeController();

router.get("/",  employeeController.findAll);
// router.get("/:id",  employeeController.verifyIfExists, employeeController.findById);
router.post("/",  employeeController.create);
// router.put("/:id",  employeeController.verifyIfExists, employeeController.update);
// router.delete("/:id",  employeeController.verifyIfExists, employeeController.delete);

export default router;