import { User } from "@/models/user.models";
import { CONNECTDB } from "@/utils/connectDB";
import { logger } from "@/utils/logger";
import ResponseHelper from "@/utils/ResponseHelper";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

export async function GET(request: Request) {
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
        return ResponseHelper.error("Invalid or expired token", 401)
    }

    const userId = decodedToken?._id!
    if (!userId) {
        return ResponseHelper.error("Inavlaid token payload", 400)
    }

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const userData = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "postedJobs",
                    foreignField: "_id",
                    as: "jobsData"
                }
            },
            {
                $project: {
                    postedJobs: 0,
                    password: 0,
                    refreshToken: 0
                }
            }
        ])

        return ResponseHelper.success(userData, "User data", 200)

    } catch (error: any) {
        logger(error?.message, "Failed to retrieve user data", 'fatal')
        return ResponseHelper.error("Failed to retrieve user data", 500, error)
    }
}