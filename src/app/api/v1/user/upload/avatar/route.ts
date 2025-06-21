import { User } from "@/models/user.models";
import cloudinary from "@/utils/cloudinary";
import { CONNECTDB } from "@/utils/connectDB";
import { logger } from "@/utils/logger";
import ResponseHelper from "@/utils/ResponseHelper";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value
    if (!token) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    const formData = await req.formData()
    const image = formData.get("image") as File;
    const userId = formData.get("userId") as String

    if (!image || !userId) {
        return ResponseHelper.error("Missing data", 400)
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `avatar_${image.name}.png`;
    const filePath = path.join("/tmp", fileName);
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

        return ResponseHelper.success({ avatar: user?.avatar }, "Profile picure added successfully")
    } catch (error: any) {
        logger(error.message, 'Failed to update profile picture', 'warn')
        return ResponseHelper.error('Failed to update profile picture', 500, error)
    }
}