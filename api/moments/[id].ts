import { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "../../src/config/database";
import { createMoment, deleteMoment, getMoment, getMoments, updateMoment } from "../../src/controller/moment.controller";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") return res.status(200).end();

    await connectDB();

    try {
        let token: string | undefined;

        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else if (req.headers.cookie) {
            const cookies = parse(req.headers.cookie);
            token = cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json({ error: "No access token provided" });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return res.status(403).json({ error: "Invalid or expired access token" });
        }

        const userId = decoded.userId as string;

        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Valid user ID is required' });
        }

        switch (req.method) {
            case 'GET':
                const moment = await getMoment(id, userId);
                if (!moment) return res.status(404).json({ error: 'Moment not found' });
                return res.status(200).json(moment);

            case 'PUT':
                const updatedMoment = await updateMoment(id, req.body, userId);
                if (!updatedMoment) return res.status(404).json({ error: 'Moment not found' });
                return res.status(200).json(updatedMoment);

            case 'DELETE':
                const deletedMoment = await deleteMoment(id, userId);
                if (!deletedMoment) return res.status(404).json({ error: 'Moment not found' });
                return res.status(204).send('');

            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message ?? "Internal Server Error" });
    }
}
