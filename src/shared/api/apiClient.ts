import axios from "axios";
import { tokenService } from "./tokenService";
import { config } from "@/shared/config/environment";

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor - Bearer token otomatik ekle
 */
apiClient.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response Interceptor - Error handling + global events
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      error.message ??
      "Beklenmeyen bir hata oluştu";

    // 401: Token geçersiz, logout
    if (status === 401) {
      tokenService.removeToken();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    // 403: Yetkisiz erişim
    else if (status === 403) {
      window.dispatchEvent(new Event("api:forbidden"));
    }
    // 500: Server hatası
    else if (status && status >= 500) {
      window.dispatchEvent(new Event("api:serverError"));
    }

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
