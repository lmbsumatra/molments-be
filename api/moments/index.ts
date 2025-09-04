import { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "../../src/config/database";
import { createMoment } from "../../src/controller/moment.controller";

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === 'OPTIONS') return res.status(200).end();

    await connectDB();

    try {
        switch (req.method) {
            case 'POST':
                const newMoment = await createMoment(req.body);
                return res.status(201).json(newMoment);
                break;
        }

    } catch (err: any) {
        res.status(500).json({ error: err.message ? err.message : "Internal Server Error" })
    }
}