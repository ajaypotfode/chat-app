import connectDatabase from "@/utils/db";
import User from "@/models/userModel";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            // credentials: {
            //     email: { label: "Email", type: "text" },
            //     password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                const { email, password } = credentials
                await connectDatabase();
                try {
                    const user = await User.findOne({ email })

                    if (!user) {
                        throw new Error("User Not Found, Invalid email")
                    }

                    const validPassword = await compare(password, user.password);

                    if (!validPassword) {
                        throw new Error(`Invalid Password For ${email}`)
                    }

                    return { userId: user._id, username: user.userName, email: user.email }

                } catch (error) {
                    throw new Error(`login Filed!! ${error}`)
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24
    },
    jwt: {
        maxAge: 60 * 60 * 24
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user
            }
            return session
        },
        async signIn({ user }) {
            if (!user) {
                return {
                    ok: false,
                    status: 200,
                    error: "Invalid email or password",
                    message: "Authentication failed. Please check your credentials.",
                };
            }
            return true
        },
    }
}