import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface userInterface extends Document {
    fullName: string,
    email: string,
    password: string,
    avatar: string,
    banner: string,
    bio: string,
    refreshToken: string,
    isPro: boolean,
    isVerified: boolean,
    role: string,
    postedJobs: [ObjectId]
    isNewbie: boolean
    post: [ObjectId]
}

const userSchema: Schema<userInterface> = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dfbtssuwy/image/upload/v1735838884/ljziqvhelksqmytkffj9.jpg",
    },
    banner: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dfbtssuwy/image/upload/v1748333020/fhciifhvqp77jufdev4b.jpg",
    },
    refreshToken: {
        type: String,
    },
    isPro: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['None', 'jobseeker', 'employer', 'admin'],
        default: 'None'
    },
    isNewbie: {
        type: Boolean,
        required: true,
        default: true
    },
    postedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            index: true
        }
    ],
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        index: true
    }]
}, { timestamps: true })

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>("User", userSchema)