import React from "react";
import { Button, Space, Dropdown, Tag } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Play, Pause, CheckCircle, Clock } from "lucide-react";
import { projectStatusColorMap } from "@/shared/types/project";
import type { ProjectStatus } from "@/shared/types/project";
import type { MenuProps } from "antd";

interface ProjectHeaderProps {
  status: ProjectStatus;
  onStatusChange?: (status: string) => void;
  onEdit?: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  status,
  onStatusChange,
  onEdit,
}) => {
  const statusColor = projectStatusColorMap[status];

  const getStatusLabel = (s: string) => {
    const statusMap: Record<string, string> = {
      Active: "Devam Ediyor",
      Completed: "Tamamlandı",
      "On Hold": "Beklemede",
      Planning: "Planlama",
    };
    return statusMap[s] || s;
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Active":
        return <Play size={14} />;
      case "On Hold":
        return <Pause size={14} />;
      case "Completed":
        return <CheckCircle size={14} />;
      case "Planning":
        return <Clock size={14} />;
      default:
        return null;
    }
  };

  const statusMenuItems: MenuProps["items"] = [
    { key: "Active", label: "Devam Ediyor" },
    { key: "On Hold", label: "Beklemede" },
    { key: "Completed", label: "Tamamlandı" },
    { key: "Planning", label: "Planlama" },
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
          background: `${statusColor}15`,
          border: `1px solid ${statusColor}30`,
          color: statusColor,
          fontWeight: 600,
          fontSize: 12,
          padding: "4px 12px",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {getStatusLabel(status)}
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
