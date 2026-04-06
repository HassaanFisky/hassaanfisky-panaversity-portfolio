/**
 * AuthProvider.js
 * Dual-Mode Authentication System:
 * 1. DemoAuth: Uses localStorage (Hackathon safe, no config needed)
 * 2. ProductionAuth: Uses backend provider (Activated via env vars)
 */

class AuthProvider {
  constructor() {
    this.mode = this.detectMode();
    this.sessionKey = "auth_session";
    this.usersKey = "auth_users";
    this.freeKey = "free_answer_used";
  }

  detectMode() {
    // In a real build, we'd check process.env.NEXT_PUBLIC_AUTH_URL etc.
    // For now, we default to DemoAuth to ensure zero-key reliability.
    return "DEMO";
  }

  // --- Public API ---

  getSession() {
    if (typeof window === "undefined") return null;
    try {
      const session = localStorage.getItem(this.sessionKey);
      if (!session) return null;
      const parsed = JSON.parse(session);
      // Check expiration (7 days)
      if (Date.now() > parsed.expiresAt) {
        this.signOut();
        return null;
      }
      return parsed.user;
    } catch (e) {
      return null;
    }
  }

  async signIn(email, password) {
    if (this.mode === "DEMO") {
      return this.demoSignIn(email, password);
    }
    // Stub for prod
    return { error: "Production auth not configured" };
  }

  async signUp(email, password) {
    if (this.mode === "DEMO") {
      return this.demoSignUp(email, password);
    }
    return { error: "Production auth not configured" };
  }

  signOut() {
    localStorage.removeItem(this.sessionKey);
    // Note: We do NOT clear the 'free_answer_used' key to prevent cheating
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }

  isQuestionAllowed() {
    // Check if user is logged in
    const user = this.getSession();
    if (user) return true;

    // Check free answer usage
    const used = localStorage.getItem(this.freeKey);
    return used !== "1";
  }

  markFreeQuestionUsed() {
    localStorage.setItem(this.freeKey, "1");
  }

  // --- Demo Implementation (LocalStorage) ---

  async demoSignUp(email, password) {
    const users = this.getUsers();
    if (users[email]) {
      return { error: "User already exists" };
    }

    // "Security" theatre - simple hashing
    const hash = await this.hashPassword(password);

    users[email] = {
      email,
      passwordHash: hash,
      createdAt: Date.now(),
    };

    this.saveUsers(users);
    this.createSession({ email });
    return { success: true };
  }

  async demoSignIn(email, password) {
    const users = this.getUsers();
    const user = users[email];

    if (!user) return { error: "Invalid email or password" };

    const hash = await this.hashPassword(password);
    if (hash !== user.passwordHash) {
      return { error: "Invalid email or password" };
    }

    this.createSession({ email });
    return { success: true };
  }

  // --- Helpers ---

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.usersKey) || "{}");
    } catch {
      return {};
    }
  }

  saveUsers(users) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  createSession(user) {
    const session = {
      user,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  async hashPassword(password) {
    // Basic Web Crypto hash for "professional" feel
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
}

export const auth = new AuthProvider();
