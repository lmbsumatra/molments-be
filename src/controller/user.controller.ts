import type { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import type { registerInput } from '../validations/user.schema';

// Request<Params = {}, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>
export const createUser = async (req: Request<{}, {}, registerInput>, res: Response) => {
    try {
        const user = await UserModel.create(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};

// If a function receives an argument but doesn't use it, you prefix it with _ to show it’s intentionally unused.
export const getUsers = async (_req: Request, res: Response) => {
    const users = await UserModel.find();
    return res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(204).send();
};
