import { User } from "@/models/user.models";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken"

export const genToken = async (userId: ObjectId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error("user not found in the db")
    }

    const accessSecret = process.env.ACCESS_SECRET!
    const accessToken = jwt.sign(
        {
            _id: user?._id,
            fullName: user?.fullName,
            email: user?.email
        },
        accessSecret,
        {
            expiresIn: '5d'
        }
    )

    const refreshSecret = process.env.REFRESH_SECRET!
    const refreshToken = jwt.sign(
        {
            _id: user?._id
        },
        refreshSecret,
        {
            expiresIn: '30d'
        }
    )

    return { accessToken, refreshToken }
}