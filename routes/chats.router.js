import { Router } from "express";
import * as chats from '../controllers/chats.controller.js'
import { allowCredentialHeaders, ifUserLogin } from "../functions/index.js";
import multer from "multer";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.use(allowCredentialHeaders)
router.get('/:user/conversations', ifUserLogin, chats.getConversations);
router.get('/:user/c/:conversation', ifUserLogin, chats.getConversation);
router.post('/:user/send/', ifUserLogin, upload.single('myFile'), chats.sendMessage);

export default router;