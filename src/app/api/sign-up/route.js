import User from "@/models/userModel";
import connectDatabase from "@/utils/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const POST = async (req) => {
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
        return NextResponse.json({ message: "failed To Create User!", success: false }, { status: 500 })
    }
}