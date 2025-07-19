import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/sign-up' || path === '/auth/sign-in' || path === '/'
    const accessToken = request.cookies.get('accessToken')?.value || request.cookies.get("authjs.session-token")?.value

    if (!isPublicPath && !accessToken) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    if (isPublicPath && accessToken) {
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
