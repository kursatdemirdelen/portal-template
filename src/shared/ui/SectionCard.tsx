import React, { type ReactNode, type CSSProperties } from "react";
import { Typography, Spin } from "antd";
import { cardStyles } from "@/shared/styles/helpers";
import { colors, gradients, spacing, borderColors } from "@/shared/styles";

const { Title, Text } = Typography;

type Variant = "default" | "elevated" | "subtle" | "gradient";

export interface SectionCardProps {
  title?: ReactNode;
  subtitle?: string;
  extra?: ReactNode;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  border?: boolean;
  padding?: "small" | "medium" | "large";
  style?: CSSProperties;
  loading?: boolean;
}

const variantConfig = {
  default: {
    background: gradients.bgCard,
    border: `1px solid ${borderColors.light}`,
  },
  elevated: {
    background: gradients.bgElevated,
    border: `1px solid ${borderColors.medium}`,
  },
  subtle: {
    background: gradients.bgSubtle,
    border: `1px solid ${borderColors.gray}`,
  },
  gradient: {
    background: gradients.colorPurple,
    border: `1px solid ${borderColors.light}`,
  },
};

const paddingConfig = {
  small: spacing.md,
  medium: spacing.xl,
  large: spacing["3xl"],
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
  loading = false,
}) => {
  const config = variantConfig[variant];
  const paddingSize = paddingConfig[padding];

  return (
    <Spin spinning={loading}>
      <div
        style={{
          ...cardStyles.sectionCard.container,
          background: config.background,
          border: showBorder ? config.border : "none",
          marginBottom: spacing.md,
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
                gap: spacing.md,
              }}
            >
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.md,
                    marginBottom: subtitle ? spacing.xs : 0,
                  }}
                >
                  {icon && (
                    <div
                      style={{
                        fontSize: 20,
                        color: colors.primary,
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
                      marginLeft: icon ? spacing.lg : 0,
                      display: "block",
                      color: colors.textSecondary,
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
                    gap: spacing.sm,
                    flexWrap: "wrap",
                    flex: "0 0 auto",
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
    </Spin>
  );
};
