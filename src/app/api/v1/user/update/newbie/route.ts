import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import ResponseHelper from "@/utils/ResponseHelper"
import { CONNECTDB } from "@/utils/connectDB"
import { User } from "@/models/user.models"
import { logger } from "@/utils/logger"

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value
    if(!token) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    const secret = process.env.ACCESS_SECRET as string
    let decodedToken: any;

    try {
        decodedToken = jwt.verify(token, secret)
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token token", 401)
    }

    const userId = decodedToken?._id!
    if (!userId) {
        return ResponseHelper.error("Inavlaid token payload", 400)
    }

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if(!user){
            return ResponseHelper.error("User not found", 200)
        }

        await User.findByIdAndUpdate(
            userId,
            {
                isNewbie: false
            }
        )

        return ResponseHelper.success({}, "Status updated", 200)
    } catch (error: any) {
        logger(error?.message, "Failed to update newbie", 'warn')
    }
}