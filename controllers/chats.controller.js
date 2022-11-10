import e from "express";
import mongoose, { Types } from "mongoose";
import { chatSchema, userSchema } from "../database/schemas.js";

const conversations = mongoose.model('conversations', chatSchema);
const users = mongoose.model('users', userSchema);


/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getConversations = async (req, res) => {
    const userChat = await users.findOne({
        _id: Types.ObjectId(req.params.user),
        code: req.body.code
    }, { conversations: 1 }).exec()
    res.json(userChat)
};

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getConversation = (req, res) => {
    conversations.find().exec()
        .then(resultat => {
            res.json(resultat)
        })
        .catch(dbError => {
            console.log(dbError);
        })
};

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const sendMessage = async (req, res) => {
    // Verify if it is new conversation
    const conversation = await conversations.findOne({
        chatter: { $all: [req.body.me, req.body.he] }
    }).exec();
    // if it isn't new, 
    if (conversation) {
        // then just add message in existing conversation, 
        // and update the latest message
        await conversations.updateOne({ _id: conversation.id }, {
            $push: {
                messages: {
                    sender: req.body.me,
                    content: req.body.text
                }
            },
            $set: {
                latest: new Date()
            }
        }).exec();
        res.json({ message: "message add" })
    } else {
        // if it's new conversation,
        // verify if the two contact exist
        const chatter = await users.find({
            _id: {
                $in: [req.body.me, req.body.he]
            }
        }).exec()
        // if the two contacts are found
        if (chatter.length >= 2) {
            // then create their conversation
            const newChat = await new conversations({
                chatter: [req.body.me, req.body.he],
                code: "123456789",
                messages: [{
                    sender: req.body.me,
                    content: req.body.text
                }]
            }).save()

            // On ajout la reference chez l'utilisateur
            await users.updateMany({
                _id: { $in: [req.body.me, req.body.he] }
            }, {
                $push: { conversations: newChat.id }
            }).exec();

            res.json({ message: "conversations create, message saved" })
        } else {
            // if one or both are not found, just return
            res.json({ message: 'Unknown contact' })
        }
    }
};
