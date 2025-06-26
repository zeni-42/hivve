'use client'

import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }){
    return(
        <>
        <Navbar />
        <div className="mt-16" >
            {children}
        </div>
        </>
    )
}