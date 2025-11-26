import {
  Card,
  Typography,
  Descriptions,
  Tag,
  Space,
  Tooltip,
  message,
} from "antd";
import { IdcardOutlined, CopyOutlined } from "@ant-design/icons";
import { shadows } from "@/shared/styles/styleConstants";
import type { Customer } from "../model/types";
import { STATUS_LABELS, STATUS_COLORS } from "./constants";

const { Text } = Typography;

interface CustomerInfoCardProps {
  customer: Customer;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: shadows.sm,
};

export const CustomerInfoCard = ({ customer }: CustomerInfoCardProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success(`${label} kopyalandı`);
  };

  return (
    <Card
      title={
        <Space>
          <IdcardOutlined style={{ color: "#1890ff" }} />
          <span>Temel Bilgiler</span>
        </Space>
      }
      size="small"
      style={{ ...cardStyle, height: "100%" }}
      styles={{ body: { padding: "16px 20px" } }}
    >
      <Descriptions
        column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
        size="small"
        labelStyle={{
          fontWeight: 500,
          color: "#666",
          padding: "6px 8px",
        }}
        contentStyle={{ color: "#333", padding: "6px 8px" }}
      >
        <Descriptions.Item label="Kısa Ad">
          <Text strong>{customer.shortName}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label="Tam Unvan"
          span={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
        >
          {customer.name}
        </Descriptions.Item>
        <Descriptions.Item label="Vergi Dairesi">
          {customer.taxOffice || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Vergi No">
          <Space size={4}>
            <Text code style={{ fontSize: 12 }}>
              {customer.taxNumber || "-"}
            </Text>
            {customer.taxNumber && (
              <Tooltip title="Kopyala">
                <CopyOutlined
                  style={{
                    cursor: "pointer",
                    color: "#1890ff",
                    fontSize: 12,
                  }}
                  onClick={() =>
                    copyToClipboard(customer.taxNumber!, "Vergi No")
                  }
                />
              </Tooltip>
            )}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Durum">
          <Tag color={STATUS_COLORS[customer.status]} style={{ margin: 0 }}>
            {STATUS_LABELS[customer.status]}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
