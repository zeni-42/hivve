'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { Bold, Italic, UnderlineIcon, Link2, Images } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useUserStore } from '@/store/user.store'

const Tiptap = () => {
    const { hydrate } = useUserStore()
    const fileRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

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

            {imagePreviewUrl && (
                <div className="mt-4">
                    <Image
                        src={imagePreviewUrl}
                        alt="Selected"
                        width={1000}
                        height={1000}
                        className="w-80 h-auto rounded border" />
                </div>
            )}
        </div>
    )
}

export default Tiptap