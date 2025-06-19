import { User } from "@/models/user.models"
import { CONNECTDB } from "@/utils/connectDB"
import { genToken } from "@/utils/genToken"
import { logger } from "@/utils/logger"
import ResponseHelper from "@/utils/ResponseHelper"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongoose"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const { email, password } = await request.json()
    if (!(email && password)) {
        return ResponseHelper.error('All fields are required', 400)
    }

    try {
        await CONNECTDB()

        const user = await User.findOne({ email })
        if (!user) {
            return ResponseHelper.error('User not found', 404)
        }

        const isValidPassword = await bcrypt.compare(password, user?.password)
        if (!isValidPassword) {
            return ResponseHelper.error('Invalid credentials', 400)
        }

        const { accessToken, refreshToken }= await genToken(user?._id as ObjectId)
        const cookie = await cookies()
        cookie.set('accessToken', accessToken, { secure: true, sameSite: true, httpOnly: true })
        cookie.set('refreshToken', refreshToken, { secure: true, sameSite: true, httpOnly: true })

        const updatedUser = await User.findByIdAndUpdate(user._id, { refreshToken })
        const userData = await User.findById(updatedUser?._id).select(
            "-password -refreshToken"
        )

        return ResponseHelper.success(userData, 'user signed in successfully', 200)

    } catch (error: any) {
        logger(error.message, 'Failed to sign in user', 'warn')
        return ResponseHelper.error('Failed to sign in user', 500)
    }
}