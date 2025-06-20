import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface jobInterface extends Document {
    title: string,
    description: string,
    location: string,
    salary: number,
    jobType: string,
    postedBy: ObjectId,
    lastDate: Date
}

const jobSchema: Schema<jobInterface> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        index: true,
        maxlength: 5000,
    },
    location: {
        type: String,
        index: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        default: 0
    },
    jobType: {
        type: String,
        enum: ['fullTime', 'partTime', 'internship'],
        required: true,
        default: 'fullTime'
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    lastDate: {
        type: Date,
        required: true,
    }
} , { timestamps: true })

export const Job = mongoose.models.Job as mongoose.Model<jobInterface> || mongoose.model<jobInterface>("Job", jobSchema)