"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"

export default function GithubAuthButton(){
    const { data } = useSession()

    if(data) {
        return <Button variant="secondary" className="cursor-pointer" onClick={() => signOut()}>Sign out</Button>
    }

    return <Button variant="secondary" className="cursor-pointer" onClick={() => signIn("github")}>Continue with Github</Button>
}