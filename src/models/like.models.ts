import mongoose, { ObjectId, Schema } from "mongoose";

interface likesInterface {
    postId: ObjectId
    likedBy: [ObjectId]
}

const likeSchema: Schema<likesInterface> = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }]
}, { timestamps: true })

export const Like = mongoose.models.Like as mongoose.Model<likesInterface> || mongoose.model<likesInterface>("Like", likeSchema)