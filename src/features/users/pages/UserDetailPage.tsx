/**
 * User Detail Page
 *
 * Kullanıcı detay görüntüleme sayfası - Modüler Tasarım
 * Tickets feature'ındaki yaklaşımla tutarlı, yeniden kullanılabilir bileşenler
 */

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Space, Spin, message } from "antd";
import { EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@/shared/ui";
import { userService } from "@/shared/api/userService";
import type { User } from "../model";
import {
  ProfileHeader,
  ContactCards,
  OrganizationInfo,
  ActivityTimeline,
  RolePermissionsCard,
} from "../ui/user-detail";
import {
  mainCardStyles,
  pageActionStyles,
} from "../ui/shared/userDetailStyles";

const UserDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Önce API'den dene
        const response = await userService.getUsers();
        let foundUser = response.data.find((u) => u.id === id);

        // Bulamazsa localStorage'dan bak
        if (!foundUser) {
          const storedUsers = localStorage.getItem("users");
          if (storedUsers) {
            const localUsers = JSON.parse(storedUsers);
            foundUser = localUsers.find((u: User) => u.id === id);
          }
        }

        if (foundUser) {
          setUser(foundUser);
        } else {
          message.error("Kullanıcı bulunamadı");
          navigate("/users");
        }
      } catch {
        message.error("Kullanıcı yüklenirken hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageContainer title="Kullanıcı Detayı">
        <div style={pageActionStyles.loadingContainer}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <PageContainer
      title="Kullanıcı Profili"
      subtitle={user.name}
      extra={
        <Space size="middle">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/users")}
          >
            Geri
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/users/${id}/edit`)}
            style={pageActionStyles.editButton}
          >
            Profili Düzenle
          </Button>
        </Space>
      }
    >
      <Row gutter={[24, 24]}>
        {/* Sol Kolon - Birleşik Profil Kartı */}
        <Col xs={24} lg={14}>
          <Card style={mainCardStyles.card} bodyStyle={mainCardStyles.cardBody}>
            <ProfileHeader user={user} />
            <ContactCards user={user} />
            <OrganizationInfo user={user} />
          </Card>
        </Col>

        {/* Sağ Kolon - Aktivite & Yetkiler */}
        <Col xs={24} lg={10}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <ActivityTimeline user={user} />
            <RolePermissionsCard user={user} />
          </Space>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserDetailPage;
