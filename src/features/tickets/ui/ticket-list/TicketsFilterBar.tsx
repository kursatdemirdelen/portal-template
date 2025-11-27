import React from "react";
import { Input, Select } from "antd";
import { FilterToolbar } from "@/shared/ui";

interface Option<T = string> {
  label: string;
  value: T;
}

interface TicketsFilterBarProps {
  isMobile: boolean;
  searchTerm: string;
  statusFilter?: string;
  requestTypeFilter?: string;
  assigneeFilter?: string;
  statusOptions: Option[];
  requestTypeOptions: Option[];
  assigneeOptions: Option[];
  onSearchChange: (v: string) => void;
  onStatusChange: (v?: string) => void;
  onRequestTypeChange: (v?: string) => void;
  onAssigneeChange: (v?: string) => void;
}

export const TicketsFilterBar: React.FC<TicketsFilterBarProps> = ({
  isMobile,
  searchTerm,
  statusFilter,
  requestTypeFilter,
  assigneeFilter,
  statusOptions,
  requestTypeOptions,
  assigneeOptions,
  onSearchChange,
  onStatusChange,
  onRequestTypeChange,
  onAssigneeChange,
}) => {
  if (!isMobile) return null;

  return (
    <FilterToolbar>
      <Input
        placeholder="ID, başlık ya da proje ara"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
        style={{ minWidth: 240, flex: 1 }}
      />
      <Select
        placeholder="Durum"
        allowClear
        options={statusOptions}
        value={statusFilter}
        onChange={(value) => onStatusChange(value)}
        style={{ width: 160 }}
      />
      <Select
        placeholder="İstek tipi"
        allowClear
        options={requestTypeOptions}
        value={requestTypeFilter}
        onChange={(value) => onRequestTypeChange(value)}
        style={{ width: 180 }}
      />
      <Select
        placeholder="Atanan kişi"
        allowClear
        options={assigneeOptions}
        value={assigneeFilter}
        onChange={(value) => onAssigneeChange(value)}
        style={{ width: 180 }}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    </FilterToolbar>
  );
};

export default TicketsFilterBar;
