import ResponseHelper from "@/utils/ResponseHelper";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CONNECTDB } from "@/utils/connectDB";
import { User } from "@/models/user.models";
import { logger } from "@/utils/logger";

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value
    if (!token) {
        return ResponseHelper.error("Unauthorized", 401)
    }

    const secret = process.env.ACCESS_SECRET as string
    let decodeToken: any;

    try {
        decodeToken = jwt.verify(token, secret)
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token token", 401)
    }

    const userId = decodeToken?._id!
    if (!userId) {
        return ResponseHelper.error("Invalid token payload", 400)
    }

    const { roleType } = await req.json()
    if (!roleType) {
        return ResponseHelper.error("Role is required", 400)
    }

    try {
        await CONNECTDB();
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        await User.findByIdAndUpdate(userId, {
            role: roleType
        })

        return ResponseHelper.success({}, "Role update successfully", 200)
    } catch (error: any) {
        logger(error.message, `Failed to update role of userId = ${userId}`, 'warn')
        return ResponseHelper.error(`Failed to update role of userId = ${userId}`, 500, error)
    }
}