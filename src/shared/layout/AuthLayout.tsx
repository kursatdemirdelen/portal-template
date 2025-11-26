import { Layout, Card, Typography } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a, #020617)",
          padding: 16,
        }}
      >
        <Card style={{ width: 400, maxWidth: "100%" }} variant="borderless">
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <Title level={3} style={{ marginBottom: 4 }}>
              Portal Intellium
            </Title>
            <Text type="secondary">Güvenli yönetim paneli</Text>
          </div>
          {children}
        </Card>
      </Content>
    </Layout>
  );
};
