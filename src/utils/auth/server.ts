import { deleteCookie, setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import type { OptionsType } from 'cookies-next/lib/types';
import type { IncomingMessage } from 'http';

export const API_ENDPOINT = 'https://discord.com/api/v10';
export const CLIENT_ID = process.env.BOT_CLIENT_ID ?? '';
export const CLIENT_SECRET = process.env.BOT_CLIENT_SECRET ?? '';

const TokenCookie = 'ts-token';

const tokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
});

const options: OptionsType = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 30,
};

export type AccessToken = z.infer<typeof tokenSchema>;

export function middleware_hasServerSession(req: NextRequest) {
  const raw = req.cookies.get(TokenCookie)?.value;

  return raw != null && tokenSchema.safeParse(JSON.parse(raw)).success;
}

export function getServerSession(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
) {
  const raw = req.cookies[TokenCookie];

  return tokenSchema.safeParse(raw == null ? raw : JSON.parse(raw));
}

export function setServerSession(req: NextApiRequest, res: NextApiResponse, data: AccessToken) {
  setCookie(TokenCookie, data, { req, res, ...options });
}

export async function removeSession(req: NextApiRequest, res: NextApiResponse) {
  const session = getServerSession(req);

  if (session.success) {
    deleteCookie(TokenCookie, { req, res, ...options });
    await revokeToken(session.data.access_token);
  }
}

async function revokeToken(accessToken: string) {
  const data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    token: accessToken,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  await fetch(`https://discord.com/api/oauth2/token/revoke`, {
    headers,
    body: new URLSearchParams(data),
    method: 'POST',
  });
}
