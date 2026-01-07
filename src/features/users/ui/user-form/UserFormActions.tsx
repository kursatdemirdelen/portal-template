/**
 * User Form Actions Component
 *
 * Form action buttons (Kaydet, İptal, Temizle).
 */

import React from "react";
import { Button, Space } from "antd";
import {
  UserAddOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

interface UserFormActionsProps {
  mode: "create" | "edit";
  loading?: boolean;
  onCancel: () => void;
  onReset?: () => void;
  sticky?: boolean;
}

export const UserFormActions: React.FC<UserFormActionsProps> = ({
  mode,
  loading = false,
  onCancel,
  onReset,
}) => {
  return (
    <div style={{ paddingTop: 8 }}>
      <Space size="middle" style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button onClick={onCancel} icon={<ArrowLeftOutlined />}>
          {mode === "create" ? "Geri Dön" : "İptal"}
        </Button>
        {mode === "create" && onReset && (
          <Button onClick={onReset}>
            Temizle
          </Button>
        )}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={mode === "create" ? <UserAddOutlined /> : <SaveOutlined />}
        >
          {mode === "create" ? "Kullanıcı Oluştur" : "Değişiklikleri Kaydet"}
        </Button>
      </Space>
    </div>
  );
};
