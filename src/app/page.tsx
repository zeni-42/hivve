'use client'
import SignIn from "@/components/Signin"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    return (
        <>
        <div className="w-full h-screen flex justify-center items-center flex-col gap-10" >
            <h1 className="text-3xl font-semibold" > Hivve </h1>
            {/* <button className="w-40 h-14 bg-blue-600 text-white font-semibold text-lg rounded cursor-pointer flex justify-center items-center" onClick={() => router.push('/auth/sign-up')}> Redirect </button> */}
            <SignIn />
        </div>
        </>
    )
}
