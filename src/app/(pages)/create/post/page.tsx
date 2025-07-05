'use client'

import { useUserStore } from "@/store/user.store";
import { ChevronLeft } from "lucide-react";
import Editor from "@/components/TipTap";

export default function Page() {
    const { fullName } = useUserStore();

    return (
        <div className="w-full h-screen flex flex-col justify-start items-center bg-zinc-100 py-5 px-96">
            <div className="bg-white p-5 rounded-xl w-full h-auto flex justify-start items-center gap-10 " >
                <button className="hover:bg-zinc-100 border border-zinc-200 size-10 flex justify-center items-center rounded-full cursor-pointer" onClick={() => history.back()}><ChevronLeft /></button>
                <div>
                    <h1 className="text-2xl font-semibold text-blue-700">Heyy {fullName}</h1>
                    <p className="text-sm text-zinc-500" > Share your thoughts with us </p>
                </div>
            </div>
            <div className="mt-5 w-full h-auto p-5 bg-white rounded-lg " >
                <Editor />
            </div>
        </div>
    )
}