export const playThinkingCue = () => {
  // Check if sound is disabled user preference
  const isSoundEnabled = localStorage.getItem("sound_enabled") !== "0";
  if (!isSoundEnabled) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  // Sound Profile: Soft "Blip-Whoosh"
  // Frequency: Slide up slightly for a "processing" feel
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

  // Envelope: Fast attack, quick decay
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.start(now);
  osc.stop(now + 0.5);
};
