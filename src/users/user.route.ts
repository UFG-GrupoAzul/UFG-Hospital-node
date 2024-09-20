import {userController} from "./user.controller";
import {Router} from "express";


const router = Router();

router.get("/", userController.findAll);
router.get("/:id",  userController.verifyIfExists, userController.findById);
router.post("/",  userController.create);
router.put("/:id",  userController.verifyIfExists, userController.update);
router.delete("/:id",  userController.verifyIfExists, userController.delete);

export default router;