const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const FRONTEND_SRC_DIR = path.join(ROOT_DIR, 'frontend', 'src');

const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const FRONTEND_PUBLIC_DIR = path.join(ROOT_DIR, 'frontend', 'public');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function sync() {
  console.log('[*] Synchronizing root src -> frontend/src ...');
  if (fs.existsSync(FRONTEND_SRC_DIR)) {
    fs.rmSync(FRONTEND_SRC_DIR, { recursive: true, force: true });
  }
  copyRecursiveSync(SRC_DIR, FRONTEND_SRC_DIR);
  console.log('    [OK] src -> frontend/src synced.');

  console.log('[*] Synchronizing root public -> frontend/public ...');
  if (fs.existsSync(FRONTEND_PUBLIC_DIR)) {
    fs.rmSync(FRONTEND_PUBLIC_DIR, { recursive: true, force: true });
  }
  copyRecursiveSync(PUBLIC_DIR, FRONTEND_PUBLIC_DIR);
  console.log('    [OK] public -> frontend/public synced.');

  const syncFiles = ['package.json', 'next.config.mjs', 'tailwind.config.ts', 'tsconfig.json', 'vercel.json'];
  syncFiles.forEach((filename) => {
    const srcFile = path.join(ROOT_DIR, filename);
    const dstFile = path.join(ROOT_DIR, 'frontend', filename);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, dstFile);
      console.log(`    [OK] ${filename} -> frontend/${filename} synced.`);
    }
  });

  console.log('\n[SUCCESS] All portfolio files synchronized automatically! No repeated manual work needed.');
}

sync();
