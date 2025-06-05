import mongoose from "mongoose"

const chatModel = new mongoose.Schema({
    partcipents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    ]
}, { timestamps: true })

const Chat = mongoose.models.chats || mongoose.model("chats", chatModel);
export default Chat