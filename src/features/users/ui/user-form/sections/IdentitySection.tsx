/**
 * Identity Section Component
 *
 * Kullanıcı kimlik ve iletişim bilgileri formu.
 */

import React from "react";
import { Form, Input, Row, Col } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { SectionCard } from "@/shared/ui";

interface IdentitySectionProps {
  mode: "create" | "edit";
  showPassword?: boolean;
}

export const IdentitySection: React.FC<IdentitySectionProps> = ({
  mode,
  showPassword = mode === "create",
}) => {
  return (
    <SectionCard title="Kimlik ve İletişim Bilgileri" icon={<IdcardOutlined />}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Ad Soyad"
            name="name"
            rules={[
              { required: true, message: "Ad soyad gerekli" },
              { min: 2, message: "En az 2 karakter olmalı" },
            ]}
          >
            <Input placeholder="Kullanıcı adı soyadı" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="E-Posta"
            name="email"
            rules={[
              { required: true, message: "E-posta gerekli" },
              { type: "email", message: "Geçerli e-posta girin" },
            ]}
          >
            <Input
              placeholder="ornek@sirket.com"
              prefix={<MailOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Telefon" name="phone">
            <Input
              placeholder="+90 5XX XXX XXXX"
              prefix={<PhoneOutlined />}
            />
          </Form.Item>
        </Col>
        {showPassword && (
          <Col xs={24} md={12}>
            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                { required: true, message: "Şifre gerekli" },
                { min: 6, message: "En az 6 karakter olmalı" },
              ]}
            >
              <Input.Password
                placeholder="Kullanıcı şifresi"
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </SectionCard>
  );
};
