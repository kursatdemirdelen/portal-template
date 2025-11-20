import React, { type ReactNode } from "react";
import { Typography, Breadcrumb, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useBreadcrumbs, type BreadcrumbItem } from "@/shared/hooks/useBreadcrumbs";

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

  const resolvedBreadcrumbs = breadcrumbs ?? (useRouteBreadcrumbs ? routeBreadcrumbs : []);

  const breadcrumbItems = resolvedBreadcrumbs
    ? resolvedBreadcrumbs.map((item, idx) => ({
        key: idx,
        title: (
          <span
            onClick={item.onClick || (() => item.href && navigate(item.href))}
            style={{
              cursor: item.onClick || item.href ? "pointer" : "default",
              color: item.href || item.onClick ? "#5b7aed" : "inherit",
            }}
          >
            {item.title}
          </span>
        ),
      }))
    : [];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #f0f3f7 100%)",
        minHeight: "100%",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderBottom: "1px solid #e8eefb",
          paddingTop: paddingStyle.top,
          paddingBottom: paddingStyle.bottom,
          paddingLeft: paddingStyle.horizontal,
          paddingRight: paddingStyle.horizontal,
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(10px)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Breadcrumbs */}
        {breadcrumbItems.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <Breadcrumb
              items={[
                {
                  key: "home",
                  title: (
                    <span
                      onClick={() => navigate("/")}
                      style={{
                        cursor: "pointer",
                        color: "#5b7aed",
                      }}
                    >
                      Home
                    </span>
                  ),
                },
                ...breadcrumbItems,
              ]}
              style={{
                fontSize: 12,
                color: "#7f8c8d",
              }}
            />
          </div>
        )}

        {/* Title Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: subtitle ? 8 : 0,
              }}
            >
              {showBackButton && (
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(-1)}
                  style={{
                    color: "#7f8c8d",
                    padding: "4px 8px",
                    height: "auto",
                  }}
                />
              )}

              {icon && (
                <div
                  style={{
                    fontSize: 28,
                    color: "#5b7aed",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </div>
              )}

              <Title
                level={2}
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#2c3e50",
                  letterSpacing: "-0.5px",
                }}
              >
                {title}
              </Title>
            </div>

            {subtitle && (
              <Text
                type="secondary"
                style={{
                  fontSize: 13,
                  marginLeft: icon || showBackButton ? 40 : 0,
                  display: "block",
                  color: "#7f8c8d",
                }}
              >
                {subtitle}
              </Text>
            )}
          </div>

          {extra && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingTop: icon ? 4 : 0,
              }}
            >
              {extra}
            </div>
          )}
        </div>
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
