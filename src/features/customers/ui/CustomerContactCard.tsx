import { Card, Typography, Descriptions, Space } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import type { ContactPerson } from "../model/types";

const { Text } = Typography;

interface CustomerContactCardProps {
  contact?: ContactPerson;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

export const CustomerContactCard = ({ contact }: CustomerContactCardProps) => {
  return (
    <Card
      title={
        <Space>
          <UserOutlined style={{ color: "#52c41a" }} />
          <span>Yetkili Kişi</span>
        </Space>
      }
      size="small"
      style={{ ...cardStyle, height: "100%" }}
      styles={{ body: { padding: "16px 20px" } }}
    >
      {contact ? (
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
          <Descriptions.Item label="Ad Soyad">
            <Text strong>{contact.name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Pozisyon">
            {contact.role || "-"}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <PhoneOutlined style={{ marginRight: 4 }} />
                Telefon
              </span>
            }
          >
            {contact.phone || "-"}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <MailOutlined style={{ marginRight: 4 }} />
                E-posta
              </span>
            }
          >
            <Text copyable={!!contact.email} style={{ fontSize: 13 }}>
              {contact.email || "-"}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text type="secondary">Yetkili kişi bilgisi yok</Text>
      )}
    </Card>
  );
};
