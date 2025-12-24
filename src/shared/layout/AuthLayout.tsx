import { Layout, Card, Typography } from "antd";
import { spacing, gradients } from "@/shared/styles";

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
          background: gradients.bgPrimary,
          padding: spacing.md,
        }}
      >
        <Card style={{ width: 400, maxWidth: "100%" }} variant="borderless">
          <div style={{ marginBottom: spacing["2xl"], textAlign: "center" }}>
            <Title level={3} style={{ marginBottom: spacing.xs }}>
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
