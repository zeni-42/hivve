'use client'
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page(){
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    const handleRegisterUser = async (data:any) => {
        setIsLoading((prev) => !prev)
        try {
            const response = await axios.post('/api/v1/user/sign-up', data);
            if (response.status == 201) {
                toast.success("Welcome")
                reset()
                router.push('/auth/sign-in')
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(e => !e)
        }
    }


    return (
        <>
        <div className="w-full h-screen flex justify-center items-center" >
            <div className="w-1/3 h-2/3 shadow-md border border-zinc-300 rounded-xl" >
                <form action="" className="w-full  h-full flex justify-center items-center flex-col py-10 gap-5 ">
                    <h1 className="text-2xl font-medium" >Create your account</h1>
                        <div className="flex flex-col w-4/5 h-auto justify-center " >
                            <label htmlFor="">Full name</label>
                            <input type="text" {...register("fullName")} className="w-full h-12 border border-zinc-500 rounded outline-none px-3 text-lg" />
                        </div>
                        <div className="flex flex-col w-4/5 h-auto justify-center " >
                            <label htmlFor="">Email</label>
                            <input type="email" {...register("email")} className="w-full h-12 border border-zinc-500 rounded outline-none px-3 text-lg" />
                        </div>
                        <div className="flex flex-col w-4/5 h-auto justify-center " >
                            <label htmlFor="">Password</label>
                            <input type="password" {...register("password")} className="w-full h-12 border border-zinc-500 rounded outline-none px-3 text-lg" />
                        </div>
                        <button onClick={handleSubmit(handleRegisterUser)} className="w-4/5 h-12 bg-blue-600 text-white font-semibold text-lg rounded cursor-pointer flex justify-center items-center " > {isLoading ? <span className="animate-spin" ><LoaderCircle /></span>: <> Submit </>} </button>
                        <div className="w-4/5 h-auto justify-between items-center" >
                            <p>Already have an account ?<Link href={'/auth/sign-in'} className="text-blue-600 " > Sign in</Link> </p>
                        </div>
                </form>
            </div>
        </div>
        </>
    )
}