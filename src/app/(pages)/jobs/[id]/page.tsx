'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Page(){
    const fullPath = usePathname()

    const [jobId, setjobId] = useState<string | null>(null)

    useEffect(() => {
        setjobId(fullPath.replace('/jobs/', ''))
    }, [])

    return(
        <>
        <div>
            { jobId }
        </div>
        </>
    )
}