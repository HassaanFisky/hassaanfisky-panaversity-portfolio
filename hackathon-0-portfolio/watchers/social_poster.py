import os
import time
import json
from datetime import datetime
from groq import Groq
from dotenv import load_dotenv
from base_watcher import BaseWatcher

# Load environment variables
load_dotenv()

class SocialPosterWatcher(BaseWatcher):
    def __init__(self, vault_path: str, poll_interval: int = 120):
        super().__init__("SocialPosterWatcher", poll_interval=poll_interval)
        self.vault_path = vault_path
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.plans_path = os.path.join(vault_path, "Plans")
        self.pending_approval_path = os.path.join(vault_path, "Pending_Approval")

    def check(self):
        # Look for files in Plans/ folder
        files = os.listdir(self.plans_path)
        plan_files = [f for f in files if f.endswith(".md") and f != "README.md"]

        if not plan_files:
            self.logger.info("No social post plans found in Plans/")
            return

        self.logger.info(f"Processing {len(plan_files)} social post plans...")

        for plan_file in plan_files:
            plan_path = os.path.join(self.plans_path, plan_file)
            
            with open(plan_path, 'r') as f:
                plan_content = f.read()

            try:
                # Draft content with Groq
                prompt = f"""Draft 4 unique social media post variations (LinkedIn, Twitter, Facebook, Instagram) based on the following business goals and instructions:
                
                {plan_content}

                Tone: Professional, expert, helpful.
                Include relevant hashtags but do not overdo it.
                Return ONLY the four drafts in markdown format with clear headers.
                """

                completion = self.client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=1024,
                )

                draft_text = completion.choices[0].message.content

                # Create draft in Pending_Approval
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                draft_name = f"DRAFT_{timestamp}_{plan_file}"
                draft_path = os.path.join(self.pending_approval_path, draft_name)
                
                with open(draft_path, 'w') as f:
                    f.write(f"---\n")
                    f.write(f"type: social_draft\n")
                    f.write(f"plan_source: {plan_file}\n")
                    f.write(f"created_at: {datetime.now().isoformat()}\n")
                    f.write(f"status: pending_approval\n")
                    f.write(f"---\n\n")
                    f.write(draft_text)

                # Move plan to Done/ (or keep it as it's just a trigger?)
                # For this watcher, we move the plan to Done/ to avoid duplication
                done_path = os.path.join(self.vault_path, "Done", plan_file)
                shutil.move(plan_path, done_path)
                
                self.logger.info(f"Drafted social posts for {plan_file} and moved plan to Done/")

            except Exception as e:
                self.logger.error(f"Error drafting with Groq for {plan_file}: {e}")

if __name__ == "__main__":
    import shutil
    # For standalone testing
    vault_root = os.path.join(os.path.dirname(__file__), "..", "AI_Employee_Vault")
    watcher = SocialPosterWatcher(os.path.abspath(vault_root))
    watcher.run()
