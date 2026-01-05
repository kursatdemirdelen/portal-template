import React from "react";
import { Descriptions, Tag, Space, Typography, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SectionCard } from "@/shared/ui";
import { colors, spacing } from "@/shared/styles";

const { Text, Link } = Typography;

interface AddressInfo {
  type: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
}

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

interface ContactInfoData {
  phone: string;
  mobile?: string;
  email: string;
  personalEmail?: string;
  addresses: AddressInfo[];
  emergencyContacts?: EmergencyContact[];
}

interface ContactInfoTabProps {
  data: ContactInfoData;
}

export const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      {/* Telefon ve E-posta */}
      <SectionCard
        title={
          <Space>
            <PhoneOutlined style={{ color: colors.primary }} />
            <span>İletişim Bilgileri</span>
          </Space>
        }
        subtitle="Telefon ve e-posta iletişim bilgileriniz"
      >
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label="Telefon">
            <Space>
              <PhoneOutlined />
              <Link href={`tel:${data.phone}`}>{data.phone}</Link>
            </Space>
          </Descriptions.Item>
          {data.mobile && (
            <Descriptions.Item label="Cep Telefonu">
              <Space>
                <MobileOutlined />
                <Link href={`tel:${data.mobile}`}>{data.mobile}</Link>
              </Space>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Kurumsal E-posta">
            <Space>
              <MailOutlined />
              <Link href={`mailto:${data.email}`}>{data.email}</Link>
            </Space>
          </Descriptions.Item>
          {data.personalEmail && (
            <Descriptions.Item label="Kişisel E-posta">
              <Space>
                <MailOutlined />
                <Link href={`mailto:${data.personalEmail}`}>
                  {data.personalEmail}
                </Link>
              </Space>
            </Descriptions.Item>
          )}
        </Descriptions>
      </SectionCard>

      {/* Adres Bilgileri */}
      <SectionCard
        title={
          <Space>
            <HomeOutlined style={{ color: colors.info }} />
            <span>Adres Bilgileri</span>
          </Space>
        }
        subtitle="Kayıtlı ev ve iş adresleriniz"
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: spacing.md }}
        >
          {data.addresses.map((addr, index) => (
            <div key={index}>
              {index > 0 && <Divider style={{ margin: `${spacing.sm}px 0` }} />}
              <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
                <Descriptions.Item label="Adres Tipi">
                  <Tag
                    color={addr.type === "Ev" ? colors.success : colors.info}
                  >
                    {addr.type}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="İl / İlçe">
                  <Space>
                    <EnvironmentOutlined />
                    {addr.city} / {addr.district}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Adres" span={2}>
                  {addr.address}
                </Descriptions.Item>
                {addr.postalCode && (
                  <Descriptions.Item label="Posta Kodu" span={2}>
                    {addr.postalCode}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Acil Durum Kişileri */}
      {data.emergencyContacts && data.emergencyContacts.length > 0 && (
        <SectionCard
          title={
            <Space>
              <UserOutlined style={{ color: colors.error }} />
              <span>Acil Durum Kişileri</span>
            </Space>
          }
          subtitle="Acil durumlarda ulaşılacak yakınlarınız"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.md,
            }}
          >
            {data.emergencyContacts.map((contact, index) => (
              <div key={index}>
                {index > 0 && (
                  <Divider style={{ margin: `${spacing.sm}px 0` }} />
                )}
                <Descriptions column={{ xs: 1, sm: 3 }} bordered size="small">
                  <Descriptions.Item label="Ad Soyad">
                    <Text strong>{contact.name}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Yakınlık">
                    <Tag color={colors.warning}>{contact.relation}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Telefon">
                    <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
};
