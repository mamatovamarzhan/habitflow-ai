/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Skip ESLint during `next build`. Vercel installs only production deps,
  // so without eslint/eslint-config-next in devDependencies the build fails.
  // We're not enforcing lint at build time — fine for a static content site.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
