'use client'

import { useUserStore } from "@/store/user.store"
import axios from "axios"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Page(){
    const router = useRouter()
    const avatar = useUserStore((s) => s.avatar)
    const [userId, setUserId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { setAvatar } = useUserStore()

    const handleFileChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file)
    }

    const handleUploadData = async () => {
        if (!selectedFile) {
            toast.warning("File cannot be empty")
            return; 
        }

        try {
            setIsLoading(true)
            const form = new FormData()
            form.append("image", selectedFile)
            form.append("userId", userId)
            const res = await axios.post('/api/v1/user/upload/avatar', form)
            if (res.status == 200) {
                localStorage.setItem("avatar", res.data?.data?.avatar)
                toast.success("Profile picture updated")
                router.push('/update/banner')
            }
        } catch (error:any) {
            if (error.response.status == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId')!
        setUserId(storedUserId)
    }, [])

    return(
        <>
        <div className="w-full h-screen">
            <div className="w-full h-20 flex justify-between items-center px-80" >
                <h1 className="text-2xl font-medium" >Add a profile picture</h1>
                <button onClick={() => router.push('/update/banner')} className="text-md cursor-pointer w-40 h-3/5 bg-zinc-200 rounded-lg" > skip for now </button>
            </div>
            <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-10" >
                {
                    selectedFile && <Image src={URL.createObjectURL(selectedFile) || avatar} alt="profile picture" width={1000} height={1000} className="size-60 rounded-full" />
                }
                <input className=" rounded-lg border p-3" type="file" placeholder="Edit" onChange={(e) => handleFileChange(e as any)} />
                <button disabled={isLoading} className='w-40 py-3 bg-zinc-800 rounded-lg text-white cursor-pointer' onClick={() => handleUploadData() } >
                    {
                        isLoading ? (<><span className="w-full h-full flex justify-center items-center" ><Loader2 className="animate-spin" /></span></>) : (<>Upload</>)
                    }
                </button>
            </div>
        </div>
        </>
    )
}