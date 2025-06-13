import Chat from "@/models/chatModel"
import Messages from "@/models/messageModel"
import connectDatabase from "@/utils/db"
import { serverSession } from "@/utils/serverSession"
import { NextResponse } from "next/server"
// import connectDatabase from "@/utils/db"

export const GET = async (req, { params }) => {
    const { chatId } = await params
    const receiverId = req.nextUrl.searchParams.get("receiverId")
    const { userId } = await serverSession(req)
    await connectDatabase()
    try {

        // set Reciever for showing receiver on Ui (Chat Box)

        await Messages.findOneAndUpdate(
            { chatId },
            { $set: { receiverId, senderId: userId } }
        );

        // and here get Entire chat Messages
        const messages = await Messages.find({ chatId })
            .populate("receiverId", "userName bio")

        if (!messages) {
            return NextResponse.json({ message: "message not Found!!", success: false, result: [] }, { status: 200 })
        }

        return NextResponse.json({ message: "message fatched SuccessFully!!", success: true, result: messages }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "feailed To fetch Messages!!", success: false, error: error.message }, { status: 500 })
    }
}


export const POST = async (req, { params }) => {
    const { chatId } = await params
    const { message } = await req.json()

    try {
        const { userId } = await serverSession()
        // const userId = loginUser.userId
        await connectDatabase()
        const newMessage = {
            sender: userId,
            content: message
        }

        let result = await Messages.findOneAndUpdate(
            { chatId },
            { $push: { messages: newMessage } },
            { upsert: true, new: true }
        ).populate("receiverId", "userName")


        // const messageData= await result.populate('message',"")

        // await Chat.findByIdAndUpdate(chatId,{
        //     lastMessageDate
        // })

        const messageData = result.toObject()

        // add Last Date or time of 
        await Chat.findOneAndUpdate({ chatId },
            { $set: { lastMessageDate: messageData.updatedAt } },
            { new: true }
        )

        // result.receiverId = receiver ? receiver : null

        return NextResponse.json({ message: "message Added!!", success: true, result: result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "failed to Add message!!", success: false, error: error.message }, { status: 500 })
    }
}



export const DELETE = async () => {

}