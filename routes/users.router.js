import { Router } from "express";
import * as user from "../controllers/users.controller.js";
import * as fx from "../functions/index.js";
const router = Router()

router.use(fx.allowCredentialHeaders)
router.get('/contacts', fx.ifUserLogin, user.getContact)
router.post('/createuser', user.createUser)
router.get('/me', fx.ifUserLogin, user.getMyInfo)

export default router