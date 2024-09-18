import {router} from "../routes";
import {employeeController} from "./employee.controller";

router.get("/",  employeeController.findAll);
router.get("/:id",  employeeController.verifyIfExists, employeeController.findById);
router.post("/",  employeeController.create);
router.put("/:id",  employeeController.verifyIfExists, employeeController.update);
router.delete("/:id",  employeeController.verifyIfExists, employeeController.delete);

export default router;