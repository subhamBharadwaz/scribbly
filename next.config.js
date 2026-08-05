import { withSentryConfig } from "@sentry/nextjs";

import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 */
jiti("./src/env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "uplaodthing.com",
      },
    ],
  },
};

export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: "subham-bharadwaz",
    project: "scribbly",
  },
  {
    widenClientFileUpload: true,

    transpileClientSDK: true,

    hideSourceMaps: true,

    disableLogger: true,

    automaticVercelMonitors: true,
  },
);
