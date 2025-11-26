/**
 * Parameter Form Modal Component
 *
 * Parametre oluşturma/düzenleme modalı.
 */

import React from "react";
import { Modal, Form, Input, Select } from "antd";
import type { FormInstance } from "antd";
import type { Parameter } from "../model/types";
import { CATEGORY_LABELS, TYPE_LABELS } from "./constants";

interface ParameterFormModalProps {
  open: boolean;
  editingParameter: Parameter | null;
  form: FormInstance;
  onSave: () => void;
  onCancel: () => void;
}

export const ParameterFormModal: React.FC<ParameterFormModalProps> = ({
  open,
  editingParameter,
  form,
  onSave,
  onCancel,
}) => {
  return (
    <Modal
      title={editingParameter ? "Parametreyi Düzenle" : "Yeni Parametre Ekle"}
      open={open}
      onOk={onSave}
      onCancel={onCancel}
      okText={editingParameter ? "Güncelle" : "Oluştur"}
      cancelText="İptal"
      width={600}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
        <Form.Item
          label="Anahtar (Key)"
          name="key"
          rules={[
            { required: true, message: "Anahtar gerekli" },
            {
              pattern: /^[a-z_]+$/,
              message: "Sadece küçük harfler ve alt çizgi kullanın",
            },
          ]}
        >
          <Input
            placeholder="örn. max_ticket_priority"
            disabled={!!editingParameter}
          />
        </Form.Item>

        <Form.Item
          label="Değer"
          name="value"
          rules={[{ required: true, message: "Değer gerekli" }]}
        >
          <Input.TextArea placeholder="Parametre değerini girin" rows={3} />
        </Form.Item>

        <Form.Item
          label="Açıklama"
          name="description"
          rules={[{ required: true, message: "Açıklama gerekli" }]}
        >
          <Input.TextArea
            placeholder="Parametrenin ne işe yaradığını açıklayın"
            rows={2}
          />
        </Form.Item>

        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true, message: "Kategori gerekli" }]}
        >
          <Select placeholder="Kategori seçin">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <Select.Option key={key} value={key}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Veri Tipi"
          name="type"
          rules={[{ required: true, message: "Veri tipi gerekli" }]}
        >
          <Select placeholder="Veri tipi seçin">
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <Select.Option key={key} value={key}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {editingParameter && (
          <Form.Item
            label="Durum"
            name="status"
            rules={[{ required: true, message: "Durum gerekli" }]}
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">Aktif</Select.Option>
              <Select.Option value="inactive">İnaktif</Select.Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
