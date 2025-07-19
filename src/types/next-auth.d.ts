// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        refreshToken?: string
        idToken?: string
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            id?: string | null
        }
    }
    interface JWT {
        accessToken?: string
        refreshToken?: string
        idToken?: string
        expiresAt?: number
        userId?: string
    }
}
