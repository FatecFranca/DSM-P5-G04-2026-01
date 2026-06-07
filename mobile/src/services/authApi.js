import axios from "axios";
import {
  API_USERS_URL,
} from "@env";

const api = axios.create({
  baseURL: API_USERS_URL,
});

export async function loginUser(
  data
) {
  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;
}

export async function createUser(
  data
) {
  const response =
    await api.post(
      "/users",
      data
    );

  return response.data;
}

export async function getUsersHealth() {
  const response =
    await api.get(
      "/health"
    );

  return response.data;
}