import React from "react";
import { Layout } from "antd";
import { useAppSelector } from "@/shared/hooks/useAppStore";
import { Sidebar } from "./Sidebar";
import { contentStyles } from "./sidebarStyles";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout
        style={{
          ...contentStyles.layout,
          ...(collapsed ? contentStyles.layoutCollapsed : {}),
        }}
      >
        <Content style={contentStyles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
