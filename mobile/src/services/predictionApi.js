import axios from "axios";
import {
  API_ML_URL,
} from "@env";

const api = axios.create({
  baseURL: API_ML_URL,
});

export async function predict(
  payload
) {
  const response =
    await api.post(
      "/predict",
      payload
    );

  return response.data;
}

export async function getMlHealth() {
  const response =
    await api.get(
      "/health"
    );

  return response.data;
}