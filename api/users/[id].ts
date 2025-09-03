import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../../src/config/database';
import {
  getUser,
  updateUser,
  deleteUser
} from '../../src/controller/user.controller';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Valid user ID is required' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const user = await getUser(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(user);

      case 'PUT':
        const updatedUser = await updateUser(id, req.body);
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(updatedUser);

      case 'DELETE':
        const deletedUser = await deleteUser(id);
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