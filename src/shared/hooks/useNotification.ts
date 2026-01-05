import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

export type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationOptions {
  placement?: NotificationPlacement;
  duration?: number;
}

/**
 * Toast/Notification hook'u
 * Ant Design notification API'sini sarmalayan hook
 *
 * @example
 * const { success, error, warning, info } = useNotification();
 * success("Başarılı!", "İşlem tamamlandı");
 * error("Hata!", "Bir şeyler yanlış gitti");
 */
export const useNotification = () => {
  const show = (
    type: NotificationType,
    title: string,
    description?: string,
    options?: NotificationOptions
  ) => {
    const {
      placement = "topRight",
      duration = 4.5,
    } = options || {};

    notification[type]({
      message: title,
      description: description || "",
      placement,
      duration,
    });
  };

  return {
    success: (title: string, description?: string, options?: NotificationOptions) =>
      show("success", title, description, options),
    error: (title: string, description?: string, options?: NotificationOptions) =>
      show("error", title, description, options),
    warning: (title: string, description?: string, options?: NotificationOptions) =>
      show("warning", title, description, options),
    info: (title: string, description?: string, options?: NotificationOptions) =>
      show("info", title, description, options),
  };
};
