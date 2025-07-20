"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function GoogleButton () {

    const { data } = useSession()

    if (data){
        return <button  className="bg-red-600 w-40 h-10 rounded cursor-pointer text-white" onClick={() => signOut()}> Logout </button>
    }

    return <button className="px-5 h-10 border rounded border-zinc-300 cursor-pointer" onClick={() => signIn("google")}> Continue with Google</button>
}