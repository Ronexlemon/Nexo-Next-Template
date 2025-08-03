// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ...( {
      allowedDevOrigins: [
        'https://bbc5a2a168e8.ngrok-free.app',
        'http://localhost:3000',
      ],
    } as any )
  }
};

export default nextConfig;

