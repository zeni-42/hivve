import { NextResponse, NextRequest } from 'next/server'
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
    const session = await auth()

    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/sign-up' || path === '/auth/sign-in' || path === '/'

    if (!session && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    if (session && isPublicPath) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/auth/:path*',
        '/home',
        '/jobs',
        '/jobs/:path*',
        '/plans',
        '/update/:path',
        '/create/post',
        '/create/:path*',
    ],
}
