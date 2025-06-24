import jwt from "jsonwebtoken"
import { Job } from "@/models/job.models"
import { User } from "@/models/user.models"
import { CONNECTDB } from "@/utils/connectDB"
import { logger } from "@/utils/logger"
import ResponseHelper from "@/utils/ResponseHelper"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const  { title, description, location, salary, jobType, lastDate } = await request.json()
    if (!(title && description && location && salary && jobType && lastDate)) {
        return ResponseHelper.error("All fields are required")
    }

    const cookie = await cookies()
    const token = cookie.get("accessToken")?.value
    if (!token) {
        return ResponseHelper.error("Unauthorized request", 401)
    }

    const secret = process.env.ACCESS_SECRET as string
    let decodedToken: any;

    try {
        decodedToken = jwt.verify(token, secret)
    } catch (error) {
        return ResponseHelper.error("Invalid or expired token token", 401)
    }

    const userId = await decodedToken?._id!
    if (!userId) {
        return ResponseHelper.error("user id not found", 404)
    }

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("Inavlaid token payload", 400)
        }

        const job = await Job.create({
            title,
            description,
            location,
            salary,
            jobType,
            lastDate,
            postedBy: userId
        })

        await User.findByIdAndUpdate(userId, {
            $push: {
                postedJobs: job?._id
            }
        })

        return ResponseHelper.success(job, "Job registred", 201)
    } catch (error: any) {
        logger(error.message, "Failed to add job", 'warn')
        return ResponseHelper.error("Failed to add job", 500, error)
    }
}