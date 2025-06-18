import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const serverSession = async (req, res) => {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ message: "unAuthorized User!!", success: false }, { status: 200 })
        }
        const user = session.user
        return user

    } catch (error) {
        return NextResponse.json({ message: "error!!", success: false, error: error.message }, { status: 500 })
    }
}



