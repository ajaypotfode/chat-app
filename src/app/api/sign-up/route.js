import User from "@/models/userModel";
import connectDatabase from "@/utils/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userName, email, password } = await req.json()
    await connectDatabase();
    try {
        const isUser = await User.findOne({ email })
        if (isUser) {
            return NextResponse.json({ message: "User Already Created!!", success: false, result: [] }, { status: 200 })
        }

        const hashedPassword = await hash(password, 10)

        const user = new User({
            userName,
            email,
            password: hashedPassword
        })

        const response = await user.save();
        return NextResponse.json({ message: "User Created SuccessFully!!", success: true, result: response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "failed To Create User!", success: false, error: error.message }, { status: 500 })
    }
}


export const GET = async (req) => {
    // const { email } = await req.json()

    const email = req.nextUrl.searchParams.get('email');

    // const { email } = await params
    await connectDatabase()
    try {
        const response = await User.findOne({ email })
        // const response = await User.find()

        if (!response) {
            return NextResponse.json({ message: "with this Email user Not Logged In!!", success: false, result: {} }, { status: 200 })
        }

        return NextResponse.json({ message: "User Fetched SuccessFully!!", success: true, result: response }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "failed To Fetch Users!!", success: false, error: error.message }, { status: 500 })

    }
}