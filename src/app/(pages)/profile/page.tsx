'use client'

import Navbar from "@/components/Navbar"
import { useUserStore } from "@/store/user.store"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function Profile(){
    const router = useRouter()
    const avatar = useUserStore((s) => s.avatar )
    const banner = useUserStore((s) => s.banner)
    const fullName = useUserStore((s) => s.fullName)
    const email = useUserStore((s) => s.email )

    // const fetchUser =  async () => {
    //     try {
    //         const res = await axios.get('/api/v1/user')
    //         console.log(res.data?.data[0]);
    //         if (res.status == 200) {
    //             setUserData(res.data?.data[0])
    //         }
    //     } catch (error: any) {
    //         if (error?.response?.status == 401) {
    //             router.push('/auth/sign-in')
    //         } else {
    //             toast.error(error.response?.data?.message)
    //         }
    //     }
    // }

    // useEffect(() => {
    //     fetchUser()
    // }, [])

    return (
        <>
        <Navbar />
        <div className="w-full mt-16 h-[calc(100vh-4rem)] flex justify-center items-center bg-zinc-100" >
            <div className="w-2/3 h-full" >
                {
                    banner && <Image src={banner} alt="bannerImage" width={10000} height={10000} className="w-full h-80 object-cover "/>
                }
                {
                    avatar && <Image src={avatar} alt="bannerImage" width={10000} height={10000} className="rounded-full size-60 object-cover ml-20 -translate-y-[50%] "/>
                }
                { fullName }
                <br />
                { email }
            </div>
        </div>
        </>
    )
}