import { Router } from "express";
import * as chats from '../controllers/chats.controller.js'
import { allowCredentialHeaders, ifUserLogin } from "../functions/index.js";
const router = Router();

router.use(allowCredentialHeaders)
router.get('/:user/conversations', ifUserLogin, chats.getConversations);
router.get('/:user/c/:conversation', ifUserLogin, chats.getConversation);
router.get('/:user/send/', ifUserLogin, chats.sendMessage);

export default router;