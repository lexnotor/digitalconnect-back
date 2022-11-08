import { Schema, Types } from "mongoose";

export const userRefenceSchema = new Schema({
    id: Types.ObjectId,
    nom: String,
    username: String,
    image: String,
    uri: String
})

export const chatReferenceSchema = new Schema({
    user: userRefenceSchema,
    id: Types.ObjectId,
    code: String
});

export const groupReferenceSchema = new Schema({
    id: Types.ObjectId,
    code: String,
    users: [userRefenceSchema]
})

export const userTokkenSchema = new Schema({
    content: String,
    default: new Date(Date.now() + 1000 * 60 * 60 * 24)
})

export const userSchema = new Schema({
    id: Types.ObjectId,
    nom: String,
    prenom: String,
    username: String,
    password: String,
    uri: String,
    image: String,
    tokkens: [userTokken],
    groupes: [groupReferenceSchema],
    conversations: [chatReferenceSchema]
})

export const groupeMessageSchema = new Schema({
    sender: userRefenceSchema,
    content: String,
    genre: String,
    readby: [userRefenceSchema],
    time: {
        type: Date,
        default: new Date()
    }
})

export const groupSchema = new Schema({
    id: Types,
    code: String,
    membres: [userRefenceSchema],
    latest: {
        type: Date,
        default: new Date()
    },
    chats: [groupeMessageSchema]
});

export const chatMessageSchema = new Schema({
    sender: userRefenceSchema,
    content: String,
    genre: String,
    read: Boolean,
    time: {
        type: Date,
        default: new Date()
    }
})


export const chatSchema = new Schema({
    id: Types.ObjectId,
    code: String,
    latest: {
        type: Date,
        default: new Date()
    },
    messages: [chatMessageSchema]
})