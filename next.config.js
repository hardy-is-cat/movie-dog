/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY_AUTH;
const currentYear = new Date().getFullYear().toString();
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/list/year',
        destination: `/list/year/${currentYear}`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/movie/:year/:idx',
        destination: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=:idx&primary_release_date.gte=:year-01-01&primary_release_date.lte=:year-12-31&api_key=${API_KEY}&sort_by=vote_count.desc`,
      },
    ];
  },
};

module.exports = nextConfig;
