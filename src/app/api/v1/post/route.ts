import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import ResponseHelper from "@/utils/ResponseHelper";

export async function POST(req: Request){
    const cookie = await cookies()
    const token = cookie.get("token")?.value;
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

    const userId = decodedToken?.userId;
    if (!userId) {
        return ResponseHelper.error("Invalid token payload", 400);
    }

    try {
        const { content, tags, images } = await req.json();
        if (!content) {
            return ResponseHelper.error("Content is required", 400);
        }

        // const 

    } catch (error) {
        
    }
}