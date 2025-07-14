import mongoose from "mongoose"

const singleMessage = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatusers',
        // required: true
    },
    content: {
        type: String,
        // required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false })


const messageModel = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats",
        required: true
    },
    // bio: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    // },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatusers",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatusers",
        required: true
    },
    messages: [singleMessage]

}, { timestamps: true })

const Messages = mongoose.models.allmessages || mongoose.model("allmessages", messageModel)

export default Messages