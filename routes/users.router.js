import { Router } from "express";
import * as user from "../controllers/users.controller.js";
import * as fx from "../functions/index.js";
const router = Router()

router.use(fx.allowCredentialHeaders)
router.get('/contacts', fx.ifUserLogin, user.getContact)
router.get('/createuser', fx.ifUserLogin, user.createUser)

export default router