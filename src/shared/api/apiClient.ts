import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Beklenmeyen bir hata oluştu";
    return Promise.reject(new Error(message));
  }
);

export const apiGet = async <TResponse>(
  url: string,
  config?: Parameters<typeof apiClient.get>[1]
): Promise<TResponse> => {
  const response = await apiClient.get<TResponse>(url, config);
  return response.data;
};

export const apiPost = async <TResponse, TPayload = unknown>(
  url: string,
  data?: TPayload,
  config?: Parameters<typeof apiClient.post>[2]
): Promise<TResponse> => {
  const response = await apiClient.post<TResponse>(url, data, config);
  return response.data;
};
