import { Router } from "express";
import multer from "multer";
import * as user from "../controllers/users.controller.js";
import * as fx from "../functions/index.js";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() })

router.use(fx.allowCredentialHeaders)
router.get('/contacts', fx.ifUserLogin, user.getContact)
router.post('/createuser', user.createUser)
router.get('/me', fx.ifUserLogin, user.getMyInfo)
router.post('/profile/image', fx.ifUserLogin, upload.single('myimage'), user.changePicture)

export default router