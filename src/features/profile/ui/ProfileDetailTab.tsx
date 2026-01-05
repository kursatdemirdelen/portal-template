import React from "react";
import { Descriptions, Space, Tag } from "antd";
import {
  CalendarOutlined,
  IdcardOutlined,
  HeartOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { SectionCard } from "@/shared/ui";
import { colors, spacing } from "@/shared/styles";

interface ProfileDetailData {
  fullName: string;
  preferredName?: string;
  birthDate: string;
  birthPlace: string;
  identityNumber: string;
  age?: string;
  maritalStatus: string;
  nationality: string;
  gender: "male" | "female";
  disabilityLevel?: string;
  bloodType: string;
  militaryStatus?: string;
  bankName?: string;
  bankAccountNo?: string;
  ibanNo?: string;
}

interface ProfileDetailTabProps {
  data: ProfileDetailData;
}

export const ProfileDetailTab: React.FC<ProfileDetailTabProps> = ({ data }) => {
  const genderIcon =
    data.gender === "male" ? <ManOutlined /> : <WomanOutlined />;
  const genderText = data.gender === "male" ? "Erkek" : "Kadın";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      {/* Kişisel Bilgiler */}
      <SectionCard
        title={
          <Space>
            <IdcardOutlined style={{ color: colors.primary }} />
            <span>Kişisel Bilgiler</span>
          </Space>
        }
        subtitle="Temel kimlik ve kişisel bilgileriniz"
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered size="small">
          <Descriptions.Item label="Ad Soyad">
            <strong>{data.fullName}</strong>
          </Descriptions.Item>
          {data.preferredName && (
            <Descriptions.Item label="Tercih Edilen İsim">
              {data.preferredName}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Doğum Tarihi">
            <Space>
              <CalendarOutlined />
              {data.birthDate}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Doğum Yeri">
            {data.birthPlace}
          </Descriptions.Item>
          <Descriptions.Item label="TC Kimlik No">
            <span style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}>
              {data.identityNumber}
            </span>
          </Descriptions.Item>
          {data.age && (
            <Descriptions.Item label="Yaş">
              <Tag color="blue">{data.age}</Tag>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Medeni Durum">
            <Tag icon={<HeartOutlined />} color="magenta">
              {data.maritalStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Uyruk">
            {data.nationality}
          </Descriptions.Item>
          <Descriptions.Item label="Cinsiyet">
            <Space>
              {genderIcon}
              {genderText}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </SectionCard>

      {/* Sağlık ve Askerlik Bilgileri */}
      <SectionCard
        title={
          <Space>
            <IdcardOutlined style={{ color: colors.success }} />
            <span>Sağlık ve Askerlik Bilgileri</span>
          </Space>
        }
        subtitle="Sağlık durumu ve askerlik bilgileriniz"
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered size="small">
          {data.disabilityLevel && (
            <Descriptions.Item label="Engel Derecesi">
              <Tag color={data.disabilityLevel === "Yok" ? "green" : "orange"}>
                {data.disabilityLevel}
              </Tag>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Kan Grubu">
            <Tag color="red">{data.bloodType}</Tag>
          </Descriptions.Item>
          {data.militaryStatus && (
            <Descriptions.Item label="Askerlik Durumu">
              <Tag color="green">{data.militaryStatus}</Tag>
            </Descriptions.Item>
          )}
        </Descriptions>
      </SectionCard>

      {/* Banka Bilgileri */}
      {(data.bankName || data.bankAccountNo || data.ibanNo) && (
        <SectionCard
          title={
            <Space>
              <IdcardOutlined style={{ color: colors.warning }} />
              <span>Banka Bilgileri</span>
            </Space>
          }
          subtitle="Maaş ödemesi için banka hesap bilgileriniz"
        >
          <Descriptions column={{ xs: 1, sm: 2, md: 2 }} bordered size="small">
            {data.bankName && (
              <Descriptions.Item label="Banka Adı">
                <Tag color="blue">{data.bankName}</Tag>
              </Descriptions.Item>
            )}
            {data.bankAccountNo && (
              <Descriptions.Item label="Banka Hesap No">
                <span
                  style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}
                >
                  {data.bankAccountNo}
                </span>
              </Descriptions.Item>
            )}
            {data.ibanNo && (
              <Descriptions.Item label="Iban No" span={2}>
                <span
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                    fontSize: "13px",
                  }}
                >
                  {data.ibanNo}
                </span>
              </Descriptions.Item>
            )}
          </Descriptions>
        </SectionCard>
      )}
    </div>
  );
};
