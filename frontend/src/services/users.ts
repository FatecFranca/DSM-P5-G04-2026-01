import type {
  CreateUserPayload,
  LoginPayload,
  UpdateUserPayload,
  User,
} from "../types/user";

const USERS_API_URL = import.meta.env.VITE_USERS_API_URL ?? "http://localhost:8001";

async function parseError(response: Response): Promise<string> {
  const body = await response.json().catch(() => ({}));
  if (typeof body.detail === "string") {
    return body.detail;
  }
  return "Não foi possível concluir a operação.";
}

export async function loginUser(payload: LoginPayload): Promise<User> {
  const response = await fetch(`${USERS_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await fetch(`${USERS_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function listUsers(): Promise<User[]> {
  const response = await fetch(`${USERS_API_URL}/users`);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${USERS_API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json();
}

export async function updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
  const response = await fetch(`${USERS_API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${USERS_API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(await parseError(response));
  }
}

export function getUsersApiUrl(): string {
  return USERS_API_URL;
}
