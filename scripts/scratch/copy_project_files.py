import os
import shutil

def ignore_patterns(path, names):
    exclude = {'node_modules', '.next', 'venv', '.venv', '__pycache__', '.git', '.idea', '.vscode', 'out'}
    # Return any names that match our excluded directories
    return [name for name in names if name in exclude]

def copy_project(src, dest):
    if not os.path.exists(src):
        print(f"Skipping copy: Source does not exist ({src})")
        return
        
    if os.path.exists(dest):
        print(f"Removing existing target folder: {dest}...")
        shutil.rmtree(dest, ignore_errors=True)
        
    print(f"Copying {src} to {dest}...")
    shutil.copytree(src, dest, ignore=ignore_patterns)
    print(f"Successfully copied: {os.path.basename(dest)}")

if __name__ == "__main__":
    projects = {
        "comonk": r"c:\Users\Capermint\Project\comonk",
        "avp-emart": r"c:\Users\Capermint\Project\My Startups\apps\avp-emart",
        "avpu": r"c:\Users\Capermint\Project\My Startups\apps\avpu",
        "breakdown-factor": r"c:\Users\Capermint\Project\My Startups\apps\breakdown-factor",
        "sevenseed": r"c:\Users\Capermint\Project\sevenseed",
        "sevenseed-portal": r"c:\Users\Capermint\Project\My Startups\apps\sevenseed",
        "avp-charitable-trust": r"c:\Users\Capermint\Project\My Startups\apps\avp-charitable-trust",
        "decode-forest-pharmacy": r"c:\Users\Capermint\Project\My Startups\apps\decode-forest-pharmacy",
        "Portfolio": r"c:\Users\Capermint\Project\Portfolio"
    }
    
    target_dir = r"c:\Users\Capermint\Project_Files"
    
    for name, path in projects.items():
        dest_path = os.path.join(target_dir, name)
        copy_project(path, dest_path)
