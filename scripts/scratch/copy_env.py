import os

src_path = r"c:\Users\Capermint\Project\Portfolio\backend\.env"
targets = [
    r"c:\Users\Capermint\Project\My Startups\apps\avp-charitable-trust\backend\.env",
    r"c:\Users\Capermint\Project\My Startups\apps\avp-emart\backend\.env",
    r"c:\Users\Capermint\Project\My Startups\apps\avpu\backend\.env",
    r"c:\Users\Capermint\Project\My Startups\apps\breakdown-factor\backend\.env",
    r"c:\Users\Capermint\Project\My Startups\apps\decode-forest-pharmacy\backend\.env",
    r"c:\Users\Capermint\Project\My Startups\apps\sevenseed\backend\.env",
    r"c:\Users\Capermint\Project\comonk\.env"
]

if not os.path.exists(src_path):
    print(f"Source .env not found at {src_path}")
    exit(1)

with open(src_path, "r", encoding="utf-8") as f:
    src_content = f.read()

for target in targets:
    target_dir = os.path.dirname(target)
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)
    
    # Merge values: read target if exists
    existing = {}
    if os.path.exists(target):
        with open(target, "r", encoding="utf-8") as tf:
            for line in tf:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    existing[k.strip()] = v.strip()
    
    # Read src keys
    src_keys = {}
    for line in src_content.splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            src_keys[k.strip()] = v.strip()
            
    # Merge existing and src, giving preference to non-empty source keys
    merged = existing.copy()
    for k, v in src_keys.items():
        if v or k not in merged:
            merged[k] = v
            
    # Write back merged values
    with open(target, "w", encoding="utf-8") as wf:
        wf.write("# Merged from Portfolio backend .env\n")
        for k, v in merged.items():
            wf.write(f"{k}={v}\n")
    print(f"Successfully updated .env at {target}")
