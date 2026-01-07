import React from "react";
import { Row, Col, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import type { User } from "../../model";
import { contactCardStyles } from "../shared/userDetailStyles";
import { colors } from "@/shared/styles";

const { Text } = Typography;

interface ContactCardsProps {
  user: User;
}

export const ContactCards: React.FC<ContactCardsProps> = ({ user }) => {
  return (
    <div style={contactCardStyles.container}>
      <Row gutter={[16, 12]}>
        {/* Email Card */}
        <Col span={24}>
          <div style={contactCardStyles.cardWrapper}>
            <div
              style={contactCardStyles.iconBox(
                `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`
              )}
            >
              <MailOutlined style={contactCardStyles.iconStyle} />
            </div>
            <div style={contactCardStyles.content}>
              <Text type="secondary" style={contactCardStyles.label}>
                E-posta Adresi
              </Text>
              <Text strong copyable style={contactCardStyles.value}>
                {user.email}
              </Text>
            </div>
          </div>
        </Col>

        {/* Phone Card */}
        {user.phone && (
          <Col span={24}>
            <div style={contactCardStyles.cardWrapper}>
              <div
                style={contactCardStyles.iconBox(
                  `linear-gradient(135deg, ${colors.success} 0%, #56ab2f 100%)`
                )}
              >
                <PhoneOutlined style={contactCardStyles.iconStyle} />
              </div>
              <div style={contactCardStyles.content}>
                <Text type="secondary" style={contactCardStyles.label}>
                  Telefon Numarası
                </Text>
                <Text strong copyable style={contactCardStyles.value}>
                  {user.phone}
                </Text>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};
