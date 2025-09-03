import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../../src/config/database';
import {
  createUser,
  getUsers
} from '../../src/controller/user.controller';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  try {
    switch (req.method) {
      case 'GET':
        const users = await getUsers();
        return res.status(200).json(users);

      case 'POST':
        const newUser = await createUser(req.body);
        return res.status(201).json(newUser);

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message ? err.message :'Internal Server Error' });
  }
}