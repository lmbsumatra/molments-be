import { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";
import { UserModel } from "../../src/models/user.model";
import bcrypt from "bcrypt"
import { GenerateAccessToken, GenerateRefreshToken } from "../../src/utils/token.util";
import cookie from "cookie"

dotenv.config();
const SECRET = process.env.JWT_SECRET || "samplexsecret";

const handler = async (req: VercelRequest, res: VercelResponse) => {
    try {
        if (req.method !== 'POST') {
            return res.status(500).json({ error: "Method not allowed!" })
        }

        const metConditions = []
        if (req.body.username) metConditions.push({ username: req.body.username })
        if (req.body.email) metConditions.push({ email: req.body.email })

        if (metConditions.length === 0) {
            return res.status(500).json({ error: "Invalid login credentials" })
        }

        const user = await UserModel.findOne({ $or: metConditions })

        if (!user) {
            return res.status(500).json({ error: "User not found" })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(500).json({ error: "Invalid login credentials" })
        }

        const accessToken = GenerateAccessToken({ userId: user.id })
        const refreshToken = GenerateRefreshToken({ userId: user.id })

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 // 1 hour
            })
        );

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 // 1 hour
            })
        );

        return res.status(200).json({ message: "Log in successful!" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export default handler;