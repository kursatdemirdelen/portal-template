/**
 * Parameter Filters Bar Component
 *
 * Parametre filtreleme ve toplu işlem araç çubuğu.
 */

import React from "react";
import { Space, Input, Select, Button } from "antd";
import { DownloadOutlined, ClearOutlined } from "@ant-design/icons";
import { SectionCard } from "@/shared/ui/SectionCard";
import type { ParameterStatus } from "../model/types";

interface ParameterFiltersBarProps {
  searchText: string;
  statusFilter: ParameterStatus | "all";
  selectedCount: number;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: ParameterStatus | "all") => void;
  onBulkStatusChange: (status: ParameterStatus) => void;
  onBulkDelete: () => void;
  onExport: () => void;
  onClearSelection: () => void;
}

export const ParameterFiltersBar: React.FC<ParameterFiltersBarProps> = ({
  searchText,
  statusFilter,
  selectedCount,
  onSearchChange,
  onStatusFilterChange,
  onBulkStatusChange,
  onBulkDelete,
  onExport,
  onClearSelection,
}) => {
  return (
    <SectionCard variant="default" style={{ marginBottom: 20 }}>
      <Space style={{ marginBottom: 16 }} wrap size="middle">
        <Input.Search
          placeholder="Anahtar, değer veya açıklama ile ara..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: 280 }}
          allowClear
        />

        <Select
          value={statusFilter}
          onChange={onStatusFilterChange}
          style={{ width: 140 }}
        >
          <Select.Option value="all">Tüm Durumlar</Select.Option>
          <Select.Option value="active">Aktif</Select.Option>
          <Select.Option value="inactive">İnaktif</Select.Option>
        </Select>

        {selectedCount > 0 && (
          <>
            <Button icon={<DownloadOutlined />} onClick={onExport}>
              Dışa Aktar ({selectedCount})
            </Button>

            <Select
              placeholder="Durum Değiştir"
              style={{ width: 150 }}
              onChange={(status) =>
                onBulkStatusChange(status as ParameterStatus)
              }
            >
              <Select.Option value="active">Aktif Yap</Select.Option>
              <Select.Option value="inactive">İnaktif Yap</Select.Option>
            </Select>

            <Button danger onClick={onBulkDelete}>
              Sil ({selectedCount})
            </Button>

            <Button
              type="text"
              icon={<ClearOutlined />}
              onClick={onClearSelection}
            >
              Temizle
            </Button>
          </>
        )}
      </Space>
    </SectionCard>
  );
};
