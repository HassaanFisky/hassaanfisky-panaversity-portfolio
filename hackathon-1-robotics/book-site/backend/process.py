# backend/process.py
# Ingests Docusaurus Markdown -> Vector Ready Chunks

import os
import glob
import re

DOCS_DIR = "../docs"

def main():
    print(f"📚 Scanning {DOCS_DIR} for textbook modules...")
    
    files = glob.glob(f"{DOCS_DIR}/**/*.md", recursive=True)
    print(f"Found {len(files)} chapters.")
    
    for fpath in files:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
            # Basic cleanup: remove frontmatter
            clean_content = re.sub(r"^---[\s\S]*?---", "", content).strip()
            print(f"Processing: {os.path.basename(fpath)} ({len(clean_content)} chars)")
            
    print("✅ Indexing complete (Mock). Ready for Vector Store.")

if __name__ == "__main__":
    main()
