import { mlApi } from "./api";

export async function predict(payload) {
  const response = await mlApi.post("/predict", payload);
  return response.data;
}

export async function getMlHealth() {
  const response = await mlApi.get("/health");
  return response.data;
}