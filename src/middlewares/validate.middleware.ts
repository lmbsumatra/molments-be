import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next();
    } catch (error: any) {
        res.status(500).json({ message: `Error: ${error}` })
    }
}