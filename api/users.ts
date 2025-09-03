// api/users.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/database';
import { getUsers, createUser } from '../src/controller/user.controller';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await connectDB();

  if (req.method === 'GET') {
    return getUsers(req as any, res as any);
  }

  if (req.method === 'POST') {
    return createUser(req as any, res as any);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
