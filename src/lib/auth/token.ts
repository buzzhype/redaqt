import { randomBytes, createHash } from "crypto";

/**
 * Generate a secure random token
 * @returns The generated token
 */
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hash a token for secure storage
 * @param token The token to hash
 * @returns The hashed token
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Verify if a provided token matches a stored hash
 * @param token The token to verify
 * @param hash The hash to compare against
 * @returns Whether the token is valid
 */
export function verifyToken(token: string, hash: string): boolean {
  const tokenHash = hashToken(token);
  return tokenHash === hash;
}
