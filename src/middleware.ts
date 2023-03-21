export { default } from './utils/auth/middleware';

//Pages need to be logged in before visiting
export const config = {
  matcher: ['/guilds/:path*', '/user/:path*'],
};
