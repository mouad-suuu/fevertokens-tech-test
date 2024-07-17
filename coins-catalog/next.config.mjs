/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        pathname: "/coins/images/**", // Ensure this matches the pattern of the URLs you're using
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
