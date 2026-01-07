import React from "react";
import { Card, Space, Typography, Timeline } from "antd";
import {
  ClockCircleOutlined,
  FireOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { User } from "../../model";
import { activityStyles } from "../shared/userDetailStyles";
import { colors } from "@/shared/styles";

const { Title, Text } = Typography;

interface ActivityTimelineProps {
  user: User;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ user }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Bilgi yok";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string | undefined) => {
    if (!dateString) return "Bilgi yok";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card
      title={
        <Space size="middle">
          <div
            style={activityStyles.iconBox(
              `linear-gradient(135deg, ${colors.warning} 0%, #f093fb 100%)`,
              colors.warning
            )}
          >
            <ClockCircleOutlined style={activityStyles.iconStyle} />
          </div>
          <div>
            <Title level={5} style={activityStyles.timelineTitle}>
              Aktivite Geçmişi
            </Title>
            <Text type="secondary" style={activityStyles.subtitle}>
              Kullanıcı etkileşim zaman çizelgesi
            </Text>
          </div>
        </Space>
      }
      style={activityStyles.card}
    >
      <Timeline
        mode="left"
        items={[
          {
            dot: (
              <div
                style={activityStyles.iconBox(
                  `linear-gradient(135deg, ${colors.success} 0%, #56ab2f 100%)`,
                  colors.success
                )}
              >
                <FireOutlined style={activityStyles.timelineDotIcon} />
              </div>
            ),
            children: (
              <div style={activityStyles.timelineContent}>
                <Text strong style={activityStyles.timelineTitle}>
                  Son Giriş
                </Text>
                <Text type="secondary" style={activityStyles.timelineDate}>
                  {user.lastLogin
                    ? formatDate(user.lastLogin)
                    : "Henüz giriş yapılmadı"}
                </Text>
              </div>
            ),
          },
          {
            dot: (
              <div
                style={activityStyles.iconBox(
                  `linear-gradient(135deg, ${colors.primary} 0%, #667eea 100%)`,
                  colors.primary
                )}
              >
                <EditOutlined style={activityStyles.timelineDotIcon} />
              </div>
            ),
            children: (
              <div style={activityStyles.timelineContent}>
                <Text strong style={activityStyles.timelineTitle}>
                  Son Güncelleme
                </Text>
                <Text type="secondary" style={activityStyles.timelineDate}>
                  {formatDateShort(user.updatedAt)}
                </Text>
              </div>
            ),
          },
          {
            dot: (
              <div
                style={activityStyles.iconBox(
                  `linear-gradient(135deg, ${colors.info} 0%, #4facfe 100%)`,
                  colors.info
                )}
              >
                <CalendarOutlined style={activityStyles.timelineDotIcon} />
              </div>
            ),
            children: (
              <div style={activityStyles.timelineContent}>
                <Text strong style={activityStyles.timelineTitle}>
                  Kayıt Tarihi
                </Text>
                <Text type="secondary" style={activityStyles.timelineDate}>
                  {formatDateShort(user.createdAt)}
                </Text>
              </div>
            ),
          },
        ]}
      />
    </Card>
  );
};
