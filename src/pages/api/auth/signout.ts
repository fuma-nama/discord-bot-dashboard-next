import { NextApiRequest, NextApiResponse } from 'next';
import { removeSession } from '@/utils/auth/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await removeSession(req, res);
  res.status(200).json('logged out');
}
