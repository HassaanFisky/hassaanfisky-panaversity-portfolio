import os
import shutil
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from base_watcher import BaseWatcher

class VaultInboxHandler(FileSystemEventHandler):
    def __init__(self, vault_path, logger):
        self.vault_path = vault_path
        self.logger = logger
        self.needs_action_path = os.path.join(vault_path, "Needs_Action")

    def on_created(self, event):
        if event.is_directory:
            return
        
        file_name = os.path.basename(event.src_path)
        self.logger.info(f"New file detected in Inbox: {file_name}")
        
        # Move to Needs_Action and create metadata
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        meta_name = f"ACTION_{timestamp}_{file_name}.md"
        meta_path = os.path.join(self.needs_action_path, meta_name)
        
        try:
            with open(meta_path, 'w') as f:
                f.write(f"---\n")
                f.write(f"source: Inbox\n")
                f.write(f"original_file: {file_name}\n")
                f.write(f"detected_at: {datetime.now().isoformat()}\n")
                f.write(f"status: pending\n")
                f.write(f"---\n\n")
                f.write(f"# Process: {file_name}\n")
                f.write(f"Please review the attached file and take appropriate action.\n")
            
            self.logger.info(f"Created metadata for {file_name} in Needs_Action")
        except Exception as e:
            self.logger.error(f"Failed to process file {file_name}: {e}")

class FilesystemWatcher(BaseWatcher):
    def __init__(self, vault_path: str):
        super().__init__("FilesystemWatcher", poll_interval=10)
        self.vault_path = vault_path
        self.inbox_path = os.path.join(vault_path, "Inbox")
        self.observer = Observer()

    def check(self):
        # The watchdog library handles events asynchronously, 
        # so check just keeps the loop alive or performs health checks.
        pass

    def run(self):
        self.running = True
        self.logger.info(f"Starting {self.name} on {self.inbox_path}...")
        
        handler = VaultInboxHandler(self.vault_path, self.logger)
        self.observer.schedule(handler, self.inbox_path, recursive=False)
        self.observer.start()
        
        try:
            while self.running:
                time.sleep(1)
        except Exception as e:
            self.logger.error(f"FilesystemWatcher error: {e}")
        finally:
            self.observer.stop()
            self.observer.join()

if __name__ == "__main__":
    # For standalone testing
    vault_root = os.path.join(os.path.dirname(__file__), "..", "AI_Employee_Vault")
    watcher = FilesystemWatcher(os.path.abspath(vault_root))
    watcher.run()
