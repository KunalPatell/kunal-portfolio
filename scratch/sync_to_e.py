import os
import shutil

def ignore_patterns(path, names):
    exclude = {'node_modules', '.next', 'venv', '.venv', '__pycache__', '.git', '.idea', '.vscode', 'out'}
    return [name for name in names if name in exclude]

def sync_folder(src, dest, clean=True):
    if not os.path.exists(src):
        print(f"Source path {src} does not exist. Skipping.")
        return
        
    if os.path.exists(dest):
        print(f"Cleaning target path {dest}...")
        try:
            shutil.rmtree(dest)
        except Exception as e:
            print(f"Warning: Failed to delete {dest} ({e}). Syncing directly with dirs_exist_ok.")
        
    print(f"Copying {src} to {dest}...")
    if clean:
        shutil.copytree(src, dest, ignore=ignore_patterns, dirs_exist_ok=True)
    else:
        shutil.copytree(src, dest, dirs_exist_ok=True)
    print(f"Sync complete for: {os.path.basename(dest)}")

if __name__ == "__main__":
    # 1. Sync Project_Backup (Zips)
    backup_src_dir = r"C:\Users\Capermint\Project_Backup"
    backup_dest_dir = r"E:\Project_Backup"
    if os.path.exists(backup_src_dir):
        os.makedirs(backup_dest_dir, exist_ok=True)
        for item in os.listdir(backup_src_dir):
            s = os.path.join(backup_src_dir, item)
            d = os.path.join(backup_dest_dir, item)
            if os.path.isfile(s) and s.endswith('.zip'):
                print(f"Copying zip {item}...")
                shutil.copy2(s, d)
                
    # 2. Sync Project_Files (Clean folders)
    files_src_dir = r"C:\Users\Capermint\Project_Files"
    files_dest_dir = r"E:\Project_Files"
    if os.path.exists(files_src_dir):
        for item in os.listdir(files_src_dir):
            s = os.path.join(files_src_dir, item)
            d = os.path.join(files_dest_dir, item)
            if os.path.isdir(s):
                sync_folder(s, d, clean=False) # already clean in Project_Files

    # 3. Sync active coding folders in Project (comonk, My Startups, Portfolio, sevenseed)
    active_projects = {
        "comonk": r"C:\Users\Capermint\Project\comonk",
        "My Startups": r"C:\Users\Capermint\Project\My Startups",
        "Portfolio": r"C:\Users\Capermint\Project\Portfolio",
        "sevenseed": r"C:\Users\Capermint\Project\sevenseed"
    }
    
    project_dest_dir = r"E:\Project"
    for name, path in active_projects.items():
        dest_path = os.path.join(project_dest_dir, name)
        sync_folder(path, dest_path, clean=True)
