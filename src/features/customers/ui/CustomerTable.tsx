import { Table, Tag, Space, Button, Tooltip, Card, Typography } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Customer, CustomerStatus } from "../model/types";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  LICENSE_TYPE_LABELS,
  LICENSE_TYPE_COLORS,
  ALL_STATUSES,
  TABLE_CONFIG,
} from "./constants";

const { Text } = Typography;

interface CustomerTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  border: "none",
};

export const CustomerTable = ({
  customers,
  onView,
  onEdit,
}: CustomerTableProps) => {
  const columns: ColumnsType<Customer> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      render: (id: string) => (
        <Text type="secondary" style={{ fontFamily: "monospace" }}>
          #{id}
        </Text>
      ),
    },
    {
      title: "Müşteri",
      dataIndex: "shortName",
      key: "shortName",
      width: 220,
      sorter: (a, b) => a.shortName.localeCompare(b.shortName),
      render: (shortName: string, record: Customer) => (
        <div style={{ cursor: "pointer" }} onClick={() => onView(record)}>
          <div style={{ fontWeight: 600, color: "#1f1f1f" }}>{shortName}</div>
          <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
            {record.name}
          </Text>
        </div>
      ),
    },
    {
      title: "Yetkili Kişi",
      key: "contact",
      width: 200,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.contact.name}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.contact.role}
          </Text>
        </div>
      ),
    },
    {
      title: "İletişim",
      key: "contactPhone",
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ fontSize: 13 }}>{record.contact.phone}</div>
          <Text
            type="secondary"
            style={{ fontSize: 12 }}
            copyable={{ tooltips: ["Kopyala", "Kopyalandı"] }}
          >
            {record.contact.email}
          </Text>
        </div>
      ),
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      filters: ALL_STATUSES.map((s) => ({ text: STATUS_LABELS[s], value: s })),
      onFilter: (value, record) => record.status === value,
      render: (status: CustomerStatus) => (
        <Tag
          color={STATUS_COLORS[status]}
          style={{ borderRadius: 12, margin: 0 }}
        >
          {STATUS_LABELS[status]}
        </Tag>
      ),
    },
    {
      title: "Lisans",
      key: "license",
      width: 110,
      align: "center",
      render: (_, record) => (
        <Tag
          color={LICENSE_TYPE_COLORS[record.license.type]}
          style={{ borderRadius: 12, margin: 0 }}
        >
          {LICENSE_TYPE_LABELS[record.license.type]}
        </Tag>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="Detay">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined style={{ fontSize: 16 }} />}
              onClick={() => onView(record)}
              style={{ color: "#1890ff" }}
            />
          </Tooltip>
          <Tooltip title="Düzenle">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined style={{ fontSize: 16 }} />}
              onClick={() => onEdit(record)}
              style={{ color: "#52c41a" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card style={cardStyle} styles={{ body: { padding: 0 } }}>
      <Table
        columns={columns}
        dataSource={customers}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / ${total} müşteri`,
          defaultPageSize: TABLE_CONFIG.defaultPageSize,
          pageSizeOptions: TABLE_CONFIG.pageSizeOptions,
          style: { marginRight: 16 },
        }}
        scroll={{ x: TABLE_CONFIG.scrollX }}
        style={{ borderRadius: 12 }}
        rowClassName={() => "customer-table-row"}
      />
    </Card>
  );
};
