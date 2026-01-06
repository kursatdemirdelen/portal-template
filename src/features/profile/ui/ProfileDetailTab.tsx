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
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label="Ad Soyad" span={1}>
            <strong>{data.fullName}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Doğum Tarihi" span={1}>
            <Space>
              <CalendarOutlined />
              {data.birthDate}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Doğum Yeri" span={1}>
            {data.birthPlace}
          </Descriptions.Item>
          <Descriptions.Item label="TC Kimlik No" span={1}>
            <span style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}>
              {data.identityNumber}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Medeni Durum" span={1}>
            <Tag icon={<HeartOutlined />} color="magenta">
              {data.maritalStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Uyruk" span={1}>
            {data.nationality}
          </Descriptions.Item>
          <Descriptions.Item label="Cinsiyet" span={1}>
            <Space>
              {genderIcon}
              {genderText}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Tercih Edilen İsim" span={1}>
            {data.preferredName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Yaş" span={1}>
            {data.age ? <Tag color="blue">{data.age}</Tag> : "-"}
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
        <Descriptions column={{ xs: 1, sm: 1, md: 3 }} bordered size="small">
          <Descriptions.Item label="Kan Grubu" span={1}>
            <Tag color="red">{data.bloodType}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Engel Derecesi" span={1}>
            {data.disabilityLevel ? (
              <Tag color={data.disabilityLevel === "Yok" ? "green" : "orange"}>
                {data.disabilityLevel}
              </Tag>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Askerlik Durumu" span={1}>
            {data.militaryStatus ? (
              <Tag color="green">{data.militaryStatus}</Tag>
            ) : (
              "-"
            )}
          </Descriptions.Item>
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
          <Descriptions column={{ xs: 1, sm: 1 }} bordered size="small">
            <Descriptions.Item label="Banka Adı" span={1}>
              {data.bankName ? <Tag color="blue">{data.bankName}</Tag> : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Banka Hesap No" span={1}>
              {data.bankAccountNo ? (
                <span
                  style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}
                >
                  {data.bankAccountNo}
                </span>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Iban No" span={1}>
              {data.ibanNo ? (
                <span
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                    fontSize: "13px",
                  }}
                >
                  {data.ibanNo}
                </span>
              ) : (
                "-"
              )}
            </Descriptions.Item>
          </Descriptions>
        </SectionCard>
      )}
    </div>
  );
};
