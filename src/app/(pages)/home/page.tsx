'use client'

import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";

export default function Page(){
    const { setData } = useUserStore()
    const router = useRouter()

    const fetchUserData = async () => {
        try {
            const res = await axios.get('/api/v1/user')
            if (res.status == 200) {
                localStorage.setItem("fullName", res.data?.data?.fullName)
                localStorage.setItem("email", res.data?.data?.email)
                localStorage.setItem("avatar", res.data?.data?.avatar)
                localStorage.setItem("banner", res.data?.data?.banner)
                setData(res.data?.data?.userId, res.data?.data?.fullName, res.data?.data?.email, res.data?.data?.avatar, res.data?.data?.banner)
            }
        } catch (error:any) {
            if (error?.response?.status == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error.response?.data?.message)
            }
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId")!
        const fullName = localStorage.getItem("fullName")!;
        const email = localStorage.getItem("email")!;
        const avatar = localStorage.getItem("avatar")!;
        const banner = localStorage.getItem("banner")!;

        if (fullName && email) {
            setData(userId, fullName, email, avatar, banner);
        }

        fetchUserData();
    }, []);

    return (
        <>
        <Navbar />
        </>
    )
}