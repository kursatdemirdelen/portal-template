import React from "react";
import { Descriptions, Tag, Timeline, Space, Typography } from "antd";
import {
  BankOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { SectionCard, EmptyState } from "@/shared/ui";
import { colors, spacing, radius } from "@/shared/styles";

const { Text } = Typography;

interface WorkExperience {
  company: string;
  task: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
}

interface WorkInfoData {
  id: string;
  otherId?: string;
  occupationCode: string;
  startDate: string;
  tenure?: string;
  hiringSource?: string;
  endDate?: string;
  terminationReason?: string;
  employmentStatus: string;
  salaryType?: string;
  location?: string;
  department?: string;
  serviceArea?: string;
  jobTitle: string;
  level?: string;
  manager?: string;
  workExperience?: WorkExperience[];
}

interface WorkInfoTabProps {
  data: WorkInfoData;
}

export const WorkInfoTab: React.FC<WorkInfoTabProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl }}>
      {/* Güncel İş Bilgileri */}
      <SectionCard
        title={
          <Space>
            <BankOutlined style={{ color: colors.primary }} />
            <span>Güncel İş Bilgileri</span>
          </Space>
        }
        subtitle="Mevcut pozisyon ve iş detaylarınız"
      >
        <Descriptions
          column={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="ID">
            <Text strong style={{ fontFamily: "monospace" }}>
              {data.id}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Diğer ID">
            <Text strong style={{ fontFamily: "monospace" }}>
              {data.otherId || "-"}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Meslek Adı/Kodu">
            <Tag color="blue">{data.occupationCode}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Başlama Tarihi">
            <Space>
              <CalendarOutlined style={{ color: colors.success }} />
              <Text strong>{data.startDate}</Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Kıdem">
            <Tag color="green" icon={<TrophyOutlined />}>
              {data.tenure || "-"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="İşe Alma Kaynağı">
            <Text>{data.hiringSource || "-"}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Ayrılış Tarihi">
            <Space>
              <CalendarOutlined style={{ color: colors.error }} />
              <Text>{data.endDate || "-"}</Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Ayrılma Nedeni">
            <Text>{data.terminationReason || "-"}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Çalışma Durumu">
            <Tag color="cyan">{data.employmentStatus}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Ücret Türü">
            <Tag color="gold" icon={<DollarOutlined />}>
              {data.salaryType || "-"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Konum">
            <Text>{data.location || "-"}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Bölüm">
            <Space>
              <TeamOutlined style={{ color: colors.primary }} />
              <Text strong>{data.department || "-"}</Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Hizmet Alanı">
            <Tag color="purple">{data.serviceArea || "-"}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="İş Ünvanı">
            <Tag color="geekblue">{data.jobTitle}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Seviye">
            <Tag color="magenta">Seviye {data.level || "-"}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Yönetici">
            <Text strong>{data.manager || "-"}</Text>
          </Descriptions.Item>
        </Descriptions>
      </SectionCard>

      {/* İş Deneyimlerim */}
      {data.workExperience && data.workExperience.length > 0 && (
        <SectionCard
          title={
            <Space>
              <TrophyOutlined style={{ color: colors.warning }} />
              <span>İş Deneyimlerim</span>
            </Space>
          }
          subtitle="Geçmiş iş deneyimleriniz ve pozisyonlarınız"
        >
          {!data.workExperience || data.workExperience.length === 0 ? (
            <EmptyState
              title="Henüz iş deneyimi eklenmemiş"
              description="Geçmiş iş deneyimlerinizi ekleyerek kariyerinizi gösterin."
              actionText="İş Deneyimi Ekle"
              actionDisabled={true}
              compact={true}
            />
          ) : (
            <Timeline
              mode="left"
              items={data.workExperience.map((item) => {
                const isCurrent =
                  !item.endDate || item.endDate === "Devam Ediyor";
                return {
                  color: isCurrent ? colors.success : colors.info,
                  label: (
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      {item.startDate} - {item.endDate || "Devam Ediyor"}
                    </Text>
                  ),
                  children: (
                    <div
                      style={{
                        padding: spacing.md,
                        background:
                          "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                        borderRadius: radius.md,
                        border: `1px solid ${colors.border}`,
                        borderLeft: `4px solid ${
                          isCurrent ? colors.success : colors.info
                        }`,
                      }}
                    >
                      <Text
                        strong
                        style={{
                          fontSize: "15px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {item.company}
                      </Text>
                      <div style={{ marginBottom: "4px" }}>
                        <Tag color="blue">{item.jobTitle}</Tag>
                        {isCurrent && <Tag color="green">Devam Ediyor</Tag>}
                      </div>
                      <Text type="secondary" style={{ fontSize: "13px" }}>
                        {item.task}
                      </Text>
                    </div>
                  ),
                };
              })}
            />
          )}
        </SectionCard>
      )}
    </div>
  );
};
