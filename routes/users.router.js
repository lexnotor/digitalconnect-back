import { Router } from "express";
import * as user from "../controllers/users.controller.js";

const router = Router()

router.get('/contacts', user.getContact)
router.get('/createuser', user.createUser)

export default router