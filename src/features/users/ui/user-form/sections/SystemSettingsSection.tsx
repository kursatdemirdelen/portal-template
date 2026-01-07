/**
 * System Settings Section Component
 *
 * Kullanıcı sistem ayarları formu.
 */

import React from "react";
import { Form, Select, Switch, Space, Row, Col } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { SectionCard } from "@/shared/ui";
import { LANGUAGES, TIMEZONES } from "../../shared/constants";

interface SystemSettingsSectionProps {
  mode: "create" | "edit";
}

export const SystemSettingsSection: React.FC<SystemSettingsSectionProps> = ({
  mode,
}) => {
  return (
    <SectionCard title="Sistem Ayarları" icon={<SettingOutlined />}>
      <Row gutter={16}>
        {mode === "edit" && (
          <Col xs={24} md={12}>
            <Form.Item
              label="Dil"
              name="language"
              rules={[{ required: true, message: "Dil seçin" }]}
            >
              <Select placeholder="Dil seçiniz" options={[...LANGUAGES]} />
            </Form.Item>
          </Col>
        )}
        <Col xs={24} md={12}>
          <Form.Item
            label="Zaman Dilimi"
            name="timezone"
            rules={[{ required: true, message: "Zaman dilimi seçin" }]}
            initialValue="Europe/Istanbul"
          >
            <Select
              placeholder="Zaman dilimi seçiniz"
              options={[...TIMEZONES]}
              showSearch
            />
          </Form.Item>
        </Col>
        {mode === "create" && (
          <Col xs={24} md={12}>
            <Form.Item
              label="Hesap Durumu"
              name="isActive"
              valuePropName="checked"
              initialValue={true}
            >
              <Space>
                <Switch defaultChecked />
                <span>Aktif</span>
              </Space>
            </Form.Item>
          </Col>
        )}
      </Row>
    </SectionCard>
  );
};
