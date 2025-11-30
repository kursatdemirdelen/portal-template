/**
 * Company Settings Card
 */

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Avatar,
  Space,
  Typography,
  message,
  Divider,
} from "antd";
import {
  Building2,
  Upload as UploadIcon,
  Trash2,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { UploadProps } from "antd";
import {
  colors,
  spacing,
  radius,
  backgrounds,
  borderColors,
} from "@/shared/styles";
import type { CompanyInfo } from "../model/types";

const { Text, Title } = Typography;

interface CompanySettingsCardProps {
  data: CompanyInfo;
  logoUrl: string | null;
  onLogoChange: (url: string | null) => void;
  onSave: (data: Partial<CompanyInfo>) => void;
  minHeight?: number;
}

export const CompanySettingsCard: React.FC<CompanySettingsCardProps> = ({
  data,
  logoUrl,
  onLogoChange,
  onSave,
  minHeight,
}) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleLogoUpload: UploadProps["customRequest"] = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onLogoChange(dataUrl);
      message.success("Logo yüklendi");
    };
    reader.readAsDataURL(file as Blob);
  };

  const handleSave = () => {
    onSave(formData);
    setEditing(false);
    message.success("Şirket bilgileri güncellendi");
  };

  return (
    <Card
      style={{
        borderRadius: radius.lg,
        border: `1px solid ${borderColors.light}`,
        minHeight,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 16,
          background: `${colors.primary}05`,
          borderRadius: radius.lg,
          padding: `${spacing.md}px ${spacing.lg}px`,
          marginBottom: spacing.lg,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.lg,
            background: `${colors.primary}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 2px 8px 0 ${colors.primary}10`,
          }}
        >
          <Building2 size={22} color={colors.primary} />
        </div>
        <div>
          <Title
            level={5}
            style={{ margin: 0, fontWeight: 700, letterSpacing: 0.2 }}
          >
            Şirket Bilgileri
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Logo ve iletişim bilgileri
          </Text>
        </div>
        {/* Düzenle/Kaydet butonu alta taşındı */}
      </div>

      <Row gutter={[24, 24]}>
        {/* Logo Section */}
        <Col xs={24} md={8}>
          <div
            style={{
              textAlign: "center",
              padding: spacing.lg,
              background: backgrounds.neutral100,
              borderRadius: radius.lg,
              border: `1.5px dashed ${borderColors.medium}`,
              transition: "border-color 0.2s",
              position: "relative",
              minHeight: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {logoUrl ? (
              <div>
                <Avatar
                  src={logoUrl}
                  size={90}
                  shape="square"
                  style={{
                    borderRadius: radius.md,
                    marginBottom: spacing.sm,
                    boxShadow: `0 2px 8px 0 ${colors.primary}10`,
                  }}
                />
                <div style={{ marginTop: spacing.sm }}>
                  <Space>
                    <Upload
                      accept="image/*"
                      customRequest={handleLogoUpload}
                      showUploadList={false}
                    >
                      <Button size="small" icon={<UploadIcon size={14} />}>
                        Değiştir
                      </Button>
                    </Upload>
                    <Button
                      size="small"
                      danger
                      icon={<Trash2 size={14} />}
                      onClick={() => onLogoChange(null)}
                    >
                      Kaldır
                    </Button>
                  </Space>
                </div>
              </div>
            ) : (
              <Upload
                accept="image/*"
                customRequest={handleLogoUpload}
                showUploadList={false}
              >
                <div style={{ cursor: "pointer" }}>
                  <Avatar
                    size={90}
                    shape="square"
                    style={{
                      background: backgrounds.neutral50,
                      borderRadius: radius.md,
                      marginBottom: spacing.sm,
                      border: `1.5px solid ${borderColors.medium}`,
                    }}
                  >
                    <UploadIcon size={28} color={colors.textMuted} />
                  </Avatar>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Logo yüklemek için tıklayın
                    </Text>
                  </div>
                </div>
              </Upload>
            )}
          </div>
        </Col>

        {/* Info Section */}
        <Col xs={24} md={16}>
          <Row gutter={[0, 12]}>
            <Col xs={24} md={12}>
              <Text
                type="secondary"
                style={{
                  fontSize: 13,
                  display: "block",
                  marginBottom: 2,
                  fontWeight: 500,
                }}
              >
                Şirket Adı
              </Text>
              {editing ? (
                <Input
                  id="company-name"
                  name="company-name"
                  size="small"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              ) : (
                <Text strong style={{ fontSize: 15 }}>
                  {data.name}
                </Text>
              )}
            </Col>
            <Col xs={24} md={12}>
              <Text
                type="secondary"
                style={{
                  fontSize: 13,
                  display: "block",
                  marginBottom: 2,
                  fontWeight: 500,
                }}
              >
                Kısa Ad
              </Text>
              {editing ? (
                <Input
                  id="company-shortName"
                  name="company-shortName"
                  size="small"
                  value={formData.shortName}
                  onChange={(e) =>
                    setFormData({ ...formData, shortName: e.target.value })
                  }
                />
              ) : (
                <Text strong style={{ fontSize: 15 }}>
                  {data.shortName}
                </Text>
              )}
            </Col>
            <Col xs={24}>
              <Divider style={{ margin: `${spacing.sm}px 0` }} />
            </Col>
            <Col xs={24} md={12}>
              <Space>
                <Globe size={14} color={colors.textSecondary} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Website
                </Text>
              </Space>
              <div style={{ marginTop: 2 }}>
                {editing ? (
                  <Input
                    id="company-website"
                    name="company-website"
                    size="small"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                ) : (
                  <Text style={{ fontSize: 14 }}>{data.website || "-"}</Text>
                )}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Space>
                <Mail size={14} color={colors.textSecondary} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  E-posta
                </Text>
              </Space>
              <div style={{ marginTop: 2 }}>
                {editing ? (
                  <Input
                    id="company-email"
                    name="company-email"
                    size="small"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                ) : (
                  <Text style={{ fontSize: 14 }}>{data.email || "-"}</Text>
                )}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Space>
                <Phone size={14} color={colors.textSecondary} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Telefon
                </Text>
              </Space>
              <div style={{ marginTop: 2 }}>
                {editing ? (
                  <Input
                    id="company-phone"
                    name="company-phone"
                    size="small"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                ) : (
                  <Text style={{ fontSize: 14 }}>{data.phone || "-"}</Text>
                )}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Space>
                <MapPin size={14} color={colors.textSecondary} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Adres
                </Text>
              </Space>
              <div style={{ marginTop: 2 }}>
                {editing ? (
                  <Input
                    id="company-address"
                    name="company-address"
                    size="small"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                ) : (
                  <Text style={{ fontSize: 14 }}>{data.address || "-"}</Text>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Alta sabit Düzenle/Kaydet butonu */}
      <div
        style={{
          width: "100%",
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type={editing ? "primary" : "default"}
          size="large"
          style={{ width: "100%", maxWidth: 220, borderRadius: radius.md }}
          onClick={editing ? handleSave : () => setEditing(true)}
        >
          {editing ? "Kaydet" : "Düzenle"}
        </Button>
      </div>
    </Card>
  );
};

export default CompanySettingsCard;
