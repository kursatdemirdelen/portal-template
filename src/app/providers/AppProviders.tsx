import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "../store";
import { themeConfig } from "@/shared/config/theme";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ReduxProvider>
  );
};
