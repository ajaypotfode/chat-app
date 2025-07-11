
import Messages from "@/models/messageModel"
import connectDatabase from "@/utils/db"
import { serverSession } from "@/utils/serverSession"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const chatId = req.nextUrl.searchParams.get('chatId')
    // console.log("chat Id is :", chatId);
    const { userId } = await serverSession()
    await connectDatabase()
    // const receiverId = req.nextUrl.searchParams.get('receiverId')
    try {

        await Messages.findOneAndUpdate(
            { chatId },
            { $set: { 'messages.$[msg].seen': true } },//this is use to target element from an array "messages.$[element].seen"(elem will be anything eg.msg)
            {
                arrayFilters: [
                    { 'msg.sender': { $ne: userId }, 'msg.seen': false }
                ]
                //it is use to filter the object from array(elem will be anything)
            }
        );

        return NextResponse.json({ message: "cleared Unseen Message Count!", success: true })
    } catch (error) {
        return NextResponse.json({ message: "failed To clear unseenMessage Count!", success: false, error: error.message })
    }
}