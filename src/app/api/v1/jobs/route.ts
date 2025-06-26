import { Job } from "@/models/job.models";
import { User } from "@/models/user.models";
import ResponseHelper from "@/utils/ResponseHelper";
import { CONNECTDB } from "@/utils/connectDB";
import { logger } from "@/utils/logger";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const jobId = url.searchParams.get('id')

    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value
    if (!token) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    const secret = process.env.ACCESS_SECRET as string
    let decodedToken: any;

    try {
        decodedToken = jwt.verify(token, secret)
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token", 401)
    }

    const userId = await decodedToken?._id
    if (!userId) {
        return ResponseHelper.error("Invalid token payload", 400)
    }

    if (jobId) {
        try {
            await CONNECTDB()
            const user = await User.findById(userId)
            if(!user) {
                return ResponseHelper.error("User not found", 404)
            }

            const jobData = await Job.aggregate([
                {
                    $match: { 
                        _id: new mongoose.Types.ObjectId(jobId)
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "postedBy",
                        foreignField: "_id",
                        as: "authorDetails"
                    }
                },
                {
                    $addFields: {
                        authorData: { $arrayElemAt: ["$authorDetails", 0] }
                    }
                },
                {
                    $project: {
                        authorDetails: 0,
                        "authorData.password": 0,
                        "authorData.refreshToken": 0
                    }
                }
            ])

            return ResponseHelper.success(jobData, "Job data for specific id", 200)

        } catch (error:any) {
            logger(error?.message, `Failed to get job for ${jobId}`, 'warn')
            return ResponseHelper.error(`Failed to get jobs ${jobId}`, 500, error)
        }
    } else {
        try {
            await CONNECTDB()
            const user = await User.findById(userId)
            if (!user) {
                return ResponseHelper.error("User not found", 404)
            }
            
            const allJob = await Job.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "postedBy",
                        foreignField: "_id",
                        as: "authorDetails"
                    }
                },
                {
                    $addFields: {
                        authorData: { $arrayElemAt: ["$authorDetails", 0] }
                    }
                },
                {
                    $project: {
                        authorDetails: 0,
                        "authorData.password": 0,
                        "authorData.refreshToken": 0
                    }
                }
            ])

            return ResponseHelper.success(allJob, "All job details", 200)
        } catch (error: any) {
            logger(error?.message, "Failed to get jobs", 'warn')
            return ResponseHelper.error("Failed to get jobs", 500, error)
        }
    }
}