import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname } = request.nextUrl
    const token = await getToken({ req: request })

    // console.log("token is :",token);
    

    const protectedServerRoute = [
        '/api/chat',
        '/api/chat/message'
    ]


    if (!token && protectedServerRoute.some(route => pathname.startsWith(route))) {
        return new NextResponse(
            JSON.stringify({ message: "User not authenticated!!", success: false }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    if (!token && pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && (pathname === '/login' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/api/chat',
        '/api/chat/message/:path*',
        '/api/auth/:path*',
        '/login',
        '/signup'
    ]
}