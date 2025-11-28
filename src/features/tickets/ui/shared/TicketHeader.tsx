import React from "react";
import { Button, Space, Dropdown, Tag } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { AlertCircle, Clock, CheckCircle, Archive } from "lucide-react";
import { getStatusStyle } from "@/shared/styles";
import type { MenuProps } from "antd";

interface TicketHeaderProps {
  status: string;
  onStatusChange?: (status: string) => void;
  onEdit?: () => void;
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({
  status,
  onStatusChange,
  onEdit,
}) => {
  const statusStyle = getStatusStyle(status);

  const getStatusIcon = () => {
    switch (status) {
      case "Yeni":
        return <Clock size={14} />;
      case "İşlemde":
        return <AlertCircle size={14} />;
      case "Çözümlenen":
        return <CheckCircle size={14} />;
      case "Kapalı":
        return <Archive size={14} />;
      default:
        return null;
    }
  };

  const statusMenuItems: MenuProps["items"] = [
    { key: "Yeni", label: "Yeni" },
    { key: "Atanan", label: "Atanan" },
    { key: "İşlemde", label: "İşlemde" },
    { key: "Çözümlenen", label: "Çözümlenen" },
    { key: "Kapalı", label: "Kapalı" },
  ];

  const moreMenuItems: MenuProps["items"] = [
    { key: "duplicate", label: "Kopyala" },
    { key: "archive", label: "Arşivle" },
    { type: "divider" },
    { key: "delete", label: "Sil", danger: true },
  ];

  return (
    <Space size="small">
      <Tag
        icon={getStatusIcon()}
        style={{
          background: statusStyle.bg,
          border: `1px solid ${statusStyle.border}`,
          color: statusStyle.text,
          fontWeight: 600,
          fontSize: 12,
          padding: "4px 12px",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {status}
      </Tag>
      <Dropdown
        menu={{
          items: statusMenuItems,
          onClick: ({ key }) => onStatusChange?.(key),
        }}
        trigger={["click"]}
      >
        <Button size="small">Durum Değiştir</Button>
      </Dropdown>
      <Button size="small" icon={<EditOutlined />} onClick={onEdit}>
        Düzenle
      </Button>
      <Dropdown menu={{ items: moreMenuItems }} trigger={["click"]}>
        <Button size="small" icon={<MoreOutlined />} />
      </Dropdown>
    </Space>
  );
};
