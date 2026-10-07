import os, shutil

root = r"E:\Project\Portfolio"
frontend = os.path.join(root, "frontend")

# 1. Sync src
if os.path.exists(os.path.join(root, "src")):
    shutil.rmtree(os.path.join(root, "src"))
shutil.copytree(os.path.join(frontend, "src"), os.path.join(root, "src"))
print("Synced src")

# 2. Sync public
if os.path.exists(os.path.join(root, "public")):
    shutil.rmtree(os.path.join(root, "public"))
shutil.copytree(os.path.join(frontend, "public"), os.path.join(root, "public"))
print("Synced public")

# 3. Config files
shutil.copy2(os.path.join(frontend, "package.json"), os.path.join(root, "package.json"))
shutil.copy2(os.path.join(frontend, "postcss.config.mjs"), os.path.join(root, "postcss.config.mjs"))
shutil.copy2(os.path.join(frontend, "tailwind.config.ts"), os.path.join(root, "tailwind.config.ts"))
shutil.copy2(os.path.join(frontend, "tsconfig.json"), os.path.join(root, "tsconfig.json"))

# 4. next.config.mjs
next_cfg = """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
"""
with open(os.path.join(root, "next.config.mjs"), "w", encoding="utf-8") as f:
    f.write(next_cfg)

# 5. vercel.json
vercel_cfg = """{
  "installCommand": "npm install --legacy-peer-deps --include=dev",
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
"""
with open(os.path.join(root, "vercel.json"), "w", encoding="utf-8") as f:
    f.write(vercel_cfg)

print("Harmonized root Next.js configuration successfully!")
