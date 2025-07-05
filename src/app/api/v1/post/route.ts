import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import ResponseHelper from "@/utils/ResponseHelper";
import { User } from "@/models/user.models";
import { Post } from "@/models/post.models";
import { logger } from "@/utils/logger";
import cloudinary from "@/utils/cloudinary";
import path from "path";
import { writeFile } from "fs/promises";
import { unlinkSync } from "fs";

export async function POST(req: Request){
    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value;
    if (!token) {
        return ResponseHelper.error("Unauthorized", 401);
    }

    const secret = process.env.ACCESS_SECRET as string;
    if (!secret) {
        return ResponseHelper.error("Server error: JWT secret not configured", 500);
    }

    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, secret);
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token", 401);
    }

    const userId = decodedToken?._id;
    if (!userId) {
        return ResponseHelper.error("Invalid token payload", 400);
    }
    
    let secure_url: string | null;
    let newFilePath: string | null = null ;
    try {
        const data = await req.formData()
        
        const content = data.get("content") as string
        if (!content) {
            return ResponseHelper.error("Content cannot be empty", 400);
        }
        const file = data.get("image") as File

        if (file) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const filename = `post_${userId}`
            const cwd = process.cwd()
            const filePath = path.join(cwd, '/public', filename)
            await writeFile(filePath, buffer)
            
            const result = await cloudinary.uploader.upload(
                filePath, {
                    resource_type: "image",
                    folder: "post_images"
                })
            secure_url = result.secure_url
            newFilePath = filePath
        }

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const newPost = await Post.create({
            content,
            images: secure_url!,
            userId
        })

        await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    post: newPost?._id
                }
            }
        )
        return ResponseHelper.success(newPost, "Post added", 200)
    } catch (error: any) {
        logger(error?.message, `Failed to create a job`, 'warn')
        return ResponseHelper.error(`Failed to create a jobs `, 500, error)
    } finally {
        unlinkSync(newFilePath!)
    }
}