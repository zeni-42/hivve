import { User } from "@/models/user.models"
import { CONNECTDB } from "@/utils/connectDB"
import { logger } from "@/utils/logger"
import ResponseHelper from "@/utils/ResponseHelper"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    const { fullName, email, password } = await request.json()
    if (!(fullName && email && password)) {
        return ResponseHelper.error('All fields are required', 400)
    }

    try {
        await CONNECTDB()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return ResponseHelper.error('This email is taken', 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        })

        const userData = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        return ResponseHelper.success(userData, 'User signed up successfully', 201)
    } catch (error: any) {
        logger(error.message, 'Failed to sign up user', 'warn')
        return ResponseHelper.error('Failed to sign up user', 500, error)
    }
}