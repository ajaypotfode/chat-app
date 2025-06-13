import mongoose from "mongoose"

const chatModel = new mongoose.Schema({
    partcipants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
    ],
    // lastMessage: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "messages",
    //     // required: true
    // },
    lastMessageDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages",
        // required: true
    }
}, { timestamps: true })

const Chat = mongoose.models.chats || mongoose.model("chats", chatModel);
export default Chat