import os.path
import base64
import time
from datetime import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from base_watcher import BaseWatcher

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.modify']

class GmailWatcher(BaseWatcher):
    def __init__(self, vault_path: str, poll_interval: int = 120):
        super().__init__("GmailWatcher", poll_interval=poll_interval)
        self.vault_path = vault_path
        self.creds = None
        self.needs_action_path = os.path.join(vault_path, "Needs_Action")

    def _authenticate(self):
        """Authenticates with the Gmail API."""
        if os.path.exists('token.json'):
            self.creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                self.creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(self.creds.to_json())

    def check(self):
        try:
            if not self.creds:
                self._authenticate()

            service = build('gmail', 'v1', credentials=self.creds)
            
            # Query for unread and important messages
            query = "is:unread label:important"
            results = service.users().messages().list(userId='me', q=query).execute()
            messages = results.get('messages', [])

            if not messages:
                self.logger.info("No unread important messages found.")
                return

            self.logger.info(f"Found {len(messages)} unread important messages.")

            for msg in messages:
                msg_id = msg['id']
                # Get the message details
                message = service.users().messages().get(userId='me', id=msg_id).execute()
                
                # Extract subject and sender from headers
                payload = message.get('payload', {})
                headers = payload.get('headers', [])
                subject = "New Email"
                sender = "Unknown"
                for header in headers:
                    if header.get('name') == 'Subject':
                        subject = header.get('value')
                    if header.get('name') == 'From':
                        sender = header.get('value')

                # Create metadata file in Needs_Action
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                file_name = f"EMAIL_{timestamp}_{msg_id}.md"
                file_path = os.path.join(self.needs_action_path, file_name)

                with open(file_path, 'w') as f:
                    f.write(f"---\n")
                    f.write(f"type: email\n")
                    f.write(f"message_id: {msg_id}\n")
                    f.write(f"from: {sender}\n")
                    f.write(f"subject: {subject}\n")
                    f.write(f"detected_at: {datetime.now().isoformat()}\n")
                    f.write(f"status: pending\n")
                    f.write(f"---\n\n")
                    f.write(f"# From: {sender}\n\n")
                    f.write(f"Subject: {subject}\n\n")
                    f.write(f"Please review this email and draft a reply.\n")

                # Mark as read (optional/configurable)
                # service.users().messages().batchModify(userId='me', body={'ids': [msg_id], 'removeLabelIds': ['UNREAD']}).execute()
                self.logger.info(f"Created action for message {msg_id}")

        except Exception as e:
            self.logger.error(f"Gmail Error: {e}", exc_info=True)

if __name__ == "__main__":
    import sys
    # For standalone testing
    vault_root = os.path.join(os.path.dirname(__file__), "..", "AI_Employee_Vault")
    watcher = GmailWatcher(os.path.abspath(vault_root))
    watcher.run()
