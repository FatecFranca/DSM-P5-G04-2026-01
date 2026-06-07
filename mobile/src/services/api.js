import axios from "axios";
import Constants from "expo-constants";

const {
  API_USERS_URL,
  API_ML_URL,
} = Constants.expoConfig.extra;

export const usersApi = axios.create({
  baseURL: API_USERS_URL || "http://SEU_IP:8001",
  timeout: 10000,
});

export const mlApi = axios.create({
  baseURL: API_ML_URL || "http://SEU_IP:8000",
  timeout: 10000,
});

export default usersApi;