import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/database';
import {
  createUserLogic,
  getUsersLogic,
  getUserLogic,
  updateUserLogic,
  deleteUserLogic
} from '../src/controller/user.controller';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const user = await getUserLogic(req.query.id as string);
          if (!user) return res.status(404).json({ error: 'User not found' });
          return res.status(200).json(user);
        } else {
          const users = await getUsersLogic();
          return res.status(200).json(users);
        }
      case 'POST':
        const newUser = await createUserLogic(req.body);
        return res.status(201).json(newUser);
      case 'PUT':
        if (!req.query.id) return res.status(400).json({ error: 'User ID required' });
        const updatedUser = await updateUserLogic(req.query.id as string, req.body);
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(updatedUser);
      case 'DELETE':
        if (!req.query.id) return res.status(400).json({ error: 'User ID required' });
        const deletedUser = await deleteUserLogic(req.query.id as string);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        return res.status(204).send('');
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
