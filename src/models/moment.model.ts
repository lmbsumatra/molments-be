import mongoose, { Schema, model } from "mongoose";

const Moment = new Schema(
    {
        content: { type: String, required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    }, { timestamps: true }
)

export const MomentModel = model("Moment", Moment);