import { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";
import cookie from "cookie";

dotenv.config({ path: ".env" });

const handler = async (req: VercelRequest, res: VercelResponse) => {
    try {
        res.setHeader("Set-Cookie", [
            cookie.serialize("accessToken", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" || true,
                sameSite: "strict",
                path: "/",
                expires: new Date(0), // clear immediately
            }),
            cookie.serialize("refreshToken", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" || true,
                sameSite: "strict",
                path: "/",
                expires: new Date(0), // clear immediately
            }),
        ]);

        return res.status(200).json({ message: "Log out successful!" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default handler;
