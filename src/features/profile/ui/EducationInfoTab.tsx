import React from "react";
import { Tag, Space, Typography, Timeline, Row, Col, Badge } from "antd";
import {
  ReadOutlined,
  TrophyOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { SectionCard, EmptyState } from "@/shared/ui";
import { colors, spacing } from "@/shared/styles";

const { Text } = Typography;

interface Education {
  level: string; // Tamamlanan Eğitim
  school: string; // Okul
  department?: string; // Bölüm
  scholarshipType?: string; // Burs Tipi
  grade?: string; // Ortalama
  startDate: string; // Başlangıç Tarihi
  graduationDate?: string; // Mezuniyet Tarihi (null ise devam ediyor)
}

interface EducationInfoData {
  educations: Education[];
}

interface EducationInfoTabProps {
  data: EducationInfoData;
}

const levelOrder: Record<string, number> = {
  Doktora: 1,
  "Yüksek Lisans": 2,
  Lisans: 3,
  "Ön Lisans": 4,
  Lise: 5,
  "Orta Öğretim": 6,
  "İlk Öğretim": 7,
};

const levelConfig: Record<string, { color: string; bgColor: string }> = {
  Doktora: { color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)" },
  "Yüksek Lisans": { color: "#5b7aed", bgColor: "rgba(91, 122, 237, 0.1)" },
  Lisans: { color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.1)" },
  "Ön Lisans": { color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)" },
  Lise: { color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)" },
};

export const EducationInfoTab: React.FC<EducationInfoTabProps> = ({ data }) => {
  if (!data.educations || data.educations.length === 0) {
    return (
      <SectionCard
        title={
          <Space>
            <ReadOutlined />
            <span>Eğitim Bilgilerim</span>
          </Space>
        }
        subtitle="Eğitim geçmişinizin detaylı görünümü"
      >
        <EmptyState
          title="Henüz eğitim bilgisi eklenmemiş"
          description="Eğitim geçmişinizi ekleyerek profilinizi tamamlayın."
          actionText="Eğitim Ekle"
          actionDisabled={true}
          compact={true}
        />
      </SectionCard>
    );
  }

  const sortedEducations = [...data.educations].sort(
    (a, b) => (levelOrder[a.level] || 99) - (levelOrder[b.level] || 99)
  );

  return (
    <SectionCard
      title={
        <Space>
          <ReadOutlined />
          <span>Eğitim Bilgilerim</span>
          <Badge
            count={data.educations.length}
            style={{ backgroundColor: "#5b7aed" }}
          />
        </Space>
      }
      subtitle="Eğitim geçmişinizin detaylı görünümü"
    >
      <Row gutter={[24, 24]}>
        {/* Timeline View */}
        <Col xs={24} lg={10}>
          <div
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
              padding: spacing.lg,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <Space style={{ marginBottom: spacing.md }}>
              <CalendarOutlined style={{ color: colors.primary }} />
              <Text strong>Zaman Çizelgesi</Text>
            </Space>
            <Timeline
              mode="left"
              items={sortedEducations.map((edu) => {
                const isOngoing = !edu.graduationDate;
                return {
                  color: isOngoing ? colors.warning : colors.success,
                  label: (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {edu.startDate} - {edu.graduationDate || "Devam Ediyor"}
                    </Text>
                  ),
                  children: (
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 4 }}
                      >
                        {edu.school}
                      </Text>
                      {edu.department && (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {edu.department}
                        </Text>
                      )}
                    </div>
                  ),
                };
              })}
            />
          </div>
        </Col>

        {/* Card View */}
        <Col xs={24} lg={14}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.md,
            }}
          >
            {sortedEducations.map((edu, index) => {
              const levelCfg = levelConfig[edu.level] || {
                color: colors.info,
                bgColor: "rgba(59, 130, 246, 0.1)",
              };

              return (
                <div
                  key={index}
                  style={{
                    padding: spacing.lg,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 12,
                    borderLeft: `4px solid ${levelCfg.color}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: spacing.sm,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Space>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: levelCfg.bgColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: levelCfg.color,
                            fontSize: 18,
                          }}
                        >
                          <ReadOutlined />
                        </div>
                        <div>
                          <Tag
                            style={{
                              color: levelCfg.color,
                              background: levelCfg.bgColor,
                              border: `1px solid ${levelCfg.color}`,
                              fontWeight: 600,
                              marginBottom: 4,
                            }}
                          >
                            {edu.level}
                          </Tag>
                          <Text
                            strong
                            style={{ display: "block", fontSize: 15 }}
                          >
                            {edu.school}
                          </Text>
                        </div>
                      </Space>
                    </div>
                    <Tag
                      style={{
                        color: edu.graduationDate
                          ? colors.success
                          : colors.warning,
                        background: edu.graduationDate
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(245, 158, 11, 0.1)",
                        border: `1px solid ${
                          edu.graduationDate ? colors.success : colors.warning
                        }`,
                        fontWeight: 500,
                      }}
                    >
                      {edu.graduationDate ? "Mezun" : "Devam Ediyor"}
                    </Tag>
                  </div>

                  {/* Details */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.xs,
                      paddingLeft: 56,
                    }}
                  >
                    {edu.department && (
                      <Space>
                        <EnvironmentOutlined
                          style={{ color: colors.primary }}
                        />
                        <Text type="secondary">{edu.department}</Text>
                      </Space>
                    )}
                    <Space>
                      <CalendarOutlined style={{ color: colors.warning }} />
                      <Text type="secondary">
                        {edu.startDate} - {edu.graduationDate || "Devam Ediyor"}
                      </Text>
                    </Space>
                    {edu.scholarshipType && (
                      <Space>
                        <TrophyOutlined style={{ color: "#5b7aed" }} />
                        <Text type="secondary">
                          Burs: {edu.scholarshipType}
                        </Text>
                      </Space>
                    )}
                    {edu.grade && (
                      <Space>
                        <TrophyOutlined style={{ color: colors.warning }} />
                        <Text strong style={{ color: colors.warning }}>
                          Ortalama: {edu.grade}
                        </Text>
                      </Space>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </SectionCard>
  );
};
