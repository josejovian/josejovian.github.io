/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['student-activity.binus.ac.id'],
  },
}

module.exports = nextConfig
