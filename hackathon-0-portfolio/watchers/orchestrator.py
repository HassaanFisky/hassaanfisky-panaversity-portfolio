import os
import threading
import schedule
import time
import logging
import signal
from datetime import datetime
from gmail_watcher import GmailWatcher
from filesystem_watcher import FilesystemWatcher
from social_poster import SocialPosterWatcher

# Configure root logger
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("orchestration.log"),
        logging.StreamHandler()
    ]
)

class Orchestrator:
    def __init__(self, vault_path: str):
        self.vault_path = os.path.abspath(vault_path)
        self.logger = logging.getLogger("Orchestrator")
        self.watchers = []
        self.running = False

    def generate_ceo_briefing(self):
        """Generates a weekly summary of activities."""
        self.logger.info("Generating weekly CEO Briefing...")
        done_path = os.path.join(self.vault_path, "Done")
        briefings_path = os.path.join(self.vault_path, "Briefings")
        
        # Collect recent Done items
        done_items = os.listdir(done_path)
        
        timestamp = datetime.now().strftime("%Y-%m-%d")
        briefing_content = f"# Weekly CEO Briefing - {timestamp}\n\n"
        briefing_content += "## Activities Completed This Week:\n"
        for item in done_items:
            briefing_content += f"- {item}\n"
        
        briefing_file = f"BRIEFING_{timestamp}.md"
        with open(os.path.join(briefings_path, briefing_file), 'w') as f:
            f.write(briefing_content)
            
        self.logger.info(f"CEO Briefing saved to {briefing_file}")

    def ralph_wiggum_loop(self):
        """Checks for Needs_Action and triggers appropriate automated responses."""
        self.logger.info("Ralph Wiggum loop running... 'I'm helping!'")
        needs_action_path = os.path.join(self.vault_path, "Needs_Action")
        
        items = [f for f in os.listdir(needs_action_path) if f.endswith(".md") and f != "README.md"]
        
        if items:
            self.logger.info(f"Found {len(items)} items in Needs_Action. Triggering agents...")
            # Here you would call other agent skills
            # For now, we simulate agent activity by marking the first item as 'processing' 
            # or moving it to Pending_Approval if it's automated.
            pass

    def start(self):
        self.running = True
        self.logger.info("Starting AI Employee Orchestrator...")
        
        # 1. Initialize Watchers
        gmail = GmailWatcher(self.vault_path)
        fs = FilesystemWatcher(self.vault_path)
        social = SocialPosterWatcher(self.vault_path)
        self.watchers = [gmail, fs, social]

        # 2. Run watchers in separate threads
        for watcher in self.watchers:
            thread = threading.Thread(target=watcher.run, daemon=True)
            thread.start()

        # 3. Schedule recurring tasks
        schedule.every().sunday.at("20:00").do(self.generate_ceo_briefing)
        schedule.every(5).minutes.do(self.ralph_wiggum_loop)

        # 4. Main loop
        try:
            while self.running:
                schedule.run_pending()
                # Update Dashboard activity stats
                self.update_dashboard_stats()
                time.sleep(30)
        except (KeyboardInterrupt, SystemExit):
            self.stop()

    def update_dashboard_stats(self):
        """Update the counts in Dashboard.md."""
        self.logger.info("Updating Dashboard stats...")
        dashboard_path = os.path.join(self.vault_path, "Dashboard.md")
        
        needs_action_count = len([f for f in os.listdir(os.path.join(self.vault_path, "Needs_Action")) if f.endswith(".md")])
        plans_count = len([f for f in os.listdir(os.path.join(self.vault_path, "Plans")) if f.endswith(".md")])
        done_count = len([f for f in os.listdir(os.path.join(self.vault_path, "Done")) if f.endswith(".md")])
        
        # Read and update content
        with open(dashboard_path, 'r') as f:
            content = f.read()
            
        # Simplified replacement - for production use a regex or frontmatter parser
        lines = content.split('\n')
        updated_lines = []
        for line in lines:
            if "## Pending Actions:" in line:
                updated_lines.append(f"## Pending Actions: {needs_action_count}")
            elif "## Active Plans:" in line:
                updated_lines.append(f"## Active Plans: {plans_count}")
            elif "last_updated:" in line:
                updated_lines.append(f"last_updated: {datetime.now().strftime('%Y-%m-%d')}")
            else:
                updated_lines.append(line)
                
        with open(dashboard_path, 'w') as f:
            f.write('\n'.join(updated_lines))

    def stop(self):
        self.logger.info("Shutting down Orchestrator...")
        for watcher in self.watchers:
            watcher.stop()
        self.running = False

if __name__ == "__main__":
    vault_root = os.path.join(os.path.dirname(__file__), "..", "AI_Employee_Vault")
    orchestrator = Orchestrator(vault_root)
    orchestrator.start()
