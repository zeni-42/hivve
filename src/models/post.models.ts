import mongoose, { ObjectId, Schema } from "mongoose";
interface postInterface {
    content: string,
    tags: [string],
    images: string,
    userId: ObjectId,
    likedBy: [ObjectId]
}

const postSchema: Schema<postInterface> = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 10000,
        index: true
    },
    tags: [{
        type: String,
        trim: true,
    }],
    images: {
        type: String,
        required: false,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, { timestamps: true })

export const Post = mongoose.models.Post as mongoose.Model<postInterface> || mongoose.model<postInterface>("Post", postSchema)