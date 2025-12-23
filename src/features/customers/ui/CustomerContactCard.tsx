import { Card, Typography, Descriptions, Space } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { colors } from "@/shared/styles";
import type { ContactPerson } from "../model/types";
import { customerDetailStyles as styles } from "./customerDetailStyles";

const { Text } = Typography;

interface CustomerContactCardProps {
  contact?: ContactPerson;
}

export const CustomerContactCard = ({ contact }: CustomerContactCardProps) => {
  return (
    <Card
      title={
        <Space>
          <UserOutlined style={{ color: colors.success }} />
          <span>Yetkili Kişi</span>
        </Space>
      }
      size="small"
      style={styles.cardFullHeight}
      styles={{ body: styles.cardBody }}
    >
      {contact ? (
        <Descriptions
          column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
          size="small"
          styles={{
            label: styles.descriptionLabel,
            content: styles.descriptionContent,
          }}
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
            <Text copyable={!!contact.email} style={styles.textBase}>
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
