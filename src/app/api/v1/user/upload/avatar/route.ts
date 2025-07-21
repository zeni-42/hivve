import { User } from "@/models/user.models";
import cloudinary from "@/utils/cloudinary";
import { CONNECTDB } from "@/utils/connectDB";
import { logger } from "@/utils/logger";
import ResponseHelper from "@/utils/ResponseHelper";
import { unlinkSync } from "fs";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value
    if (!token) {
        return ResponseHelper.error("Unauthorized access", 401)
    }
    
    const secret = process.env.ACCESS_SECRET as string;
    if (!secret) {
        return ResponseHelper.error("Server error: JWT secret not configured", 500);
    }

    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, secret)
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token", 401)
    }

    const userId = decodedToken?._id
    if (!userId) {
        return ResponseHelper.error("Invalid token payload", 400);
    }


    const formData = await req.formData()
    const image = formData.get("image") as File;

    if (!image || !userId) {
        return ResponseHelper.error("Missing data", 400)
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `avatar_${image.name}`;
    const cwd = process.cwd()
    const filePath = path.join(cwd, '/public', fileName);
    await writeFile(filePath, buffer)

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const result = await cloudinary.uploader.upload(filePath, {
            folder: "avatar_images", 
            resource_type: "image"
        })

        await User.findByIdAndUpdate(
            user?._id, 
            { avatar: result?.secure_url }
        )

        return ResponseHelper.success({ userId: user?._id, avatar: user?.avatar }, "Profile picure added successfully", 200)
    } catch (error: any) {
        logger(error.message, 'Failed to update profile picture', 'warn')
        return ResponseHelper.error('Failed to update profile picture', 500, error)
    } finally {
        unlinkSync(filePath)
    }
}