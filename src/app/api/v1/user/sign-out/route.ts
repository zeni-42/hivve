import { User } from "@/models/user.models";
import { CONNECTDB } from "@/utils/connectDB"
import { logger } from "@/utils/logger";
import ResponseHelper from "@/utils/ResponseHelper"
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { userId } = await request.json()
    if (!userId) {
        return ResponseHelper.error('User id is required', 400)
    }

    const cookie = await cookies()
    const accessToken = cookie.get("accessToken")
    if (!accessToken) {
        return ResponseHelper.error("Unauthorized request", 401)
    }

    try {
        await CONNECTDB();
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error('User not found', 404)
        }

        await User.findByIdAndUpdate(
            userId,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        cookie.delete("accessToken");
        cookie.delete("refreshToken");

        return ResponseHelper.success({}, "User signed out", 200)
    } catch (error: any) {
        logger(error.message, "Failed to sign out user", 'warn');
        return ResponseHelper.error('Failed to sign out user', 500, error)
    }
}