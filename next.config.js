/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/auth', destination: '/auth/signin', permanent: false },
      { source: '/user', destination: '/user/home', permanent: false },
      { source: '/', destination: '/user/home', permanent: false },
    ];
  },
  i18n: {
    locales: ['en', 'cn'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
