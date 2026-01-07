/**
 * Organization Section Component
 *
 * Kullanıcı organizasyon ve yetki bilgileri formu.
 */

import React from "react";
import { Form, Select, Row, Col } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { SectionCard } from "@/shared/ui";
import {
  DEPARTMENTS,
  ROLE_LABELS,
  STATUS_LABELS,
  COMPANIES,
} from "../../shared/constants";
import type { UserRole, UserStatus } from "../../../model";

interface OrganizationSectionProps {
  mode: "create" | "edit";
}

export const OrganizationSection: React.FC<OrganizationSectionProps> = ({
  mode,
}) => {
  const roles = (Object.keys(ROLE_LABELS) as UserRole[]).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  const statuses = (Object.keys(STATUS_LABELS) as UserStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })
  );

  const departments = DEPARTMENTS.map((d) => ({ label: d, value: d }));

  return (
    <SectionCard
      title="Organizasyon ve Yetki Bilgileri"
      icon={<BankOutlined />}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Kullanıcı Rolü"
            name="role"
            rules={[{ required: true, message: "Rol seçin" }]}
          >
            <Select placeholder="Rol seçiniz" options={roles} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Departman"
            name="department"
            rules={[{ required: true, message: "Departman seçin" }]}
          >
            <Select placeholder="Departman seçiniz" options={departments} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Şirket"
            name="company"
            rules={[{ required: true, message: "Şirket seçin" }]}
          >
            <Select placeholder="Şirket seçiniz" options={[...COMPANIES]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          {mode === "edit" ? (
            <Form.Item
              label="Hesap Durumu"
              name="status"
              rules={[{ required: true, message: "Durum seçin" }]}
            >
              <Select placeholder="Durum seçiniz" options={statuses} />
            </Form.Item>
          ) : (
            <Form.Item
              label="Dil"
              name="language"
              rules={[{ required: true, message: "Dil seçin" }]}
              initialValue="tr"
            >
              <Select
                placeholder="Dil seçiniz"
                options={[
                  { label: "Türkçe", value: "tr" },
                  { label: "English", value: "en" },
                  { label: "Deutsch", value: "de" },
                  { label: "Français", value: "fr" },
                ]}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </SectionCard>
  );
};
