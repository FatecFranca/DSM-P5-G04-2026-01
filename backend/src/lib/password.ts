import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 6;

export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string") return null;
  const trimmed = password.trim();
  if (trimmed.length < MIN_PASSWORD_LENGTH) return null;
  return trimmed;
}

export function passwordValidationMessage(): string {
  return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}
