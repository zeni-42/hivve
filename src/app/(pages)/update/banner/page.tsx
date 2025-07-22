'use client'

import { useUserStore } from "@/store/user.store"
import axios from "axios"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Page(){
    const router = useRouter()
    const { setBanner } = useUserStore()
    const [selectedFile, setSelectedFile] = useState()
    const [ isLoading, setIsLoading ] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file)
    }

    const handleUploadData = async () => {
        if(!selectedFile) {
            toast.warn("File cannot be empty")
            return;
        }
    
        try {
            setIsLoading(true)
            const fromData = new FormData()
            fromData.append("banner", selectedFile)
            const res = await axios.post('/api/v1/user/upload/banner', fromData)
            if (res.status == 200) {
                await axios.post('/api/v1/user/update/newbie')
                router.push('/home')
            }
        } catch (error: any) {
            if (error.response.status == 401) {
                router.push("/auth/sign-in")
            } else {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
        <div className="w-full h-screen">
            <div className="w-full h-20 flex justify-between items-center px-80" >
                <h1 className="text-2xl font-medium" >Add your banner</h1>
                <button onClick={() => router.push('/home')} className="text-md cursor-pointer w-40 h-3/5 bg-zinc-200 rounded-lg" > skip for now </button>
            </div>
            <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-10" >
                {
                    selectedFile && <Image src={URL.createObjectURL(selectedFile)} alt="profile picture" width={1000} height={1000} className="w-4/5 h-[30vh] object-cover rounded-lg"/>
                }
                <input className=" rounded-lg border p-3" type="file" placeholder="Edit" onChange={(e) => handleFileChange(e as any)} />
                <button disabled={isLoading} className="w-40 py-3 bg-zinc-800 rounded-lg text-white cursor-pointer" onClick={() => handleUploadData() } >
                    {
                        isLoading ? (<><span className="w-full h-full flex justify-center items-center" ><Loader2 className="animate-spin" /></span></>) : (<>Upload</>)
                    }
                </button>
            </div>
        </div>
        </>
    )
}