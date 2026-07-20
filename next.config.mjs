/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export -> produces ./out, which the FastAPI backend serves.
  // This is what makes the whole site deployable as a single Hugging Face
  // Docker Space (and any static host).
  output: "export",
  images: {
    unoptimized: true,
  },
  // Nice clean URLs as folders (about/ instead of about.html)
  trailingSlash: true,
};

export default nextConfig;
