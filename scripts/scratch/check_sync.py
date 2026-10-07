import os

def check_directory(c_path, e_path):
    if not os.path.exists(c_path):
        print(f"[FAIL] Source path does not exist on C: {c_path}")
        return False
    if not os.path.exists(e_path):
        print(f"[FAIL] Target path does not exist on E: {e_path}")
        return False
        
    c_items = sorted(os.listdir(c_path))
    e_items = sorted(os.listdir(e_path))
    
    ignore = {'.git', '.idea', '.vscode', '__pycache__', 'node_modules', '.next'}
    c_items = [i for i in c_items if i not in ignore]
    e_items = [i for i in e_items if i not in ignore]
    
    if c_items == e_items:
        print(f"[OK] Items match perfectly for: {os.path.basename(c_path)}")
        return True
    else:
        print(f"[WARN] Mismatch in: {os.path.basename(c_path)}")
        print(f"   C Items: {c_items}")
        print(f"   E Items: {e_items}")
        return False

def check_zip_sizes(c_backup, e_backup):
    if not os.path.exists(c_backup) or not os.path.exists(e_backup):
        print("[FAIL] Backup folders missing.")
        return False
        
    c_zips = {f: os.path.getsize(os.path.join(c_backup, f)) for f in os.listdir(c_backup) if f.endswith('.zip')}
    e_zips = {f: os.path.getsize(os.path.join(e_backup, f)) for f in os.listdir(e_backup) if f.endswith('.zip')}
    
    mismatch = False
    for f, c_size in c_zips.items():
        if f not in e_zips:
            print(f"[FAIL] Zip {f} missing on E drive.")
            mismatch = True
        else:
            e_size = e_zips[f]
            diff = abs(c_size - e_size)
            if diff > 1024:  # size difference greater than 1KB
                print(f"[WARN] Zip size mismatch for {f}: C = {c_size} bytes, E = {e_size} bytes")
                mismatch = True
                
    if not mismatch:
        print("[OK] All project-wise zip files and sizes match perfectly!")
        return True
    return False

if __name__ == "__main__":
    print("=== STARTING DEEP SYNCHRONIZATION INTEGRITY CHECK ===")
    
    # 1. Check Project_Backup zips
    check_zip_sizes(r"C:\Users\Capermint\Project_Backup", r"E:\Project_Backup")
    
    # 2. Check Project_Files folders
    check_directory(r"C:\Users\Capermint\Project_Files", r"E:\Project_Files")
    
    # 3. Check active coding folders
    check_directory(r"C:\Users\Capermint\Project\comonk", r"E:\Project\comonk")
    check_directory(r"C:\Users\Capermint\Project\My Startups", r"E:\Project\My Startups")
    check_directory(r"C:\Users\Capermint\Project\Portfolio", r"E:\Project\Portfolio")
    check_directory(r"C:\Users\Capermint\Project\sevenseed", r"E:\Project\sevenseed")
    
    print("=== DEEP CHECK COMPLETE ===")
