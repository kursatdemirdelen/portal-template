import React from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Checkbox,
  FormInstance,
  Row,
  Col,
  Typography,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  colors,
  backgrounds,
  borderColors,
  spacing,
  radius,
  typography,
  gradients,
} from "@/shared/styles";
import DemoCredentials from "./DemoCredentials";

const { Title, Text } = Typography;

/* ===========================
   TYPES
   =========================== */

interface LoginFormProps {
  form: FormInstance;
  loading: boolean;
  error: string | null;
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  onErrorClose: () => void;
}

/* ===========================
   STYLES
   =========================== */

const styles = {
  header: {
    marginBottom: spacing["3xl"],
  },
  welcomeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    display: "block",
    marginBottom: spacing.sm,
  },
  title: {
    margin: `0 0 ${spacing.sm}px 0`,
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.relaxed,
  },
  formLabel: {
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  input: {
    height: 50,
    borderRadius: radius.lg,
    fontSize: typography.fontSize.md,
    background: backgrounds.input,
    border: `1px solid ${borderColors.light}`,
  },
  inputIcon: {
    color: colors.textMuted,
    fontSize: typography.fontSize.lg,
  },
  submitButton: {
    height: 52,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    borderRadius: radius.lg,
    background: gradients.sidebarLogo,
    border: "none",
    boxShadow: "0 8px 24px rgba(91, 122, 237, 0.35)",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: spacing.sm,
  },
  forgotLink: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  alert: {
    marginBottom: spacing["2xl"],
    borderRadius: radius.lg,
  },
} as const;

/* ===========================
   COMPONENT
   =========================== */

const LoginForm: React.FC<LoginFormProps> = ({
  form,
  loading,
  error,
  onSubmit,
  onErrorClose,
}) => {
  return (
    <>
      {/* Header */}
      <div style={styles.header}>
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
        <Title level={2} style={styles.title}>
          Hesabınıza Giriş Yapın
        </Title>
        <Text type="secondary" style={styles.subtitle}>
          Portal'a erişmek için giriş bilgilerinizi kullanın
        </Text>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          message="Giriş Hatası"
          description={error}
          type="error"
          showIcon
          closable
          onClose={onErrorClose}
          style={styles.alert}
        />
      )}

      {/* Login Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        size="large"
        requiredMark={false}
      >
        <Row gutter={spacing.lg}>
          <Col xs={24}>
            <Form.Item
              name="email"
              label={<span style={styles.formLabel}>E-posta Adresi</span>}
              rules={[
                { required: true, message: "E-posta adresinizi girin" },
                { type: "email", message: "Geçerli bir e-posta girin" },
              ]}
              style={{ marginBottom: spacing.xl }}
            >
              <Input
                placeholder="ornek@portal.com"
                prefix={<UserOutlined style={styles.inputIcon} />}
                style={styles.input}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="password"
              label={<span style={styles.formLabel}>Şifre</span>}
              rules={[
                { required: true, message: "Şifrenizi girin" },
                { min: 1, message: "Şifre gerekli" },
              ]}
              style={{ marginBottom: spacing.lg }}
            >
              <Input.Password
                placeholder="••••••••"
                prefix={<LockOutlined style={styles.inputIcon} />}
                style={styles.input}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: spacing["2xl"] + spacing.xs }}
        >
          <Col>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                style={{
                  fontSize: typography.fontSize.base,
                  color: colors.textSecondary,
                }}
              >
                Beni hatırla
              </Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <a href="#" style={styles.forgotLink}>
              Şifremi Unuttum
            </a>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: spacing["2xl"] }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={styles.submitButton}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            {!loading && (
              <ArrowRightOutlined
                style={{ fontSize: typography.fontSize.base }}
              />
            )}
          </Button>
        </Form.Item>
      </Form>

      {/* Demo Credentials */}
      <DemoCredentials />
    </>
  );
};

export default LoginForm;
