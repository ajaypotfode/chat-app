import { NextResponse } from "next/server"
// import { authOptions } from "../auth/[...nextauth]/options"
import connectDatabase from "@/utils/db"
import Chat from "@/models/chatModel"
// import { getServerSession } from "next-auth"
import { serverSession } from "@/utils/serverSession"
import Messages from "@/models/messageModel"


export const GET = async (req, res) => {
    try {
        const { userId } = await serverSession(req, res)
        // const userId = loginUser.userId
        await connectDatabase();
        // this is go through entire chat collection and return matched participants array
        const userChats = await Chat.find({ partcipants: userId })
            .populate("partcipants", "userName bio image")//this is use to get details of user, cause in chatModel (to participants field) we refer to "users" collection

        const result = await Promise.all(userChats.map(async (chat) => {

            const reciever = chat.partcipants.find((partcipant => {
                return partcipant._id.toString() !== userId.toString()
            })) || chat.partcipants[0]


            const allMessage = await Messages.find({ chatId: chat._id })

            let unseenMessageCount

            if (allMessage[0]?.messages) {

                unseenMessageCount = allMessage[0].messages.filter(msg => (
                    msg.sender.toString() !== userId.toString() && msg.seen === false
                )).length

            }



            // const getColor = () => {
            //     const colors = ['#ff5c5c', '#5cff77', '#eb8314', '#00ffd9', '#14a0eb', '#8014eb', '#00ff33', '#ff0000', '#ff00ee', '#00affa']
            //     const index = Math.floor(Math.random() * 10)

            //     return colors[index]
            // }


            return {
                _id: chat._id,
                lastMessageDate: chat.lastMessageDate,
                unseenCount: unseenMessageCount || 0,
                reciever,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
                // color: getColor()
            }
        }))

        return NextResponse.json({ message: "chats Fetched SuccessFully!!", success: true, result: result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "failed To fetch Chats!!", success: false, error: error.message }, { status: 500 })
    }
}



export const POST = async (req, res) => {
    const { recieverId } = await req.json()
    try {
        const { userId } = await serverSession(req, res)

        await connectDatabase();

        const existChat = await Chat.findOne({ partcipants: { $all: [userId, recieverId] } })

        if (existChat) {
            return NextResponse.json({ message: "user Already Added In Your Chat!!", success: false }, { status: 200 })
        }

        const createChat = new Chat({
            partcipants: [userId, recieverId]
        })

        await createChat.save();

        // create empty message For chat
        const user = await createChat.populate("partcipants", "userName bio image");

        const receiver = user.partcipants.find(
            participant => participant._id.toString() !== userId.toString()
        );

        const receiverId = receiver ? receiver._id : null;


        const createMessage = new Messages({
            chatId: createChat._id,
            messages: [],
            receiverId,
            senderId: userId
        })

        await createMessage.save();


        //give colors to chats
        // const getColor = () => {
        //     const colors = ['#ff5c5c', '#5cff77', '#eb8314', '#00ffd9', '#14a0eb', '#8014eb', '#00ff33', '#ff0000', '#ff00ee', '#00affa']
        //     const index = Math.floor(Math.random() * 10)
        //     return colors[index]
        // }

        // it is use to send reciever Name 
        const result = user.toObject();//it is use to convert mongodb Doc into plain Obj
        result.reciever = receiver
        // result.color = getColor()

        return NextResponse.json({ message: "user SuccessFully Added In your Chat!!", success: true, result: result }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Failed To add User In Your Chat!!", success: false, error: error.message }, { status: 500 })
    }
}



export const DELETE = async (req, res) => {
    const { chatId } = await req.json()
    try {

        // const { userId } = await serverSession()
        await connectDatabase();

        const deleteChat = await Chat.findByIdAndDelete(chatId)

        if (!deleteChat) {
            return NextResponse.json({ message: "Chat Not Found!!", success: false }, { status: 200 })
        }

        await Messages.deleteMany({ chatId })

        return NextResponse.json({ message: "Chat Deleted SuccessFully!!", success: true, result: deleteChat }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "failed To Delete!!", success: false, error: error.message }, { status: 500 })
    }
}

// }

