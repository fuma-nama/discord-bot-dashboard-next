import { NextApiRequest, NextApiResponse } from 'next';
import {
  AccessToken,
  API_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  setServerSession,
} from '@/utils/auth/server';
import { APP_URL } from '@/utils/get-absolute-url';

async function exchangeToken(code: string): Promise<AccessToken> {
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: `${APP_URL}/api/auth/callback`,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    headers,
    method: 'POST',
    body: new URLSearchParams(data),
  });

  if (response.ok) {
    return (await response.json()) as AccessToken;
  } else {
    throw new Error('Failed to exchange token');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;
  if (typeof code !== 'string' || code == null) {
    await res.status(400).json('Invalid query param');
    return;
  }

  const token = await exchangeToken(code);

  setServerSession(req, res, token);
  res.redirect(`/user/home`);
}
