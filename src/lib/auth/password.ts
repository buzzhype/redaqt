import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Generate a salt for password hashing
 */
export function generateSalt(): string {
  return randomBytes(16).toString("hex");
}

/**
 * Hash a password with a salt
 */
export function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

/**
 * Verify a password against a hash and salt
 */
export function verifyPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const inputHash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hash, "hex");
  
  return storedHash.length === inputHash.length && 
    timingSafeEqual(inputHash, storedHash);
}

/**
 * Check if a password meets security requirements
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, one number, one special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
  return passwordRegex.test(password);
}
