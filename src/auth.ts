import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut } = NextAuth({
    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ], callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.idToken = account.id_token
                token.expiresAt = account.expires_at
                token.scope = account.scope
                token.tokenType = account.token_type

                token.email = profile?.email
                token.name = profile?.name
                token.picture = profile?.picture
                token.userId = profile?.sub
            }
            return token
        },
        async session({ session, token }: string | any ) {
            session.user.id = token.userId
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.idToken = token.idToken
            session.expiresAt = token.expiresAt
            session.scope = token.scope
            session.tokenType = token.tokenType
            return session
        }
    }
})