import os
import zipfile

def zip_folder(source_dir, output_zip):
    exclude_folders = {'node_modules', '.next', 'venv', '.venv', '__pycache__', '.git', '.idea', '.vscode', 'out'}
    
    print(f"Zipping {source_dir} to {output_zip}...")
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            dirs[:] = [d for d in dirs if d not in exclude_folders]
            
            for file in files:
                file_path = os.path.join(root, file)
                parts = set(os.path.normpath(file_path).split(os.sep))
                if not parts.intersection(exclude_folders):
                    arcname = os.path.relpath(file_path, source_dir)
                    zipf.write(file_path, arcname)
                    
    print(f"Created: {os.path.basename(output_zip)} ({os.path.getsize(output_zip) / (1024 * 1024):.2f} MB)")

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
    
    output_dir = r"c:\Users\Capermint\Project_Backup"
    
    for name, path in projects.items():
        if os.path.exists(path):
            output_zip = os.path.join(output_dir, f"{name}.zip")
            zip_folder(path, output_zip)
        else:
            print(f"Skipping {name} (path does not exist: {path})")
