'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import Image from "next/image";
import { Images} from "lucide-react";

export default function Page(){
    const { avatar, setData } = useUserStore()
    const router = useRouter()
    const [role, setRole] = useState('')

    const fetchUserData = async () => {
        try {
            const res = await axios.get('/api/v1/user')
            if (res.status == 200) {
                localStorage.setItem("fullName", res.data?.data[0]?.fullName)
                localStorage.setItem("email", res.data?.data[0]?.email)
                localStorage.setItem("avatar", res.data?.data[0]?.avatar)
                localStorage.setItem("banner", res.data?.data[0]?.banner)
                setData(res.data?.data[0]?.userId, res.data?.data[0]?.fullName, res.data?.data[0]?.email, res.data?.data[0]?.avatar, res.data?.data[0]?.banner)
                setRole(res.data?.data[0]?.role)
            }
        } catch (error:any) {
            if (error?.response?.status == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error.response?.data?.message)
            }
        }
    }

    const handleUpdateRole = async (s: string) => {
        try {
            const res = await axios.post('/api/v1/user/update/role', { roleType: s })
            if (res.status == 200) {
                setRole("changed")
            }
        } catch (error: any) {
            if (error.response?.data == 401) {
                router.push('/auth/sign-in')
            }
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId")!
        const fullName = localStorage.getItem("fullName")!;
        const email = localStorage.getItem("email")!;
        const avatar = localStorage.getItem("avatar")!;
        const banner = localStorage.getItem("banner")!;

        if (fullName && email) {
            setData(userId, fullName, email, avatar, banner);
        }

        fetchUserData();
    }, []);

    return (
        <>
        <div className="w-full h-[calc(100vh-4rem)] bg-zinc-100 flex flex-col justify-start items-center py-5 ">
            {
                role == "None" ? (
                <>
                <div className="bg-white w-1/2 h-auto p-10 flex justify-center items-center flex-col gap-4 rounded" >
                    <h1 className="text-lg font-medium" >You are here for ?</h1>
                    <div className="w-full flex justify-center items-center gap-10" >
                        <button onClick={() => handleUpdateRole("jobseeker")} className="w-60 h-10 border border-blue-600 bg-zinc-50 rounded text-black cursor-pointer" >I'm looking for job</button>
                        <button onClick={() => handleUpdateRole("employer")} className="w-60 h-10 bg-blue-500 rounded text-white cursor-pointer" >I'm looking for talents</button>
                    </div>
                </div>
                </>) : (null)
            }
            <div className={`w-2/5 h-auto p-5 bg-white flex flex-col justify-center items-center gap-5 rounded-lg`} >
                <div className="w-full flex justify-center items-center gap-5" >
                    {
                        avatar ? (
                            <Image src={avatar} alt="avatar" width={60} height={60} className="size-12 rounded-full object-cover" />
                        ) : (
                            null
                        )
                    }
                    <button onClick={() => router.push('/create/post')} className="cursor-pointer border-zinc-400 border outline-none w-4/5 h-12 rounded-xl px-5 flex justify-start items-center text-zinc-500">Whats going on in there ?</button>
                    <button onClick={() => router.push('/create/post')} className="cursor-pointer size-10 flex justify-center items-center" >
                        <Images className="text-zinc-500 cursor-pointer "/>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}