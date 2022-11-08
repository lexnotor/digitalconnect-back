import e from "express";

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getConversations = (req, res) => {
    const conversations = [
        {
            "user": {
                "id": 340950586,
                "nom": "",
                "image": "",
                "uri": ""
            },
            "id": 3492842,
            "code": "eriutplodirdjeiur"
        }
    ];
    res.json({ conversations })
};

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const getConversation = (req, res) => {
    const conversation = [
        {
            "latest": "time",
            "id": 3492842,
            "code": "eriutplodirdjeiur",
            "content": [
                {
                    "sender": 2393494,
                    "message": "",
                    "read": false,
                    "deleted": false,
                    "date": "",
                    "heure": ""
                }
            ]
        }
    ];
    res.json({ conversation })
};

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const sendMessage = (req, res) => {
    const conversation = [
        {
            "latest": "time",
            "id": 3492842,
            "code": "eriutplodirdjeiur",
            "content": [
                {
                    "sender": req.params.user,
                    "message": req.body.meassage,
                    "read": false,
                    "deleted": false,
                    "date": new Date(),
                    "heure": ""
                }
            ]
        }
    ];
    res.status.json({ message: "Message sent" })
};
