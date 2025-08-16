"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { Github } from "lucide-react"

export default function GithubAuthButton(){
    const { data } = useSession()

    if(data) {
        return <Button variant="secondary" className="cursor-pointer" onClick={() => signOut()}>Sign out</Button>
    }

    return (
        <Button variant="outline" className="w-full h-11 border-slate-200 hover:border-slate-300 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 bg-transparent" onClick={() => signIn()}>
            <Github className="w-5 h-5 mr-3" />
            Continue with GitHub
        </Button>)
}