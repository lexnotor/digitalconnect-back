import e from "express"
import mongoose from "mongoose"
import { userSchema } from "../database/schemas.js";

const contacts = mongoose.model('users', userSchema);

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getContact = (req, res) => {
    contacts.find().exec()
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
    new contacts({
        username: req.body.username,
        password: req.body.psw,
        nom: req.body.nom,
        prenom: req.body.prenom,
    }).save()
        .then(resultat => console.log(resultat))
        .catch(err => console.log(err));
    res.json({})
}