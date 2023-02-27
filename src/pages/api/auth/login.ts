import { NextApiRequest, NextApiResponse } from 'next';

export const API_ENDPOINT = 'https://discord.com/api/v10';
export const CLIENT_ID = process.env.BOT_CLIENT_ID ?? '';
export const CLIENT_SECRET = process.env.BOT_CLIENT_SECRET ?? '';

export const APP_URL = getAbsoluteUrl();

function getAbsoluteUrl(): string {
  const defaultUrl = 'http://localhost:3000';

  if (process.env.APP_URL != null) return process.env.APP_URL;

  return process.env.VERCEL_URL == null ? defaultUrl : `https://${process.env.VERCEL_URL}`;
}

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const url =
    'https://discord.com/api/oauth2/authorize?' +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: `${APP_URL}/api/auth/callback`,
      response_type: 'code',
      scope: 'identify guilds',
    });

  res.redirect(302, url);
}
