/** Same Pages Router / static-export model as abhibny/portfolio. */
module.exports = (phase) => ({
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  distDir: phase === 'phase-development-server' ? '.next-dev' : '.next',
});
