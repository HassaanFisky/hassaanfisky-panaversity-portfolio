import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Panaversity Ecosystem Auth — Shared Router
 * This route is replicated in each module (H0-H4) to provide local auth handling
 * over a common PostgreSQL database.
 */
export const { GET, POST } = toNextJsHandler(auth);
