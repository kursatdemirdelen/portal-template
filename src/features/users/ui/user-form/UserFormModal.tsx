/**
 * User Form Modal Component
 *
 * Kullanıcı oluşturma/düzenleme modalı.
 */

import React from "react";
import { Modal, Form, Input, Select, Row, Col } from "antd";
import type { FormInstance } from "antd";
import type { User, UserRole, UserStatus } from "../../model/types";
import { ROLE_LABELS, STATUS_LABELS, DEPARTMENTS } from "../shared/constants";

interface UserFormModalProps {
  open: boolean;
  editingUser: User | null;
  form: FormInstance;
  onSave: () => void;
  onCancel: () => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  editingUser,
  form,
  onSave,
  onCancel,
}) => {
  // Role options for Select
  const roleOptions = (Object.keys(ROLE_LABELS) as UserRole[]).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  // Status options for Select
  const statusOptions = (Object.keys(STATUS_LABELS) as UserStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })
  );

  return (
    <Modal
      title={editingUser ? "Kullanıcı Düzenle" : "Yeni Kullanıcı"}
      open={open}
      onOk={onSave}
      onCancel={onCancel}
      okText={editingUser ? "Güncelle" : "Oluştur"}
      cancelText="İptal"
      width={600}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Ad Soyad"
              rules={[{ required: true, message: "Ad soyad gerekli" }]}
            >
              <Input placeholder="Ad Soyad" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: "E-posta gerekli" },
                { type: "email", message: "Geçerli e-posta girin" },
              ]}
            >
              <Input placeholder="ornek@sirket.com" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Rol"
              rules={[{ required: true, message: "Rol seçin" }]}
            >
              <Select placeholder="Rol seçin" options={roleOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="department"
              label="Departman"
              rules={[{ required: true, message: "Departman seçin" }]}
            >
              <Select
                placeholder="Departman seçin"
                options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="status" label="Durum" initialValue="active">
              <Select options={statusOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phone" label="Telefon">
              <Input placeholder="+90 5XX XXX XXXX" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
