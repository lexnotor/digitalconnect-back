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
    if (req.body.username && req.body.psw && req.body.nom && req.body.prenom && req.body.email);
    else return res.status(405).json({ message: "Complete all Fields" });

    if (req.body.username.trim().length && req.body.psw.trim().length && req.body.nom.trim().length && req.body.prenom.trim().length && req.body.email.trim().length);
    else return res.status(402).json({ message: "Complete all Fields" });

    if (!/^[a-zA-Z0-9._]{5,}@[a-z0-9]{3,}\.[a-z]{2,10}$/.test(req.body.email.trim())) return res.status(403).json({ message: "Invalid Email" });

    new users({
        username: req.body.username,
        password: req.body.psw,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email
    }).save()
        .then(resultat => res.status(201).json({ message: "Utilisateur créé" }))
        .catch(err => res.status(201).json({ message: "Impossible de créer un utilisateur" }));
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

