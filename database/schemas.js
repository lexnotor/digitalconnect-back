import { Schema, Types } from "mongoose";



export const userSchema = new Schema({
    nom: String,
    prenom: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uri: String,
    image: String,
    tokkens: [{
        content: String,
        time: {
            type: Date,
            default: new Date(Date.now() + 1000 * 60 * 60 * 24)
        }
    }],
    groupes: [{
        type: Types.ObjectId,
        ref: 'groups'
    }],
    conversations: [{
        type: Types.ObjectId,
        ref: 'conversations'
    }]
})


export const groupeMessageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'users'
    },
    content: String,
    genre: String,
    readby: [{
        type: Types.ObjectId,
        ref: 'users'
    }],
    time: {
        type: Date,
        default: new Date()
    }
})

export const groupSchema = new Schema({
    code: String,
    membres: [{
        type: Types.ObjectId,
        ref: 'users'
    }],
    latest: {
        type: Date,
        default: new Date()
    },
    chats: [groupeMessageSchema]
});


export const chatMessageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'users'
    },
    content: String,
    genre: {
        type: String,
        default: 'text'
    },
    read: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: new Date()
    }
})

export const chatSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    chatter: {
        type: [Types.ObjectId],
        ref: 'users',
        required: [function () { return this.chatter.length >= 2 }, "Must be more than 2"]
    },
    latest: {
        type: Date,
        default: new Date()
    },
    messages: [chatMessageSchema]
})
