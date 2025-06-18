import User from "@/models/userModel"
import connectDatabase from "@/utils/db"
import { serverSession } from "@/utils/serverSession"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const { userId } = await serverSession()
        await connectDatabase()

        const result = await User.findById(userId).select('-password')

        return NextResponse.json({ message: "User Profile Fetched SuccessFully!!", success: true, result: result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "failed to Fetch userProfile!!", success: false, error: error.message }, { status: 500 })
    }
}