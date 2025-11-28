import React from "react";
import { Table, Tag, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { TimeEntry } from "../model/types";
import { colors as colorPalette } from "@/shared/styles";

const columns: ColumnsType<TimeEntry> = [
  { title: "Tarih", dataIndex: "date", key: "date", width: 110 },
  { title: "Proje", dataIndex: "project", key: "project", width: 150 },
  { title: "Görev", dataIndex: "task", key: "task", width: 150 },
  { title: "Başlama", dataIndex: "startTime", key: "startTime", width: 90 },
  {
    title: "Bitiş",
    dataIndex: "endTime",
    key: "endTime",
    width: 90,
    render: (endTime: string | null) => endTime || "-",
  },
  {
    title: "Süre (Saat)",
    dataIndex: "duration",
    key: "duration",
    width: 120,
    render: (duration: number) => duration.toFixed(2),
  },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: TimeEntry["status"]) => (
      <Tag
        color={
          status === "completed" ? colorPalette.success : colorPalette.primary
        }
      >
        {status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
      </Tag>
    ),
  },
  {
    title: "Notlar",
    dataIndex: "notes",
    key: "notes",
    width: 220,
    ellipsis: true,
    render: (notes?: string) => notes || "-",
  },
  {
    title: "İşlemler",
    key: "actions",
    width: 140,
    render: (_: unknown, record: TimeEntry) => (
      <Space size="small">
        {record.status === "in-progress" ? (
          <Button
            type="text"
            size="small"
            icon={<PauseCircleOutlined />}
            title="Duraklat"
          />
        ) : (
          <Button
            type="text"
            size="small"
            icon={<PlayCircleOutlined />}
            title="Başlat"
          />
        )}
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          title="Sil"
        />
      </Space>
    ),
  },
];

interface TimeEntriesTableProps {
  entries: TimeEntry[];
}

export const TimeEntriesTable: React.FC<TimeEntriesTableProps> = ({
  entries,
}) => (
  <Table
    columns={columns}
    dataSource={entries}
    rowKey="id"
    pagination={{ pageSize: 10 }}
    scroll={{ x: 1300 }}
  />
);
