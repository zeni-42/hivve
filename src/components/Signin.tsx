"use client"

import { signIn, signOut } from "next-auth/react"

export default function SignIn () {
    return (
    <button  className="bg-blue-600 w-40 h-10 rounded text-white" onClick={() => signIn("google")}>
        SignIn
    </button>
    )
}