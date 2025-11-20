import React, { type ReactNode, type CSSProperties } from "react";
import { Typography } from "antd";
import { cardStyles } from "@/shared/styles/componentStyles";

const { Title, Text } = Typography;

type Variant = "default" | "elevated" | "subtle" | "gradient";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  border?: boolean;
  padding?: "small" | "medium" | "large";
  style?: CSSProperties;
}

const variantConfig = {
  default: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    border: "1px solid #e8eefb",
  },
  elevated: {
    background: "linear-gradient(135deg, #f0f3f7 0%, #e8eefb 100%)",
    border: "1px solid #d0ddf7",
  },
  subtle: {
    background: "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",
    border: "1px solid #ecf0f1",
  },
  gradient: {
    background: "linear-gradient(135deg, rgba(91, 122, 237, 0.08) 0%, rgba(108, 92, 231, 0.04) 100%)",
    border: "1px solid #e8eefb",
  },
};

const paddingConfig = {
  small: 12,
  medium: 20,
  large: 28,
};

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  extra,
  children,
  variant = "default",
  icon,
  border: showBorder = true,
  padding = "medium",
  style,
}) => {
  const config = variantConfig[variant];
  const paddingSize = paddingConfig[padding];

  return (
    <div
      style={{
        ...cardStyles.sectionCard.container,
        background: config.background,
        border: showBorder ? config.border : "none",
        ...style,
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(91, 122, 237, 0.2) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header section */}
      {title && (
        <>
          <div
            style={{
              padding: `${paddingSize}px ${paddingSize}px 0 ${paddingSize}px`,
              ...cardStyles.sectionCard.header,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: subtitle ? 4 : 0,
                }}
              >
                {icon && (
                  <div
                    style={{
                      fontSize: 20,
                      color: "#5b7aed",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {icon}
                  </div>
                )}
                <Title level={4} style={cardStyles.sectionCard.title}>
                  {title}
                </Title>
              </div>
              {subtitle && (
                <Text
                  type="secondary"
                  style={{
                    fontSize: 12,
                    marginLeft: icon ? 32 : 0,
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
                }}
              >
                {extra}
              </div>
            )}
          </div>

          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(91, 122, 237, 0.15) 100%)",
              margin: `${paddingSize}px 0 0 0`,
            }}
          />
        </>
      )}

      {/* Content section */}
      <div
        style={{
          padding: `${paddingSize}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
