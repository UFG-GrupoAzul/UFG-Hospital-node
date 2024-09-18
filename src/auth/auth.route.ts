import {authController} from "./auth.controller";
import {router} from "../routes";

router.post("/", authController.authenticate)
router.post("/admin", authController.createAdmin)

export default router;