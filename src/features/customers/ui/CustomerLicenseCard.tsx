import {
  Card,
  Typography,
  Tag,
  Space,
  Row,
  Col,
  Progress,
  Divider,
  Tooltip,
  Button,
  message,
} from "antd";
import {
  SafetyCertificateOutlined,
  CrownOutlined,
  CalendarOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { backgrounds, borderColors, colors, shadows } from "@/shared/styles";
import type { LicenseInfo } from "../model/types";
import {
  LICENSE_TYPE_LABELS,
  LICENSE_TYPE_COLORS,
  LICENSE_STATUS_LABELS,
  LICENSE_STATUS_COLORS,
} from "./constants";
import dayjs from "dayjs";

const { Text } = Typography;

interface CustomerLicenseCardProps {
  license?: LicenseInfo;
}

const cardStyle = {
  borderRadius: 12,
  boxShadow: shadows.sm,
};

export const CustomerLicenseCard = ({ license }: CustomerLicenseCardProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success(`${label} kopyalandı`);
  };

  const getLicenseDaysRemaining = () => {
    if (!license) return 0;
    const endDate = dayjs(license.endDate);
    const today = dayjs();
    return Math.max(0, endDate.diff(today, "day"));
  };

  const getLicenseProgress = () => {
    if (!license) return 0;
    const startDate = dayjs(license.startDate);
    const endDate = dayjs(license.endDate);
    const today = dayjs();
    const totalDays = endDate.diff(startDate, "day");
    const passedDays = today.diff(startDate, "day");
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100));
  };

  const daysRemaining = getLicenseDaysRemaining();
  const licenseProgress = getLicenseProgress();

  return (
    <Card
      title={
        <Space>
          <SafetyCertificateOutlined style={{ color: colors.accent }} />
          <span>Lisans Bilgileri</span>
        </Space>
      }
      size="small"
      style={cardStyle}
    >
      {license ? (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          {/* Lisans Tipi - Merkezi */}
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <Tag
              color={LICENSE_TYPE_COLORS[license.type]}
              style={{
                fontSize: 15,
                padding: "8px 24px",
                borderRadius: 20,
              }}
            >
              <CrownOutlined style={{ marginRight: 8 }} />
              {LICENSE_TYPE_LABELS[license.type]}
            </Tag>
          </div>

          <Divider style={{ margin: "4px 0" }} />

          {/* Süre Durumu */}
          <div>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 10 }}
            >
              <Col>
                <Text type="secondary">Kullanım Süresi</Text>
              </Col>
              <Col>
                <Text
                  strong
                  style={{
                    color: daysRemaining < 30 ? colors.error : colors.success,
                    fontSize: 14,
                  }}
                >
                  {daysRemaining} gün kaldı
                </Text>
              </Col>
            </Row>
            <Progress
              percent={Math.round(licenseProgress)}
              strokeColor={
                licenseProgress > 80
                  ? colors.error
                  : licenseProgress > 60
                  ? colors.warning
                  : colors.success
              }
              showInfo={false}
            />
          </div>

          <Divider style={{ margin: "4px 0" }} />

          {/* Tarihler */}
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <div
                style={{
                  background: backgrounds.successBg,
                  borderRadius: 8,
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <CalendarOutlined
                  style={{ color: colors.success, fontSize: 16 }}
                />
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block", marginTop: 4 }}
                >
                  Başlangıç
                </Text>
                <Text strong style={{ fontSize: 14 }}>
                  {dayjs(license.startDate).format("DD.MM.YYYY")}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  background: backgrounds.errorBg,
                  borderRadius: 8,
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <CalendarOutlined
                  style={{ color: colors.error, fontSize: 16 }}
                />
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: "block", marginTop: 4 }}
                >
                  Bitiş
                </Text>
                <Text strong style={{ fontSize: 14 }}>
                  {dayjs(license.endDate).format("DD.MM.YYYY")}
                </Text>
              </div>
            </Col>
          </Row>

          <Divider style={{ margin: "4px 0" }} />

          {/* Lisans Durumu */}
          <Row justify="space-between" align="middle">
            <Col>
              <Text type="secondary">Durum</Text>
            </Col>
            <Col>
              <Tag
                color={LICENSE_STATUS_COLORS[license.status]}
                style={{ margin: 0, fontSize: 13 }}
              >
                {LICENSE_STATUS_LABELS[license.status]}
              </Tag>
            </Col>
          </Row>

          {/* Lisans Anahtarı */}
          <div
            style={{
              background: backgrounds.neutral50,
              borderRadius: 8,
              padding: "12px 14px",
              border: `1px solid ${borderColors.neutral}`,
            }}
          >
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 6 }}
            >
              Lisans Anahtarı
            </Text>
            <Row justify="space-between" align="middle">
              <Col>
                <Text code style={{ fontSize: 13 }}>
                  {license.key}
                </Text>
              </Col>
              <Col>
                <Tooltip title="Kopyala">
                  <CopyOutlined
                    style={{
                      cursor: "pointer",
                      color: colors.info,
                      fontSize: 14,
                    }}
                    onClick={() =>
                      copyToClipboard(license.key, "Lisans anahtarı")
                    }
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        </Space>
      ) : (
        <div style={{ textAlign: "center", padding: 40 }}>
          <SafetyCertificateOutlined
            style={{ fontSize: 48, color: colors.textMuted }}
          />
          <div style={{ marginTop: 16 }}>
            <Text type="secondary">Lisans bilgisi yok</Text>
          </div>
          <Button type="primary" style={{ marginTop: 16 }}>
            Lisans Ekle
          </Button>
        </div>
      )}
    </Card>
  );
};
