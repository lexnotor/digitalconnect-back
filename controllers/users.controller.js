import e from "express"
import mongoose from "mongoose"
import { userSchema } from "../database/schemas.js";
import { socket_uid } from "../index.js";

const users = mongoose.model('users', userSchema);

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getContact = (req, res) => {
    users.find({}, {
        nom: 1, prenom: 1, username: 1, email: 1, uri: 1
    }).exec()
        .then(resultat => {
            res.json(resultat)
        })
        .catch(dbError => {
            console.log(dbError);
        })
}
/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const createUser = (req, res) => {
    new users({
        username: req.body.username,
        password: req.body.psw,
        nom: req.body.nom,
        prenom: req.body.prenom,
    }).save()
        .then(resultat => console.log(resultat))
        .catch(err => console.log(err));
    res.json({})
}

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getMyInfo = async (req, res) => {
    const me = await users.findOne({
        _id: req.user.id
    }, { password: 0, tokkens: 0, }).exec()
    const userSocket = socket_uid.find(elm => elm.uid == req.query.uid);
    if (userSocket && !userSocket.user_id) userSocket.user_id = req.user.id
    res.status(200).json({
        id: me.id,
        image: me.image || 'none',
        email: me.email || 'none',
        nom: me.nom || 'none',
        prenom: me.prenom || 'none',
        username: me.username,
        groupes: me.groupes || [],
        conversation: me.conversations || []
    })
}

