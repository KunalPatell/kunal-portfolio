import os
import zipfile

def zip_folder(source_dir, output_zip):
    exclude_folders = {'node_modules', '.next', 'venv', '.venv', '__pycache__', '.git', '.idea', '.vscode', 'out'}
    
    print(f"Starting zip of {source_dir} to {output_zip}...")
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Prune directories in-place to avoid traversing excluded ones
            dirs[:] = [d for d in dirs if d not in exclude_folders]
            
            for file in files:
                file_path = os.path.join(root, file)
                # Double-check exclusions in path
                parts = set(os.path.normpath(file_path).split(os.sep))
                if not parts.intersection(exclude_folders):
                    arcname = os.path.relpath(file_path, source_dir)
                    zipf.write(file_path, arcname)
                    
    print(f"Zip created successfully at {output_zip} (size: {os.path.getsize(output_zip) / (1024 * 1024):.2f} MB)")

if __name__ == "__main__":
    src = r"c:\Users\Capermint\Project\My Startups"
    dest = r"c:\Users\Capermint\Project\My Startups.zip"
    zip_folder(src, dest)
