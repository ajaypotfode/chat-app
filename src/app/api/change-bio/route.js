import User from "@/models/userModel"
import connectDatabase from "@/utils/db"
import { serverSession } from "@/utils/serverSession"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { bio } = await req.json()
    try {
        const { userId } = await serverSession()
        await connectDatabase()
        const result = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { bio } },
            { upsert: true, new: true }
        ).select('-password')

        return NextResponse.json({ message: "Bio Updated Succefully", success: true, result: result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "feailed To Update Bio!!", success: false, error: error.message }, { status: 500 })
    }
}