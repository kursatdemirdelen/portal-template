import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface PlaceholderCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const PlaceholderCard: React.FC<PlaceholderCardProps> = ({
  title,
  description,
  children,
  icon,
}) => (
  <Card
    style={{
      borderStyle: "dashed",
      borderColor: "#cbd5f5",
      background: "#f8fafc",
    }}
  >
    <Title level={5} style={{ marginBottom: 8 }}>
      {title}
    </Title>
    {icon && <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>}
    {description && (
      <Paragraph type="secondary" style={{ marginBottom: 16 }}>
        {description}
      </Paragraph>
    )}
    {children}
  </Card>
);
