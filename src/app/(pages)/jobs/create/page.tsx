'use client'

import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page() {
    const { register, handleSubmit, reset } = useForm()
    const router = useRouter()

    const handleAddJob = async (data: any) => {
        try {
            const res = await axios.post('/api/v1/jobs/add-job', {...data})
            if (res.status === 401) {
                router.push('/auth/sign-in')
            } else if (res.status === 201) {
                router.push('/jobs')
                toast.success(res.data?.message)
                reset()
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    const resetHandler = (e: any) => {
        e.preventDefault()
        reset()
    }

    return (
        <>
        <div className="w-full h-[calc(100vh-4rem)]] flex justify-start items-center py-5 flex-col mt-16" >
            <div className="w-3/5 h-20 flex justify-start items-center px-20 gap-10 " >
                <button onClick={() => history.back()} className="bg-zinc-200 size-14 flex justify-center items-center cursor-pointer rounded-full" ><ArrowLeft /></button>
                <h1 className="text-2xl font-medium" >Publish Job Listing</h1>
            </div>
            <div className="w-8/12 px-60 py-5" >
                <form onSubmit={handleSubmit(handleAddJob)} className="w-full flex justify-center items-start flex-col gap-7" >
                    <div className="w-full flex flex-col" >
                        <label htmlFor="" className="text-md font-medium" > Job title </label>
                        <input {...register("title")} type="text" className="w-full h-14 rounded border border-zinc-400 outline-none px-5 text-lg" placeholder="e.g. Graphic designer" />
                    </div>
                    <div className="w-full flex flex-col" >
                        <label htmlFor="" className="text-md font-medium" > Job description </label>
                        <textarea {...register("description")} className="w-full h-40 rounded border border-zinc-400 outline-none p-5 text-lg" placeholder="Please add a detailed descriptions about the job" />
                    </div>
                    <div className="w-full flex flex-col" >
                        <label htmlFor="" className="text-md font-medium" > Salary ( in USD ) </label>
                        <input {...register("salary")} type="number" className="w-full h-14 rounded border border-zinc-400 outline-none px-5 text-lg" placeholder="e.g. 120,000" />
                    </div>
                    <div className="w-full flex flex-col" >
                        <label htmlFor="" className="text-md font-medium" > Location </label>
                        <input {...register("location")} type="text" className="w-full h-14 rounded border border-zinc-400 outline-none px-5 text-lg" placeholder="e.g. Greater Noida, Delhi" />
                    </div>
                    <div className="w-full flex flex-col" >
                        <label htmlFor="" className="text-md font-medium" > Available till </label>
                        <input {...register("lastDate")} type="date" className="w-full h-14 rounded border border-zinc-400 outline-none px-5 text-lg" placeholder="e.g. 120,000" />
                    </div>
                    <div className="w-full flex flex-col" >
                        <label htmlFor="" className="text-md font-medium" > Job type </label>
                        <select defaultValue={"fullTime"} className="w-full h-10 rounded border border-zinc-400 outline-none px-5" {...register("jobType")} >
                            <option value="fullTime"> Full time </option>
                            <option value="partTime"> Part time </option>
                            <option value="internship"> Internship </option>
                        </select>
                    </div>
                    <div className="w-full flex justify-end items-center gap-10" >
                        <button onClick={(e) => resetHandler(e)} className="cursor-pointer w-40 h-10 rounded border border-zinc-400 " > Reset </button>
                        <button type="submit" className="cursor-pointer w-40 h-10 rounded bg-blue-600 text-white font-medium" > Submit </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}