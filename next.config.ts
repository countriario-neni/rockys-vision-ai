import type { NextConfig } from "next";

// GitHub Pages serves plain static files: no Node server, no image optimizer, no headers.
// `output: "export"` emits the whole site to out/ at build time.
//
// basePath must stay empty while a custom domain serves the site from its root. The deploy
// workflow can set NEXT_PUBLIC_BASE_PATH to /<repo> if the custom domain is ever dropped.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
