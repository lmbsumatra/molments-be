import mongoose from "mongoose";
import z from "zod";

export const momentSchema = z.object({
    body: z.object({
        _id: z.string().optional(),
        content: z.string().min(1, { message: "Content is required" }),
        authorId: z
            .string()
            .refine((val) => mongoose.Types.ObjectId.isValid(val), {
                message: "Invalid authorId",
            }),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    })
})

export type momentInput = z.infer<typeof momentSchema>['body']