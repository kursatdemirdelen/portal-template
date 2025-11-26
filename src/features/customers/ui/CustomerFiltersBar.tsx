import { Card, Row, Col, Input, Select, Button, Typography } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { CustomerFilters } from "../model/types";
import { STATUS_LABELS, ALL_STATUSES } from "./constants";

const { Text } = Typography;

interface CustomerFiltersBarProps {
  filters: CustomerFilters;
  onFilterChange: (key: keyof CustomerFilters, value: string) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  border: "none",
};

const statusOptions = [
  { value: "all", label: "Tüm Durumlar" },
  ...ALL_STATUSES.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  })),
];

export const CustomerFiltersBar = ({
  filters,
  onFilterChange,
  onReset,
  filteredCount,
  totalCount,
}: CustomerFiltersBarProps) => {
  return (
    <Card
      style={{ ...cardStyle, marginBottom: 16 }}
      styles={{ body: { padding: "16px 20px" } }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Müşteri adı, yetkili kişi ara..."
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            allowClear
            style={{ borderRadius: 8 }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            value={filters.status}
            onChange={(value) => onFilterChange("status", value)}
            style={{ width: "100%" }}
            options={statusOptions}
            suffixIcon={<FilterOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button
            icon={<ReloadOutlined />}
            onClick={onReset}
            style={{ borderRadius: 8 }}
          >
            Sıfırla
          </Button>
        </Col>
        <Col flex="auto" style={{ textAlign: "right" }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {filteredCount} / {totalCount} müşteri
          </Text>
        </Col>
      </Row>
    </Card>
  );
};
