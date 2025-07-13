'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import Image from "next/image";
import { Images, ThumbsUp} from "lucide-react";

export default function Page(){
    const { avatar, setData, userId } = useUserStore()
    const router = useRouter()
    const [role, setRole] = useState('')
    const [posts, setPost] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [likedPosts, setLikedPosts] = useState<string[]>([])

    const fetchUserData = async () => {
        try {
            const res = await axios.get('/api/v1/user')
            if (res.status == 200) {
                localStorage.setItem("fullName", res.data?.data[0]?.fullName)
                localStorage.setItem("email", res.data?.data[0]?.email)
                localStorage.setItem("avatar", res.data?.data[0]?.avatar)
                localStorage.setItem("banner", res.data?.data[0]?.banner)
                setData(res.data?.data[0]?.userId, res.data?.data[0]?.fullName, res.data?.data[0]?.email, res.data?.data[0]?.avatar, res.data?.data[0]?.banner)
                setRole(res.data?.data[0]?.role)
            }
        } catch (error:any) {
            if (error?.response?.status == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error.response?.data?.message)
            }
        }
    }

    const handleUpdateRole = async (s: string) => {
        try {
            const res = await axios.post('/api/v1/user/update/role', { roleType: s })
            if (res.status == 200) {
                setRole("changed")
            }
        } catch (error: any) {
            if (error.response?.data == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error.response?.data?.message)
            }
        }
    }

    const fetchPost = async () => {
    try {
        setIsLoading(true);
        const res = await axios.get('/api/v1/post');
        if (res.status === 200) {
            const posts = res.data?.data;
            setPost(posts);

            const localUserId = localStorage.getItem("userId");
                const liked = posts
                    .filter((post: any) => post.likedBy?.includes(localUserId))
                    .map((post: any) => post._id);
                setLikedPosts(liked);
        }
    } catch (error: any) {
        if (error.response?.status === 401) {
            router.push('/auth/sign-in');
        } else {
            toast.error(error.response?.data?.message);
        }
    } finally {
        setIsLoading(false);
    }
};


const handleUpdateLike = async (id: string) => {
    try {
        setLikedPosts((prev) => prev.includes(id) ? prev.filter((postId) => postId !== id)  : [...prev, id] );
        setTimeout(() => {
            "waithing for completion"
        }, 800)

        await axios.post('/api/v1/likes', { postId: id }, { withCredentials: true });
    } catch (error) {
        console.log("Req Failed");
    }
};

    useEffect(() => {
        const userId = localStorage.getItem("userId")!
        const fullName = localStorage.getItem("fullName")!;
        const email = localStorage.getItem("email")!;
        const avatar = localStorage.getItem("avatar")!;
        const banner = localStorage.getItem("banner")!;

        if (fullName && email) {
            setData(userId, fullName, email, avatar, banner);
        }

        fetchUserData().then(fetchPost);
    }, []);

    return (
        <>
        <div className={`w-full ${posts.length == 1 ? 'h-[calc(100vh-4rem)]' : 'h-auto'} bg-zinc-100 flex flex-col justify-start items-center py-5 `}>
            {
                role == "None" ? (
                <>
                <div className="bg-white w-2/5 h-auto mb-5 p-10 flex justify-center items-center flex-col gap-4 rounded" >
                    <h1 className="text-lg font-medium" >You are here for ?</h1>
                    <div className="w-full flex justify-center items-center gap-10" >
                        <button onClick={() => handleUpdateRole("jobseeker")} className="w-60 h-10 border border-blue-600 bg-zinc-50 rounded text-black cursor-pointer" >I'm looking for job</button>
                        <button onClick={() => handleUpdateRole("employer")} className="w-60 h-10 bg-blue-500 rounded text-white cursor-pointer" >I'm looking for talents</button>
                    </div>
                </div>
                </>) : (null)
            }
            <div className={`w-2/5 h-auto p-5 bg-white flex flex-col justify-center items-center gap-5 rounded-lg`} >
                <div className="w-full flex justify-center items-center gap-5" >
                    {
                        avatar ? (
                            <Image src={avatar} alt="avatar" width={60} height={60} className="size-12 rounded-full object-cover" />
                        ) : (
                            null
                        )
                    }
                    <button onClick={() => router.push('/create/post')} className="cursor-pointer border-zinc-400 border outline-none w-4/5 h-12 rounded-xl px-5 flex justify-start items-center text-zinc-500">Whats going on in there ?</button>
                    <button onClick={() => router.push('/create/post')} className="cursor-pointer size-10 flex justify-center items-center" >
                        <Images className="text-zinc-500 cursor-pointer "/>
                    </button>
                </div>
            </div>
            {
                isLoading ? (
                    <div className="text-zinc-500 mt-5">Loading posts...</div>
                ) : posts?.length > 0 ? (
                    <div className="w-2/5 mt-5 flex flex-col gap-5">
                        {posts.map((post: any) => (
                            <div key={post._id} className="w-full bg-white p-5 rounded-lg shadow-sm">
                                <div className="flex items-center gap-4 mb-3">
                                    {post.userObj?.avatar && (
                                        <Image
                                            src={post.userObj.avatar}
                                            alt="user avatar"
                                            width={40}
                                            height={40}
                                            className="size-10 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium text-sm">{post.userObj?.fullName || "Unknown User"}</p>
                                        <p className="text-xs text-zinc-500">{new Date(post.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div
                                    className="text-base text-zinc-700 mb-2 w-full"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                ></div>

                                {post.images && (
                                    <Image
                                        src={post.images}
                                        alt="post image"
                                        width={500}
                                        height={300}
                                        className="w-full rounded-lg object-cover mt-2"
                                    />
                                )}

                                <div className="w-full mt-5 flex justify-start items-center gap-5">
                                <button
                                    onClick={() => handleUpdateLike(post._id)}
                                    className={`w-20 border ${likedPosts.includes(post._id)
                                        ? "bg-blue-500 text-white border-none"
                                        : ""} border-zinc-300 h-10 rounded flex justify-center items-center cursor-pointer`} >                                        
                                    <ThumbsUp />
                                </button>
                                <input
                                    type="text"
                                    className="w-2/3 h-10 border border-zinc-300 outline-none px-5 rounded"
                                    placeholder="Share your thoughts" />
                                <button className="w-32 h-10 text-white bg-blue-600 rounded cursor-pointer">
                                    Send
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-zinc-500 mt-5">No posts found.</div>
                )
            }
        </div>
        </>
    )
}