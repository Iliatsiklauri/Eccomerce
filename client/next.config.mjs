/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d31o8esktuui0e.cloudfront.net",
        port: "",
        pathname: "/products/**",
      },
      {
        protocol: "https",
        hostname: "d31o8esktuui0e.cloudfront.net",
        port: "",
        pathname: "/category/**",
      },
      {
        protocol: "https",
        hostname: "d31o8esktuui0e.cloudfront.net",
        port: "",
        pathname: "/pinnedImages/**",
      },
    ],
  },
};

export default nextConfig;
