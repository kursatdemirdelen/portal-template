import React from "react";
import { Tag, Space, Typography, Progress, Row, Col, Badge } from "antd";
import { GlobalOutlined, StarFilled } from "@ant-design/icons";
import { SectionCard, EmptyState } from "@/shared/ui";
import { spacing } from "@/shared/styles";

const { Text } = Typography;

interface Language {
  name: string; // Yabancı Dil Bilgisi
  level: "Ana Dil" | "İleri" | "Orta" | "Başlangıç";
  reading?: number; // Okuma
  writing?: number; // Yazma
  speaking?: number; // Konuşma
  certificate?: string; // Belge/Sertifika
}

interface LanguageInfoData {
  languages: Language[];
}

interface LanguageInfoTabProps {
  data: LanguageInfoData;
}

const levelConfig: Record<
  string,
  { color: string; bgColor: string; stars: number }
> = {
  "Ana Dil": {
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    stars: 5,
  },
  İleri: { color: "#5b7aed", bgColor: "rgba(91, 122, 237, 0.1)", stars: 4 },
  Orta: { color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)", stars: 3 },
  Başlangıç: {
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    stars: 2,
  },
};

const skillColors = {
  reading: "#5b7aed",
  writing: "#10b981",
  speaking: "#f59e0b",
};

export const LanguageInfoTab: React.FC<LanguageInfoTabProps> = ({ data }) => {
  if (!data.languages || data.languages.length === 0) {
    return (
      <SectionCard
        title={
          <Space>
            <GlobalOutlined />
            <span>Dil Yetenekleri</span>
          </Space>
        }
        subtitle="Bildirdiğiniz yabancı dil yetkinlikleri"
      >
        <EmptyState
          title="Henüz dil bilgisi eklenmemiş"
          description="Yabancı dil yeteneklerinizi ekleyerek profilinizi zenginleştirin."
          actionText="Dil Ekle"
          actionDisabled={true}
          compact={true}
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title={
        <Space>
          <GlobalOutlined />
          <span>Dil Yetenekleri</span>
          <Badge
            count={data.languages.length}
            style={{ backgroundColor: "#5b7aed" }}
          />
        </Space>
      }
      subtitle="Bildirdiğiniz yabancı dil yetkinlikleri"
    >
      <Row gutter={[16, 16]}>
        {data.languages.map((lang, index) => {
          const config = levelConfig[lang.level] || levelConfig.Orta;
          const hasSkills =
            lang.reading || lang.writing || lang.speaking || lang.certificate;

          return (
            <Col key={index} xs={24} sm={12} lg={8}>
              <div
                style={{
                  padding: spacing.lg,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 12,
                  borderLeft: `4px solid ${config.color}`,
                  transition: "all 0.3s ease",
                  height: "100%",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: spacing.md,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Space>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: config.bgColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: config.color,
                          fontSize: 18,
                        }}
                      >
                        <GlobalOutlined />
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 16, display: "block" }}>
                          {lang.name}
                        </Text>
                        <div style={{ marginTop: 4 }}>
                          {[...Array(5)].map((_, i) => (
                            <StarFilled
                              key={i}
                              style={{
                                fontSize: 12,
                                color:
                                  i < config.stars ? config.color : "#e2e8f0",
                                marginRight: 2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </Space>
                  </div>
                  <Tag
                    style={{
                      color: config.color,
                      background: config.bgColor,
                      border: `1px solid ${config.color}`,
                      fontWeight: 600,
                      borderRadius: 20,
                      padding: "2px 12px",
                    }}
                  >
                    {lang.level}
                  </Tag>
                </div>

                {/* Skills */}
                {hasSkills && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: spacing.sm,
                    }}
                  >
                    {lang.reading !== undefined && (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 4,
                          }}
                        >
                          <Text
                            type="secondary"
                            style={{ fontSize: 12, fontWeight: 500 }}
                          >
                            Okuma
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: skillColors.reading,
                            }}
                          >
                            {lang.reading}%
                          </Text>
                        </div>
                        <Progress
                          percent={lang.reading}
                          size="small"
                          strokeColor={skillColors.reading}
                          showInfo={false}
                        />
                      </div>
                    )}
                    {lang.writing !== undefined && (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 4,
                          }}
                        >
                          <Text
                            type="secondary"
                            style={{ fontSize: 12, fontWeight: 500 }}
                          >
                            Yazma
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: skillColors.writing,
                            }}
                          >
                            {lang.writing}%
                          </Text>
                        </div>
                        <Progress
                          percent={lang.writing}
                          size="small"
                          strokeColor={skillColors.writing}
                          showInfo={false}
                        />
                      </div>
                    )}
                    {lang.speaking !== undefined && (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 4,
                          }}
                        >
                          <Text
                            type="secondary"
                            style={{ fontSize: 12, fontWeight: 500 }}
                          >
                            Konuşma
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: skillColors.speaking,
                            }}
                          >
                            {lang.speaking}%
                          </Text>
                        </div>
                        <Progress
                          percent={lang.speaking}
                          size="small"
                          strokeColor={skillColors.speaking}
                          showInfo={false}
                        />
                      </div>
                    )}
                    {lang.certificate && (
                      <div
                        style={{
                          marginTop: spacing.sm,
                          padding: spacing.sm,
                          background: "rgba(16, 185, 129, 0.05)",
                          border: "1px solid rgba(16, 185, 129, 0.2)",
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          type="secondary"
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          Belge/Sertifika
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#10b981",
                          }}
                        >
                          {lang.certificate}
                        </Text>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </SectionCard>
  );
};
