import mongoose from "mongoose"

const chatModel = new mongoose.Schema({
    partcipants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chatusers",
            required: true
        },
    ],
    // lastMessage: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "messages",
    //     // required: true
    // },
    lastMessageDate: {
        type: Date
    }
}, { timestamps: true })

const Chat = mongoose.models.chats || mongoose.model("chats", chatModel);
export default Chat