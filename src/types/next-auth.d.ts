import { DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        refreshToken?: string
        idToken?: string
        expiresAt?: number
        scope?: string
        tokenType?: string
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            id?: string | null
        }
    }

    interface User extends DefaultUser {
        id?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string | null
        refreshToken?: string
        idToken?: string
        expiresAt?: number
        scope?: string
        tokenType?: string
        userId?: string
    }
}
