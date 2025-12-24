import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  colors as colorPalette,
  backgrounds,
  borderColors,
  shadows,
  spacing,
  radius,
} from "@/shared/styles";

const { Text } = Typography;

interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => void;
  loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string; password: string }) => {
    onSubmit?.(values);
  };

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "0 auto",
        padding: `${spacing["3xl"]}px ${spacing["2xl"]}px`,
        borderRadius: radius.xl,
        border: `1px solid ${borderColors.neutral}`,
        background: backgrounds.card,
        boxShadow: shadows.lg,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: spacing["2xl"] }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: colorPalette.textPrimary,
          }}
        >
          Portal'a Giriş
        </Text>
        <p
          style={{
            color: colorPalette.textSecondary,
            margin: `${spacing.xs}px 0 0`,
          }}
        >
          Kullanıcı bilgilerinizle oturum açın.
        </p>
      </div>

      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="email"
          label="E-posta"
          rules={[
            { required: true, message: "E-posta adresinizi girin" },
            { type: "email", message: "Geçerli bir e-posta girin" },
          ]}
        >
          <Input
            id="login-email"
            size="large"
            prefix={<UserOutlined />}
            placeholder="ornek@portal.com"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Şifre"
          rules={[{ required: true, message: "Şifrenizi girin" }]}
        >
          <Input.Password
            id="login-password"
            size="large"
            prefix={<LockOutlined />}
            placeholder="********"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          style={{ marginTop: spacing.sm }}
        >
          Giriş Yap
        </Button>
      </Form>
    </div>
  );
};
