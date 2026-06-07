import { usersApi } from "./api";

export async function loginUser(data) {
  const response = await usersApi.post("/auth/login", data);
  return response.data;
}

export async function createUser(data) {
  const response = await usersApi.post("/users", data);
  return response.data;
}

export async function getUsersHealth() {
  const response = await usersApi.get("/health");
  return response.data;
}
