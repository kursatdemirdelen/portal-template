import React from "react";
import { Card, Typography, List } from "antd";
import { gradients, shadows } from "@/shared/styles";

const checklist = [
  "Auth logout çağrısını tetikleyin",
  "Tokenları temizleyin",
  "Login sayfasına yönlendirin",
];

const LogoutPage: React.FC = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: gradients.bgPrimary,
      padding: 24,
    }}
  >
    <Card
      title="Çıkış"
      variant="borderless"
      style={{ maxWidth: 460, width: "100%", boxShadow: shadows.lg }}
    >
      <Typography.Paragraph type="secondary">
        Oturumu sonlandırma işlemini gerçek auth logout aksiyonuyla bağlayın.
      </Typography.Paragraph>
      <List
        dataSource={checklist}
        renderItem={(item) => (
          <List.Item style={{ paddingLeft: 0 }}>
            <Typography.Text>{item}</Typography.Text>
          </List.Item>
        )}
      />
    </Card>
  </div>
);

export default LogoutPage;
