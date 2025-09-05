import z from "zod"

export const registerSchema = z.object({
    body: z.object({
        username: z.string().min(1, { message: "Username is required" }),
        email: z.string().min(1, { message: "Email is required" }),
        password: z.string().min(6, { message: "Password is required to be 6 characters" }),
        confirmPassword: z.string().min(6, { message: "Confirm password is required to be 6 characters" }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Passwords do not match"
    })
})

export type registerInput = z.infer<typeof registerSchema>['body']; // ['body'] -> to extract body from req.body

export const loginSchema = z.object({
    body: z.object({
        username: z.string().min(1, { message: "Username is required" }),
        email: z.string().min(1, { message: "Email is required" }),
        password: z.string().min(6, { message: "Password is required to be 6 characters" }),
    })
})

export type loginInput = z.infer<typeof loginSchema>['body']; // ['body'] -> to extract body from req.body