import React from "react";
import { Tag, Space, Typography, Descriptions, Row, Col } from "antd";
import {
  TeamOutlined,
  HeartOutlined,
  PhoneOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { SectionCard, EmptyState } from "@/shared/ui";
import { spacing } from "@/shared/styles";

const { Text } = Typography;

interface FamilyMember {
  firstName: string;
  lastName: string;
  relation: string;
  phone?: string;
  birthDate: string;
  identityNo: string;
}

interface FamilyInfoData {
  maritalStatus: string;
  spouseName?: string;
  spouseOccupation?: string;
  numberOfChildren?: number;
  familyMembers: FamilyMember[];
}

interface FamilyInfoTabProps {
  data: FamilyInfoData;
}

const relationConfig: Record<string, { color: string; bgColor: string }> = {
  Eş: { color: "#5b7aed", bgColor: "rgba(91, 122, 237, 0.1)" },
  Anne: { color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.1)" },
  Baba: { color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.1)" },
  Çocuk: { color: "#10b981", bgColor: "rgba(16, 185, 129, 0.1)" },
  Kardeş: { color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.1)" },
  Diğer: { color: "#6b7280", bgColor: "rgba(107, 114, 128, 0.1)" },
};

export const FamilyInfoTab: React.FC<FamilyInfoTabProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl }}>
      {/* Aile Durumu Özeti */}
      <SectionCard
        title={
          <Space>
            <HeartOutlined />
            <span>Aile Durumu</span>
          </Space>
        }
        subtitle="Medeni durumunuz ve aile bilgileriniz"
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 2 }} bordered size="small">
          <Descriptions.Item label="Medeni Durum" span={1}>
            <Tag
              style={{
                color: "#5b7aed",
                background: "rgba(91, 122, 237, 0.1)",
                border: "1px solid #5b7aed",
                fontWeight: 600,
              }}
            >
              {data.maritalStatus}
            </Tag>
          </Descriptions.Item>
          {data.numberOfChildren !== undefined && (
            <Descriptions.Item label="Çocuk Sayısı" span={1}>
              <Tag
                style={{
                  color: "#10b981",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid #10b981",
                  fontWeight: 600,
                }}
              >
                {data.numberOfChildren}
              </Tag>
            </Descriptions.Item>
          )}
          {data.spouseName && (
            <Descriptions.Item label="Eş Adı" span={1}>
              <Text strong>{data.spouseName}</Text>
            </Descriptions.Item>
          )}
          {data.spouseOccupation && (
            <Descriptions.Item label="Eş Mesleği" span={1}>
              {data.spouseOccupation}
            </Descriptions.Item>
          )}
        </Descriptions>
      </SectionCard>

      {/* Aile Üyeleri */}
      <SectionCard
        title={
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing.xs }}
          >
            <TeamOutlined />
            <span>Aile Üyeleri</span>
            <Tag color="blue">{data.familyMembers.length}</Tag>
          </div>
        }
        subtitle="Aile bireylerinizin detaylı bilgileri"
      >
        {!data.familyMembers || data.familyMembers.length === 0 ? (
          <EmptyState
            title="Henüz aile üyesi eklenmemiş"
            description="Aile bireylerinizin bilgilerini ekleyerek profilinizi tamamlayın."
            actionText="Aile Üyesi Ekle"
            actionDisabled={true}
            compact={true}
          />
        ) : (
          <Row gutter={[16, 16]}>
            {data.familyMembers.map((member, index) => {
              const relationCfg =
                relationConfig[member.relation] || relationConfig["Diğer"];

              return (
                <Col key={index} xs={24} sm={12} lg={8}>
                  <div
                    style={{
                      padding: spacing.lg,
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: 12,
                      borderLeft: `4px solid ${relationCfg.color}`,
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: spacing.md,
                        marginBottom: spacing.lg,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${relationCfg.color} 0%, ${relationCfg.color}dd 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        <TeamOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ display: "block", fontSize: 16 }}>
                          {member.firstName} {member.lastName}
                        </Text>
                        <Tag
                          style={{
                            color: relationCfg.color,
                            background: relationCfg.bgColor,
                            border: `1px solid ${relationCfg.color}`,
                            fontWeight: 500,
                            fontSize: 11,
                            marginTop: 4,
                          }}
                        >
                          {member.relation}
                        </Tag>
                      </div>
                    </div>

                    {/* Details */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: spacing.sm,
                      }}
                    >
                      {member.phone && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: spacing.xs,
                          }}
                        >
                          <PhoneOutlined style={{ color: "#5b7aed" }} />
                          <Text type="secondary" style={{ fontSize: 13 }}>
                            Telefon:
                          </Text>
                          <Text strong style={{ fontSize: 13 }}>
                            {member.phone}
                          </Text>
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: spacing.xs,
                        }}
                      >
                        <CalendarOutlined style={{ color: "#10b981" }} />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          Doğum Tarihi:
                        </Text>
                        <Text strong style={{ fontSize: 13 }}>
                          {member.birthDate}
                        </Text>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: spacing.xs,
                        }}
                      >
                        <IdcardOutlined style={{ color: "#3b82f6" }} />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          TC Kimlik No:
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: 13,
                            fontFamily: "monospace",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {member.identityNo}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </SectionCard>
    </div>
  );
};
