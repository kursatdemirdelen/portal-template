import React, { type ReactNode } from "react";
import { Typography, Breadcrumb, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useBreadcrumbs,
  type BreadcrumbItem,
} from "@/shared/hooks/useBreadcrumbs";
import { layoutStyles } from "@/shared/styles/helpers";
import { colors } from "@/shared/styles";

const { Title, Text } = Typography;

interface PageContainerProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  padding?: "small" | "medium" | "large";
  useRouteBreadcrumbs?: boolean;
}

const paddingConfig = {
  small: { top: 20, bottom: 20, horizontal: 16 },
  medium: { top: 24, bottom: 24, horizontal: 20 },
  large: { top: 32, bottom: 32, horizontal: 28 },
};

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  icon,
  children,
  extra,
  breadcrumbs,
  showBackButton = false,
  padding = "medium",
  useRouteBreadcrumbs = true,
}) => {
  const navigate = useNavigate();
  const paddingStyle = paddingConfig[padding];
  const routeBreadcrumbs = useBreadcrumbs();
  const headerPadding = {
    top: Math.max(paddingStyle.top - 8, 12),
    bottom: Math.max(paddingStyle.bottom - 8, 12),
    horizontal: paddingStyle.horizontal,
  };

  const resolvedBreadcrumbs =
    breadcrumbs ?? (useRouteBreadcrumbs ? routeBreadcrumbs : []);

  const breadcrumbItems = resolvedBreadcrumbs
    ? resolvedBreadcrumbs.map((item, idx) => ({
        key: idx,
        title: (
          <span
            onClick={item.onClick || (() => item.href && navigate(item.href))}
            style={{
              cursor: item.onClick || item.href ? "pointer" : "default",
              color: item.href || item.onClick ? colors.primary : "inherit",
            }}
          >
            {item.title}
          </span>
        ),
      }))
    : [];

  return (
    <div style={layoutStyles.pageContainer.root}>
      {/* Header Section */}
      <div
        style={{
          ...layoutStyles.pageContainer.headerContainer,
          background: layoutStyles.pageContainer.headerBackground,
          border: layoutStyles.pageContainer.headerBorder,
          paddingTop: headerPadding.top,
          paddingBottom: headerPadding.bottom,
          paddingLeft: headerPadding.horizontal,
          paddingRight: headerPadding.horizontal,
        }}
      >
        {/* Breadcrumbs */}
        {breadcrumbItems.length > 0 && (
          <Breadcrumb
            items={[
              {
                key: "home",
                title: (
                  <span
                    onClick={() => navigate("/")}
                    style={{
                      cursor: "pointer",
                      color: colors.primary,
                    }}
                  >
                    Home
                  </span>
                ),
              },
              ...breadcrumbItems,
            ]}
            style={layoutStyles.pageContainer.breadcrumb}
          />
        )}

        {/* Title Section */}
        <Row gutter={[12, 12]} align="middle" justify="space-between">
          <Col xs={24} sm={extra ? 16 : 24} md={extra ? 18 : 24}>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: subtitle ? 4 : 0,
                  flexWrap: "wrap" as const,
                }}
              >
                {showBackButton && (
                  <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    style={{
                      color: colors.textSecondary,
                      padding: "4px 8px",
                      height: "auto",
                    }}
                  />
                )}

                {icon && (
                  <div style={layoutStyles.pageContainer.icon}>{icon}</div>
                )}

                <Title level={3} style={layoutStyles.pageContainer.title}>
                  {title}
                </Title>
              </div>

              {subtitle && (
                <Text
                  type="secondary"
                  style={{
                    ...layoutStyles.pageContainer.subtitle,
                    display: "block",
                  }}
                >
                  {subtitle}
                </Text>
              )}
            </div>
          </Col>

          {extra && (
            <Col xs={24} sm={8} md={6} style={{ textAlign: "right" }}>
              <div style={layoutStyles.pageContainer.actions}>{extra}</div>
            </Col>
          )}
        </Row>
      </div>

      {/* Content Section */}
      <div
        style={{
          padding: `${paddingStyle.top}px ${paddingStyle.horizontal}px ${paddingStyle.bottom}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
