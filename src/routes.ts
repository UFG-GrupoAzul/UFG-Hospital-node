import {Router} from "express";
import userRoute from "./users/user.route";
import authRoute from "./auth/auth.route";
import {authController} from "./index";
import employeeRoute from "./employee/employee.route";

const router = Router();

router.use("/users",  userRoute);
router.use("/users", userRoute);
//router.use("/auth", authRoute);
router.use("/employees", employeeRoute)

export {router};
