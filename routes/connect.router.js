import { Router } from "express";
import passport from "passport";
import { connectUser, disConnectUser } from "../controllers/connect.controller.js";
import * as fx from "../functions/index.js";

const router = Router()
router.use(fx.allowCredentialHeaders)
router.post('/', passport.authenticate('basic', { session: true, failureMessage: "User Not" }), connectUser)
router.post('/logout', disConnectUser)

export default router