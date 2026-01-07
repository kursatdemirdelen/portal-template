import React from "react";
import { Space, Row, Col, Typography, Divider } from "antd";
import {
  BankOutlined,
  GlobalOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import type { User } from "../../model";
import {
  organizationStyles,
  contactCardStyles,
} from "../shared/userDetailStyles";

const { Text } = Typography;

interface OrganizationInfoProps {
  user: User;
}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = ({ user }) => {
  return (
    <div style={{ padding: `0 ${20}px ${20}px` }}>
      <Divider style={contactCardStyles.divider} />

      <Space
        direction="vertical"
        size={16}
        style={organizationStyles.container}
      >
        {/* Organization Section */}
        <div>
          <Text type="secondary" style={organizationStyles.sectionLabel}>
            <BankOutlined /> ORGANİZASYON
          </Text>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>
                <Text type="secondary" style={organizationStyles.fieldLabel}>
                  Şirket
                </Text>
                <Text strong style={organizationStyles.fieldValue}>
                  {user.company || "—"}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <Text type="secondary" style={organizationStyles.fieldLabel}>
                  Departman
                </Text>
                <Text strong style={organizationStyles.fieldValue}>
                  {user.department || "—"}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Regional Settings */}
        <div>
          <Text type="secondary" style={organizationStyles.sectionLabel}>
            <GlobalOutlined /> BÖLGESEL AYARLAR
          </Text>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>
                <Text type="secondary" style={organizationStyles.fieldLabel}>
                  Dil
                </Text>
                <Text strong style={organizationStyles.fieldValue}>
                  {user.language === "tr"
                    ? "🇹🇷 Türkçe"
                    : user.language === "en"
                    ? "🇬🇧 English"
                    : user.language || "—"}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <Text type="secondary" style={organizationStyles.fieldLabel}>
                  Zaman Dilimi
                </Text>
                <Text strong style={organizationStyles.fieldValue}>
                  {user.timezone || "UTC+3"}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* System Info */}
        <div>
          <Text type="secondary" style={organizationStyles.sectionLabel}>
            <SafetyOutlined /> SİSTEM BİLGİLERİ
          </Text>
          <div style={organizationStyles.systemInfoBox}>
            <Text type="secondary" style={organizationStyles.systemInfoLabel}>
              Kullanıcı ID
            </Text>
            <br />
            <Text code copyable style={organizationStyles.systemInfoValue}>
              {user.id}
            </Text>
          </div>
        </div>
      </Space>
    </div>
  );
};
