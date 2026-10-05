import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // This archive is large: avoid oversubscribing memory on Pages runners.
  experimental: { cpus: 2 },
};

export default createMDX()(nextConfig);
