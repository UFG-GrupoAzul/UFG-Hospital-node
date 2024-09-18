import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import {authController} from "./index";
import employeeRoute from "./employee/employee.route";

const router = Router();

router.use("/auth", authRoute);
// router.use("/users", authController.authMiddleware, userRoute);
router.use("/users", userRoute);
router.use("/employees", employeeRoute)

export {router};
