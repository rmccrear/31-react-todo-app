import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 2000,
  timeoutErrorMessage: "timeout", // use this for timeone message to distinguish between it and canceled requests.
});

export function axiosWithBearer(token) { 
  const apiInstance = axios.create({
    baseURL: API_URL,
    timeout: 2000,
    timeoutErrorMessage: "timeout", // use this for timeone message to distinguish between it and canceled requests.
  });
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiInstance;
}