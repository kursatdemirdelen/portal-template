import React from "react";
import { Layout, Menu, Avatar, Dropdown, Space, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth";
import { appRoutes } from "@/shared/config/routes";
import { layoutStyles } from "@/shared/styles/componentStyles";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import { setSidebarCollapsed } from "@/shared/store/uiSlice";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const GROUP_ORDER: string[] = [
  "Dashboard",
  "Biletler",
  "Projeler",
  "Zimmetler",
  "Çalışma & Tatil",
  "Kullanıcılar",
  "Müşteri",
  "İşlemler",
  "Ayarlar",
  "Profil",
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  const visibleRoutes = appRoutes
    .filter((route) => route.layout === "app" && route.showInMenu !== false)
    .filter((route) => (route.roles ? (user ? route.roles.includes(user.role) : false) : true));

  const groupedItems: Record<string, { icon?: React.ReactNode; children: MenuProps["items"] }> = {};
  const rootItems: NonNullable<MenuProps["items"]> = [];
  const groupIcons: Record<string, React.ReactNode | undefined> = {};

  visibleRoutes.forEach((route) => {
    if (route.menuGroup && route.menuIcon && route.groupRoot) {
      const Icon = route.menuIcon;
      groupIcons[route.menuGroup] = Icon ? <Icon /> : undefined;
    }
  });

  visibleRoutes.forEach((route) => {
    const Icon = route.menuIcon;

    const item: MenuItem = {
      key: route.path,
      label: (
        <span style={{ fontSize: 13, fontWeight: route.groupRoot ? 600 : 500 }}>
          {route.label ?? route.path}
        </span>
      ),
      icon: Icon ? <Icon /> : undefined,
    };

    if (route.menuGroup) {
      if (!groupedItems[route.menuGroup]) {
        groupedItems[route.menuGroup] = {
          icon: groupIcons[route.menuGroup],
          children: [],
        };
      } else if (!groupedItems[route.menuGroup].icon) {
        groupedItems[route.menuGroup].icon = groupIcons[route.menuGroup];
      }

      const children = groupedItems[route.menuGroup].children || [];
      children.push(item);
      groupedItems[route.menuGroup].children = children;
    } else {
      rootItems.push(item);
    }
  });

  const flatGroupItems: MenuProps["items"] = [];
  const nestedGroupItems: MenuProps["items"] = [];

  const appendGroupItems = (group: string, groupData: { icon?: React.ReactNode; children: MenuProps["items"] }) => {
    const children = groupData.children ?? [];
    if (children.length <= 1) {
      flatGroupItems.push(...children);
    } else {
      nestedGroupItems.push({
        key: `group-${group}`,
        label: <span style={{ fontSize: 12, letterSpacing: 0.2 }}>{group}</span>,
        icon: groupData.icon,
        children,
      });
    }
  };

  GROUP_ORDER.forEach((group) => {
    const groupData = groupedItems[group];
    if (!groupData) return;
    appendGroupItems(group, groupData);
  });

  Object.entries(groupedItems).forEach(([group, groupData]) => {
    if (GROUP_ORDER.includes(group)) return;
    appendGroupItems(group, groupData);
  });

  const menuItems: MenuProps["items"] = [...rootItems, ...flatGroupItems, ...nestedGroupItems];

  const selectedGroupKey = visibleRoutes.find((route) => route.path === location.pathname)?.menuGroup;
  const defaultOpenKeys =
    selectedGroupKey && (groupedItems[selectedGroupKey]?.children?.length ?? 0) > 1
      ? [`group-${selectedGroupKey}`]
      : [];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (typeof key === "string" && !key.startsWith("group-")) {
      navigate(key);
    }
  };

  const userMenuItems: MenuProps["items"] = [
    { key: "profile", icon: <UserOutlined />, label: "Profil" },
    { key: "settings", icon: <SettingOutlined />, label: "Ayarlar" },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Çıkış Yap", danger: true },
  ];

  const handleUserMenuClick: MenuProps["onClick"] = (e) => {
    // TODO: Handle menu actions
    console.log("Menu item clicked:", e.key);
  };

  return (
    <Layout style={layoutStyles.appLayout.container}>
      <Sider
        breakpoint="lg"
        collapsedWidth={64}
        theme="dark"
        collapsed={sidebarCollapsed}
        onCollapse={(value) => dispatch(setSidebarCollapsed(value))}
        style={{ borderRight: "none" }}
      >
        <div style={layoutStyles.appLayout.sider.logo}>Portal</div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: "transparent",
            paddingInline: 8,
            paddingBottom: 12,
            borderInlineEnd: "none",
          }}
          inlineIndent={16}
        />
      </Sider>

      <Layout>
        <Header style={layoutStyles.appLayout.header}>
          {user && (
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }}>
              <Space size={12} style={{ cursor: "pointer", padding: "8px 12px", borderRadius: 8 }}>
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  style={{ background: "linear-gradient(135deg, #5b7aed 0%, #6c5ce7 100%)" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: 13, fontWeight: 600, color: "#2c3e50" }}>{user.name}</Text>
                  <Text
                    type="secondary"
                    style={{ fontSize: 11, textTransform: "capitalize", color: "#7f8c8d" }}
                  >
                    {user.role}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          )}
        </Header>

        <Content style={layoutStyles.appLayout.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
