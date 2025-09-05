import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();
const secret = process.env.JWT_SECRET || "secretxexample"

type JwtPayload = {
    userId: string
}

export const VerifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, secret) as JwtPayload
    } catch (error: any) {
        throw new Error(error.message || "Invalid token")
    }
}

export const DecodeAccessToken = (token: string) => {
    return jwt.decode(token) as JwtPayload | null
}

export const GenerateAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, secret)
}

export const VerifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, secret) as JwtPayload
    } catch (error: any) {
        throw new Error(error.message || "Invalid token")
    }
}

export const DecodeRefreshToken = (token: string) => {
    return jwt.decode(token) as JwtPayload | null
}

export const GenerateRefreshToken = (payload: JwtPayload) => {
    return jwt.sign(payload, secret)
}