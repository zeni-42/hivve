import { User } from "@/models/user.models";
import cloudinary from "@/utils/cloudinary";
import { CONNECTDB } from "@/utils/connectDB";
import { logger } from "@/utils/logger";
import ResponseHelper from "@/utils/ResponseHelper";
import { unlinkSync, writeFileSync } from "fs";
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
        decodedToken = jwt.verify(token, secret);
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token", 401);
    }

    const userId = decodedToken?._id;
    if (!userId) {
        return ResponseHelper.error("Invalid token payload", 400);
    }

    const formData = await req.formData()
    const bannerImage =formData.get("banner") as File
    
    if (!(bannerImage && userId)) {
        return ResponseHelper.error("Missing values")
    }

    const byte = await bannerImage.arrayBuffer()
    const buffer = Buffer.from(byte)
    const fileName = `banner_${bannerImage.name}`
    const cwd = process.cwd()
    const filePath = path.join(cwd, '/public', fileName)
    writeFileSync(filePath, buffer)

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const result = await cloudinary.uploader.upload(filePath, {
            folder: "banner_image",
            resource_type: "image",
        })

        await User.findByIdAndUpdate(
            userId,
            { banner: result.secure_url }
        )

        return ResponseHelper.success({ userId: user?._id, banner: user?.banner }, "Banner updated successfully", 200)

    } catch (error: any) {
        logger(error.message, 'Failed to update banner', 'warn')
        return ResponseHelper.error('Failed to update banner', 500, error)
    } finally {
        unlinkSync(filePath)
    }
}