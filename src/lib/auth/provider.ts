/**
 * Authentication provider types and utilities
 */

export type AuthProvider = "email" | "google" | "github" | "azureAD";

/**
 * Authentication session
 */
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  expires: Date;
}

/**
 * Auth user with additional metadata
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Check if a session is valid (not expired)
 */
export function isValidSession(session?: AuthSession | null): boolean {
  if (!session) return false;
  
  const now = new Date();
  return session.expires > now;
}
