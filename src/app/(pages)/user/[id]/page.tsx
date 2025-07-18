'use client'

import { usePathname } from "next/navigation"

export default function Page(){
    const fullPath = usePathname()

    const userId = fullPath.replace('/user/', "")

    return(
        <>
        {
            userId
        }
        </>
    )
}