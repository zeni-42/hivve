import { Post } from "@/models/post.models"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import ResponseHelper from "@/utils/ResponseHelper"
import { CONNECTDB } from "@/utils/connectDB"
import { User } from "@/models/user.models"
import { logger } from "@/utils/logger"

export async function POST (req: Request) {
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

    const { postId } = await req.json()
    if (!postId) {
        return ResponseHelper.error("Post id is required", 400)
    }

    try {
        await CONNECTDB()
        const post = await Post.findById(postId)
        if (!post) {
            return ResponseHelper.error("Post not found", 404)
        }

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        if (post.likedBy.includes(userId)) {
            await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: {
                        likedBy: userId
                    }
                }
            )
        } else {
            await Post.findByIdAndUpdate(
                postId,
                {
                    $addToSet: {
                        likedBy: userId
                    }
                }
            )
        }

        return ResponseHelper.success({}, "Likes added", 200)
    } catch (error:any) {
        logger(error?.message, `Failed to add a like`, 'warn')
        return ResponseHelper.error(`Failed to add a like`, 500, error)
    }
}