import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { Menu as MenuIcon } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/useAppStore";
import { setSidebarMobileOpen } from "@/shared/store/uiSlice";
import { Sidebar } from "./Sidebar";
import { contentStyles, MOBILE_BREAKPOINT } from "./sidebarStyles";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openMobileSidebar = () => dispatch(setSidebarMobileOpen(true));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout
        style={{
          ...contentStyles.layout,
          ...(isMobile
            ? contentStyles.layoutMobile
            : collapsed
            ? contentStyles.layoutCollapsed
            : {}),
        }}
      >
        {/* Mobile header with hamburger */}
        {isMobile && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              background: "#fff",
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Button
              type="text"
              icon={<MenuIcon size={20} />}
              onClick={openMobileSidebar}
              style={{ padding: 4 }}
            />
            <span style={{ fontWeight: 600, fontSize: 16 }}>Portal</span>
          </div>
        )}
        <Content style={contentStyles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
