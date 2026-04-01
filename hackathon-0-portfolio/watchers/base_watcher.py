import logging
import time
from abc import ABC, abstractmethod
from typing import Optional

# Production logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("watcher_system.log"),
        logging.StreamHandler()
    ]
)

class BaseWatcher(ABC):
    def __init__(self, name: str, poll_interval: int = 60):
        self.name = name
        self.poll_interval = poll_interval
        self.logger = logging.getLogger(name)
        self.running = False

    @abstractmethod
    def check(self):
        """Perform a single check for new data/events."""
        pass

    def run(self):
        """Main run loop with error recovery and exponential backoff."""
        self.running = True
        self.logger.info(f"Starting {self.name} watcher...")
        
        backoff = 1
        max_backoff = 300 # 5 minutes

        while self.running:
            try:
                self.check()
                # Reset backoff on success
                backoff = 1
                time.sleep(self.poll_interval)
            except Exception as e:
                self.logger.error(f"Error in {self.name}: {e}", exc_info=True)
                self.logger.info(f"Retrying in {backoff} seconds...")
                time.sleep(backoff)
                # Exponential backoff
                backoff = min(backoff * 2, max_backoff)

    def stop(self):
        self.logger.info(f"Stopping {self.name} watcher...")
        self.running = False
