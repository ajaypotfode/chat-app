import User from "@/models/userModel";
import connectDatabase from "@/utils/db"
import { serverSession } from "@/utils/serverSession";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { image } = await req.json()
        const { userId } = await serverSession()
        await connectDatabase();
        

        const result = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { image } },
            { upsert: true, new: true }
        ).select('-password')

        return NextResponse.json({ message: "Profile Picture Updated Succefully", success: true, result: result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "feailed To Update Profile Picture!!", success: false, error: error.message }, { status: 500 })
    }
}