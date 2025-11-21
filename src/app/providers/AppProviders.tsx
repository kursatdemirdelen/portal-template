import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "../store";
import { themeConfig } from "@/shared/config/theme";
import { AuthProvider } from "@/features/auth";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider theme={themeConfig}>
        <AuthProvider>{children}</AuthProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
};
