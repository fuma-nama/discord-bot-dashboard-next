import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from '@/utils/auth/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getServerSession(req);

  if (!session.success) {
    res.status(401).json('You must login first');
    return;
  }

  res.status(200).json(session.data);
}
