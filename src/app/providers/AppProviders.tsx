import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "../store";
import { antdTheme } from "@/shared/styles";
import { AuthProvider } from "@/features/auth";
import { ThemeModeEffect } from "@/shared/styles/ThemeModeEffect";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider theme={antdTheme}>
        <AuthProvider>
          <ThemeModeEffect />
          {children}
        </AuthProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
};
