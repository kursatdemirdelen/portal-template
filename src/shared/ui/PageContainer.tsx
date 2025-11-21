import React, { type ReactNode } from "react";
import { Typography, Breadcrumb, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useBreadcrumbs, type BreadcrumbItem } from "@/shared/hooks/useBreadcrumbs";
import { layoutStyles } from "@/shared/styles/componentStyles";
import { colorPalette } from "@/shared/styles/styleConstants";

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

  const resolvedBreadcrumbs = breadcrumbs ?? (useRouteBreadcrumbs ? routeBreadcrumbs : []);

  const breadcrumbItems = resolvedBreadcrumbs
    ? resolvedBreadcrumbs.map((item, idx) => ({
        key: idx,
        title: (
          <span
            onClick={item.onClick || (() => item.href && navigate(item.href))}
            style={{
              cursor: item.onClick || item.href ? "pointer" : "default",
              color: item.href || item.onClick ? colorPalette.primary : "inherit",
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
                      color: colorPalette.primary,
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
        <div style={layoutStyles.pageContainer.titleRow}>
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
                    color: colorPalette.textSecondary,
                    padding: "4px 8px",
                    height: "auto",
                  }}
                />
              )}

              {icon && (
                <div style={layoutStyles.pageContainer.icon}>
                  {icon}
                </div>
              )}
	
	              <Title level={2} style={layoutStyles.pageContainer.title}>
	                {title}
	              </Title>
	            </div>

	            {subtitle && (
	              <Text
	                type="secondary"
	                style={{
	                  ...layoutStyles.pageContainer.subtitle,
	                  marginLeft: icon || showBackButton ? 40 : 0,
	                  display: "block",
	                }}
	              >
	                {subtitle}
	              </Text>
	            )}
          </div>

          {extra && (
            <div
              style={{
                ...layoutStyles.pageContainer.actions,
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
