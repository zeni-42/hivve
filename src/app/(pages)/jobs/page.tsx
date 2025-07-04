'use client'
import axios from "axios"
import { DollarSign, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Page(){
    const router = useRouter()
    const [ jobs, setJobs ] = useState([])

    const fetchJobData = async () => {
        try {
            const res = await axios.get('/api/v1/jobs')
            console.log(res.data?.data);
            if (res.status == 200) {
                setJobs(res.data?.data)
            }
        } catch (error: any) {
            if (error?.response?.status == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error?.response?.message || "Failed to get jobs")
            }
        }
    }

    useEffect(() => {
        fetchJobData()
    }, [])

    return (
        <>
        <div className="w-full h-[calc(100vh-4rem)] bg-zinc-100" >
            <div className="w-full h-full flex justify-start items-center flex-col py-5 gap-3 ">
                { jobs.length > 0 ? (
                    jobs.map((item: any) => (
                        <div key={item?._id} className="bg-white w-1/2 h-44 p-5 flex justify-between items-center rounded-lg ">
                            <div className="w-1/2 h-full flex justify-between items-start flex-col" >
                                <div className="flex justify-center items-start flex-col" >
                                    <h1 className="text-2xl font-medium" >{item?.title}</h1>
                                    <p className="text-sm text-zinc-600">posted by<Link href={'#'} > {item?.authorData?.fullName} </Link></p>
                                </div>
                                <div className="flex justify-start items-center gap-5 text-zinc-500 " >
                                    <p className="text-sm flex justify-center items-center gap-1" ><MapPin className="size-4" />{item?.location}</p>
                                    <p className="text-sm flex justify-center items-center" ><DollarSign className="size-4"/>{item?.salary}/hr</p>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500">
                                        {item?.description?.length > 50 
                                        ? `${item.description.slice(0, 60)}...` 
                                        : item?.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-10" >
                                <button className="w-28 h-10 rounded text-white font-medium cursor-pointer flex justify-center items-center bg-blue-600 text-sm" onClick={() => router.push(`/jobs/${item?._id}`) } > View details </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No available jobs right now</p>
                )
                }
            </div>
        </div>
        </>
    )
}

