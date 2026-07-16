import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow the Replit preview proxy's host to connect to the dev server
  // (HMR websocket, dev asset requests) since it's served via an iframe
  // proxy on a different origin than localhost.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // The Express API (server/) runs on an internal-only port in this
  // environment. Browser requests hit this Next.js server on the public
  // port and get proxied server-side to the internal API, so the client
  // never needs direct network access to the backend's port.
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: "https://learnify-server-phi.vercel.app:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
