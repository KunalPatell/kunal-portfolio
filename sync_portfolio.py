import os, shutil

ROOT_DIR = r'E:\Project\Portfolio'
SRC_DIR = os.path.join(ROOT_DIR, 'src')
FRONTEND_SRC_DIR = os.path.join(ROOT_DIR, 'frontend', 'src')

PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
FRONTEND_PUBLIC_DIR = os.path.join(ROOT_DIR, 'frontend', 'public')

def sync():
    print("[*] Synchronizing root src -> frontend/src ...")
    if os.path.exists(FRONTEND_SRC_DIR):
        shutil.rmtree(FRONTEND_SRC_DIR)
    shutil.copytree(SRC_DIR, FRONTEND_SRC_DIR)
    print("    [OK] src -> frontend/src synced.")

    print("[*] Synchronizing root public -> frontend/public ...")
    if os.path.exists(FRONTEND_PUBLIC_DIR):
        shutil.rmtree(FRONTEND_PUBLIC_DIR)
    shutil.copytree(PUBLIC_DIR, FRONTEND_PUBLIC_DIR)
    print("    [OK] public -> frontend/public synced.")

    # Copy package.json, next.config.mjs, tailwind.config.ts, tsconfig.json
    for filename in ['package.json', 'next.config.mjs', 'tailwind.config.ts', 'tsconfig.json', 'vercel.json']:
        src_file = os.path.join(ROOT_DIR, filename)
        dst_file = os.path.join(ROOT_DIR, 'frontend', filename)
        if os.path.exists(src_file):
            shutil.copy(src_file, dst_file)
            print(f"    [OK] {filename} -> frontend/{filename} synced.")

    print("\n[SUCCESS] All portfolio files synchronized automatically! No repeated manual work needed.")

if __name__ == '__main__':
    sync()
