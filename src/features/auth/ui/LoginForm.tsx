import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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
        padding: "32px 28px",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 600, color: "#0f172a" }}>
          Portal'a Giriş
        </Text>
        <p style={{ color: "#64748b", margin: "8px 0 0" }}>
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
          style={{ marginTop: 12 }}
        >
          Giriş Yap
        </Button>
      </Form>
    </div>
  );
};
