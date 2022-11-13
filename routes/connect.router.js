import { Router } from "express";
import passport from "passport";
import { connectUser } from "../controllers/connect.controller.js";

const router = Router()

router.post('/', passport.authenticate('basic', { session: true }), connectUser)

export default router