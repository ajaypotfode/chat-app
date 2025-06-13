import { signIn } from 'next-auth/react'
import { NextResponse } from 'next/server';


export const POST = async (req) => {
    const { email, password } = await req.json();
    try {
        const result = await signIn("Credentials", {
            email: email,
            password: password,
            redirect: false
        })

        if (!result?.ok) {
            return NextResponse.json({ success: false, message: "Invalid credentials" });
        }

        return NextResponse.json({ success: true, token: result });
    } catch (error) {
        return NextResponse.json({ success:false, message:"failed "});
    }
}