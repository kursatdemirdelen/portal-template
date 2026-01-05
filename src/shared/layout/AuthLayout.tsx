import React from "react";

/**
 * AuthLayout - Login ve diğer auth sayfaları için minimal layout
 * Sayfa kendi tasarımını yönetir, layout sadece wrapper görevi görür
 */
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
