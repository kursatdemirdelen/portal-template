import React from "react";
import { Button } from "antd";
import { spacing, radius, colors, gradients } from "@/shared/styles";

interface ServerErrorPageProps {
  onRetry?: () => void;
  onHome?: () => void;
  errorCode?: number;
  title?: string;
  description?: string;
}

/**
 * 500 Internal Server Error Sayfası
 */
export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  onRetry,
  onHome,
  errorCode = 500,
  title = "Sunucu Hatası",
  description = "Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyiniz.",
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: gradients.bgCard,
      flexDirection: "column",
      gap: spacing.xl,
      color: colors.textPrimary,
      padding: spacing.lg,
    }}
  >
    {/* Error Code */}
    <div style={{ fontSize: 72, fontWeight: "bold", color: colors.error }}>
      {errorCode}
    </div>

    {/* Title */}
    <div style={{ fontSize: 24, fontWeight: 600 }}>{title}</div>

    {/* Description */}
    <div
      style={{
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
        maxWidth: 400,
      }}
    >
      {description}
    </div>

    {/* Action Buttons */}
    <div
      style={{
        display: "flex",
        gap: spacing.md,
        marginTop: spacing.xl,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {onRetry && (
        <Button
          type="primary"
          onClick={onRetry}
          style={{
            padding: `${spacing.sm}px ${spacing.lg}px`,
            height: 36,
            borderRadius: radius.md,
            fontSize: 14,
          }}
        >
          Tekrar Deneyin
        </Button>
      )}
      {onHome && (
        <Button
          onClick={onHome}
          style={{
            padding: `${spacing.sm}px ${spacing.lg}px`,
            height: 36,
            borderRadius: radius.md,
            fontSize: 14,
          }}
        >
          Ana Sayfaya Dön
        </Button>
      )}
    </div>
  </div>
);

/**
 * 404 Not Found Sayfası
 */
export const NotFoundPage: React.FC<{ onHome?: () => void }> = ({ onHome }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: gradients.bgCard,
      flexDirection: "column",
      gap: spacing.xl,
      color: colors.textPrimary,
      padding: spacing.lg,
    }}
  >
    {/* Error Code */}
    <div style={{ fontSize: 72, fontWeight: "bold", color: colors.primary }}>
      404
    </div>

    {/* Title */}
    <div style={{ fontSize: 24, fontWeight: 600 }}>Sayfa Bulunamadı</div>

    {/* Description */}
    <div
      style={{
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
        maxWidth: 400,
      }}
    >
      Aradığınız sayfa bulunamadı veya silinmiş olabilir.
    </div>

    {/* Action Button */}
    <Button
      type="primary"
      onClick={onHome}
      style={{
        marginTop: spacing.xl,
        padding: `${spacing.sm}px ${spacing.xl}px`,
        height: 36,
        borderRadius: radius.md,
        fontSize: 14,
      }}
    >
      Dashboard'a Dön
    </Button>
  </div>
);
