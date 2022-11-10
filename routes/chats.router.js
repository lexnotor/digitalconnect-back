import { Router } from "express";
import * as chats from '../controllers/chats.controller.js'

const router = Router();

router.get('/:user/conversations', chats.getConversations);
router.get('/:user/c/:conversation', chats.getConversation);
router.get('/:user/send/', chats.sendMessage);

export default router;