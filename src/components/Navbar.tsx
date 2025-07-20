'use client'

import React, { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"
import { useUserStore } from "@/store/user.store"
import { usePathname, useRouter } from "next/navigation"

const Navbar = React.memo(function Navbar (){
    const router = useRouter()
    const pathname = usePathname()
    const { fullName, avatar, hydrate } = useUserStore()

    useEffect(() => {
        hydrate()
    }, [hydrate])

    return (
        <>
        <div className="fixed top-0 w-full h-16 bg-white border-b border-zinc-200 flex justify-between items-center" >
            <div className="w-1/3 h-full flex justify-center items-center" >
                <Link href={'/home'} className="text-2xl font-semibold text-blue-700" >Hivve</Link>
            </div>
            <div className="w-1/3 h-full flex justify-center items-center">
                <Link className={`w-1/3 h-full flex justify-center items-center cursor-pointer ${pathname == '/home' ? 'border-b-6 border-blue-600': ''}`} href={'/home'} > Home </Link>
                <Link className={`w-1/3 h-full flex justify-center items-center cursor-pointer ${pathname == '/jobs' ? 'border-b-6 border-blue-600': ''}`} href={'/jobs'} > Jobs </Link>
                <Link className={`w-1/3 h-full flex justify-center items-center cursor-pointer ${pathname == '/plans'? 'border-b-6 border-blue-600': ''}`} href={'/plans'} > Plans </Link>
            </div>
            <div className="w-1/3 h-full flex justify-center items-center gap-20">
                <button onClick={() => router.push('/jobs/create')} className="w-32 h-3/5 rounded-full bg-zinc-200 flex justify-center items-center gap-2 cursor-pointer" >
                    <Plus /> <p>ADD</p>
                </button>
                <div className="flex justify-end items-center gap-2" >
                    {
                        avatar && <Image src={avatar} alt="pfp" width={1000} height={1000} className="size-10 rounded-full" />
                    }
                    <Link href={'/profile'} >{fullName}</Link>
                </div>
            </div>
        </div>
        </>
    )
})

export default Navbar