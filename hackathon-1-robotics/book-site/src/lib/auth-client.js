import { createAuthClient } from "better-auth/react";

/**
 * Panaversity H1 — Physical AI & Robotics
 * Centralized Auth Client pointing to the H2 Backend.
 */
export const authClient = createAuthClient({
  baseURL: "https://hackathon-2-todo-iota.vercel.app",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
