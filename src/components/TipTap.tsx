'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { Bold, Italic, UnderlineIcon, Link2, Images, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useUserStore } from '@/store/user.store'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Tiptap = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { hydrate } = useUserStore()
    const fileRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const router = useRouter()

    const handleImageClick = () => {
        fileRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setImagePreviewUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        hydrate()
    }, [hydrate])

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
        }
    }, [imagePreviewUrl])

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg m-0 focus:outline-none outline-none'
            }
        },
    })

    if (!editor) return null

    const handlePostData = async () => {
        try {
            setIsLoading(true)
            const html = editor.getHTML()
            if (!html || html === '<p></p>') {
                toast.warn("Cannot save an empty post")
                return
            } 
            const formData = new FormData()
            formData.append("content", html)
            if (selectedFile) formData.append("image", selectedFile);
            const response = await axios.post('/api/v1/post/', formData, { withCredentials: true })
            if (response.status == 200) {
                toast.success("Post created successfully")
                router.push('/home')
            }
        } catch (error: any) {
            if (error?.response?.status == 401) {
                router.push('/auth/sign-in')
            } else {
                toast.error(error?.response?.data.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="flex mb-5">
                <div className='w-3/4 flex justify-start items-center gap-2'>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={editor.isActive("bold") ? "bg-blue-200 size-10 rounded flex justify-center items-center cursor-pointer" : "cursor-pointer size-10 flex justify-center items-center"}>
                        <Bold />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={editor.isActive("italic") ? "bg-blue-200 size-10 rounded flex justify-center items-center cursor-pointer" : "cursor-pointer size-10 flex justify-center items-center"}>
                        <Italic />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        className={editor.isActive("underline") ? "bg-blue-200 size-10 rounded flex justify-center items-center cursor-pointer" : "cursor-pointer size-10 flex justify-center items-center"}>
                        <UnderlineIcon />
                    </button>

                    <button
                        onClick={() => {
                            const url = window.prompt('Enter URL')
                            if (url) {
                                editor.chain().focus().setLink({ href: url }).run()
                            }
                        }}
                        className="px-2">
                        <Link2 />
                    </button>
                </div>
                <div className='w-1/4 flex justify-end items-center'>
                    <button className='size-10 flex justify-center items-center text-zinc-700 cursor-pointer' onClick={handleImageClick}>
                        <Images />
                    </button>
                </div>
            </div>

            <EditorContent editor={editor} className="border p-2 rounded" />

            <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" />

        <div className='w-full mt-5 flex justify-center items-center flex-col gap-5' >
            {imagePreviewUrl && (
                <div className="mt-4">
                    <Image
                        src={imagePreviewUrl}
                        alt="Selected"
                        width={1000}
                        height={1000}
                        className="w-full h-auto rounded border" />
                </div>
            )}
                <button disabled={isLoading} className='bg-blue-600 w-40 h-12 rounded text-white cursor-pointer' onClick={() => handlePostData()} >
                    {
                        isLoading ? (<span className='flex justify-center items-center w-full h-full'><Loader2 className='animate-spin' /></span>) : (<>Post</>) 
                    }
                </button>
            </div>
        </div>
    )
}

export default Tiptap