import React from "react";
import { Card, Typography, List } from "antd";

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
      background: "linear-gradient(135deg, #f8f9fa 0%, #f0f3f7 100%)",
      padding: 24,
    }}
  >
    <Card
      title="Çıkış"
      variant="borderless"
      style={{ maxWidth: 460, width: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
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
