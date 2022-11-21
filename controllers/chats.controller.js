import e from "express";
import mongoose, { Types } from "mongoose";
import { chatSchema, userSchema } from "../database/schemas.js";
import { socket_uid } from "../index.js";
import { v2 as cloudinaryV2 } from "cloudinary";

const conversations = mongoose.model('conversations', chatSchema);
const users = mongoose.model('users', userSchema);


/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getConversations = async (req, res) => {
    const userChat = await conversations.find({
        chatter: { $in: [new Types.ObjectId(req.user.id)] }
    }, { conversations: 1 })
        .populate('chatter', ['username', 'nom', 'prenom'])
        .populate(['messages', 'latest'])
        .exec()
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
    console.log();// icic
    let cloudFile = null;
    if (req.file) {
        try {
            const base64_encoded = req.file.buffer.toString("base64")
            cloudFile = await cloudinaryV2.uploader.upload(`data:${req.file.mimetype};base64,${base64_encoded}`);
        } catch (error) {
            cloudFile = null
        }
    }
    // Verify if it is new conversation
    const conversation = await conversations.findOne({
        chatter: { $all: [req.user.id, req.body.he] }
    }).exec();
    // if it isn't new, 
    if (conversation) {
        // then just add message in existing conversation, 
        // and update the latest message
        await conversations.updateOne({ _id: conversation.id }, {
            $push: {
                messages: {
                    sender: req.user.id,
                    content: cloudFile ? cloudFile.url : req.body.text,
                    genre: cloudFile ? "image" : "text"
                }
            },
            $set: {
                latest: new Date()
            }
        }).exec();
        const allReceverSocket = socket_uid.filter(elm => elm.user_id == req.body.he);
        allReceverSocket.forEach(receverSocket => {
            receverSocket.s.emit("newUnreadMessage");
        })

        res.json({ message: "message add" })
    } else {
        // if it's new conversation,
        // verify if the two contact exist
        const chatter = await users.find({
            _id: {
                $in: [req.user.id, req.body.he]
            }
        }).exec()
        // if the two contacts are found
        if (chatter.length >= 2) {
            // then create their conversation
            const newChat = await new conversations({
                chatter: [req.user.id, req.body.he],
                code: "123456789",
                messages: [{
                    sender: req.user.id,
                    content: cloudFile ? cloudFile.url : req.body.text,
                    genre: cloudFile ? "image" : "text"
                }]
            }).save()

            // On ajout la reference chez l'utilisateur
            await users.updateMany({
                _id: { $in: [req.user.id, req.body.he] }
            }, {
                $push: { conversations: newChat.id }
            }).exec();
            const allReceverSocket = socket_uid.filter(elm => elm.user_id == req.body.he);
            socket_uid.forEach(elm => console.log(elm.user_id));
            allReceverSocket.forEach(receverSocket => {
                receverSocket.s.emit("newUnreadMessage");
            })
            res.json({ message: "conversations create, message saved" })
        } else {
            // if one or both are not found, just return
            res.json({ message: 'Unknown contact' })
        }
    }
};

