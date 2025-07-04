'use client'

import { useUserStore } from "@/store/user.store";
import { ChevronLeft } from "lucide-react";

export default function Page() {
    const { fullName } = useUserStore();
    
    return (
        <div className="w-full h-screen flex justify-center items-start bg-zinc-100 py-5">
            <div className="w-full h-auto px-96 flex justify-start items-center gap-10 " >
                <button className="bg-zinc-200 size-10 flex justify-center items-center rounded-full cursor-pointer" onClick={() => history.back()}><ChevronLeft /></button>
                <div>
                    <h1 className="text-2xl font-semibold text-blue-700">Heyy {fullName}</h1>
                    <p className="text-sm text-zinc-500" >how you doing today ?</p>
                </div>
            </div>
        </div>
    )
}