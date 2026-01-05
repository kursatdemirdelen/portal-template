import React from "react";
import { Tag, Space, Typography, Row, Col, Badge, Divider } from "antd";
import {
  SafetyCertificateOutlined,
  TrophyOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { SectionCard, EmptyState } from "@/shared/ui";
import { spacing } from "@/shared/styles";

const { Text } = Typography;

interface Certification {
  certificateNo: string; // Sertifika No
  name: string; // Sertifika Adı
  issuer: string; // Alınan Kurum
  issueDate: string; // Alınma Tarihi
  expiryDate?: string; // Geçerlilik Tarihi
  score?: string; // Sertifika/Sınav Notu
}

interface Course {
  name: string;
  provider: string;
  completionDate: string;
  duration: string;
  certificate?: boolean;
}

interface CertificationsData {
  certifications: Certification[];
  courses?: Course[];
}

interface CertificationsTabProps {
  data: CertificationsData;
}

export const CertificationsTab: React.FC<CertificationsTabProps> = ({
  data,
}) => {
  const getStatus = (expiryDate?: string) => {
    if (!expiryDate)
      return {
        text: "Belirsiz",
        color: "#6b7280",
        bgColor: "rgba(107, 114, 128, 0.1)",
      };

    const expiry = new Date(expiryDate.split(".").reverse().join("-"));
    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    if (expiry < now) {
      return {
        text: "Süresi Doldu",
        color: "#ef4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
      };
    } else if (expiry < threeMonthsLater) {
      return {
        text: "Süresi Dolmak Üzere",
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)",
      };
    } else {
      return {
        text: "Aktif",
        color: "#10b981",
        bgColor: "rgba(16, 185, 129, 0.1)",
      };
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl }}>
      {/* Sertifikalar */}
      <SectionCard
        title={
          <Space>
            <SafetyCertificateOutlined />
            <span>Profesyonel Sertifikalar</span>
            <Badge
              count={data.certifications.length}
              style={{ backgroundColor: "#5b7aed" }}
            />
          </Space>
        }
        subtitle="Sahip olduğunuz profesyonel sertifikalar ve yeterlilikler"
      >
        {!data.certifications || data.certifications.length === 0 ? (
          <EmptyState
            title="Henüz sertifika eklenmemiş"
            description="Profesyonel sertifikalarınızı ekleyerek uzmanlığınızı gösterin."
            actionText="Sertifika Ekle"
            actionDisabled={true}
            compact={true}
          />
        ) : (
          <Row gutter={[16, 16]}>
            {data.certifications.map((cert, index) => {
              const status = getStatus(cert.expiryDate);

              return (
                <Col key={index} xs={24} md={12}>
                  <div
                    style={{
                      padding: spacing.lg,
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: 12,
                      borderLeft: `4px solid ${status.color}`,
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
                        <Space align="start">
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 10,
                              background: status.bgColor,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: status.color,
                              fontSize: 20,
                            }}
                          >
                            <SafetyCertificateOutlined />
                          </div>
                          <div>
                            <Text
                              strong
                              style={{ fontSize: 16, display: "block" }}
                            >
                              {cert.name}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 13 }}>
                              {cert.issuer}
                            </Text>
                          </div>
                        </Space>
                      </div>
                      <Tag
                        style={{
                          color: status.color,
                          background: status.bgColor,
                          border: `1px solid ${status.color}`,
                          fontWeight: 600,
                          borderRadius: 20,
                          padding: "4px 12px",
                        }}
                      >
                        {status.text}
                      </Tag>
                    </div>

                    <Divider style={{ margin: `${spacing.sm}px 0` }} />

                    {/* Meta */}
                    <Space
                      direction="vertical"
                      size={spacing.xs}
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Sertifika No:
                        </Text>
                        <Text
                          strong
                          style={{ fontSize: 12, fontFamily: "monospace" }}
                        >
                          {cert.certificateNo}
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Alınma Tarihi:
                        </Text>
                        <Space size={4}>
                          <CalendarOutlined
                            style={{ fontSize: 11, color: "#5b7aed" }}
                          />
                          <Text style={{ fontSize: 12 }}>{cert.issueDate}</Text>
                        </Space>
                      </div>
                      {cert.expiryDate && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Geçerlilik:
                          </Text>
                          <Space size={4}>
                            <CalendarOutlined
                              style={{ fontSize: 11, color: "#f59e0b" }}
                            />
                            <Text style={{ fontSize: 12 }}>
                              {cert.expiryDate}
                            </Text>
                          </Space>
                        </div>
                      )}
                      {cert.score && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Sertifika/Sınav Notu:
                          </Text>
                          <Tag
                            icon={<TrophyOutlined />}
                            style={{
                              color: "#10b981",
                              background: "rgba(16, 185, 129, 0.1)",
                              border: "1px solid #10b981",
                              fontSize: 11,
                            }}
                          >
                            {cert.score}
                          </Tag>
                        </div>
                      )}
                    </Space>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </SectionCard>

      {/* Eğitimler / Kurslar */}
      {data.courses && data.courses.length > 0 && (
        <SectionCard
          title={
            <Space>
              <TrophyOutlined />
              <span>Tamamlanan Eğitimler</span>
              <Badge
                count={data.courses.length}
                style={{ backgroundColor: "#f59e0b" }}
              />
            </Space>
          }
          subtitle="Katıldığınız eğitim ve sertifika programları"
        >
          {!data.courses || data.courses.length === 0 ? (
            <EmptyState
              title="Henüz eğitim/kurs eklenmemiş"
              description="Tamamladığınız eğitim ve kursları ekleyerek gelişiminizi gösterin."
              actionText="Eğitim Ekle"
              actionDisabled={true}
              compact={true}
            />
          ) : (
            <Row gutter={[16, 16]}>
              {data.courses.map((course, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                  <div
                    style={{
                      padding: spacing.md,
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #fffbf0 100%)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                      borderRadius: 10,
                      borderLeft: course.certificate
                        ? "4px solid #10b981"
                        : "4px solid #e2e8f0",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: spacing.sm,
                        marginBottom: spacing.sm,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: course.certificate
                            ? "rgba(16, 185, 129, 0.1)"
                            : "rgba(0,0,0,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: course.certificate ? "#10b981" : "#94a3b8",
                          fontSize: 16,
                        }}
                      >
                        <TrophyOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ display: "block", fontSize: 14 }}>
                          {course.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {course.provider}
                        </Text>
                      </div>
                    </div>

                    <Space
                      direction="vertical"
                      size={4}
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <CalendarOutlined /> {course.completionDate}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {course.duration}
                        </Text>
                      </div>
                      {course.certificate && (
                        <Tag
                          icon={<CheckCircleOutlined />}
                          style={{
                            color: "#10b981",
                            background: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid #10b981",
                            fontSize: 11,
                          }}
                        >
                          Sertifikalı
                        </Tag>
                      )}
                    </Space>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </SectionCard>
      )}
    </div>
  );
};
