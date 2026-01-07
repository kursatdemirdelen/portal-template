/**
 * User Edit Page
 *
 * Kullanıcı düzenleme sayfası.
 * Refactored to use shared UserForm component.
 */

import React, { useEffect, useState } from "react";
import { message, Spin, Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "@/shared/api/userService";
import type { User } from "../model";
import { UserForm } from "../ui";
import { pageActionStyles } from "../ui/shared/userDetailStyles";

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
      <PageContainer title="Kullanıcı Düzenle">
        <div style={pageActionStyles.loadingContainer}>
          <Spin size="large" tip="Kullanıcı bilgileri yükleniyor..." />
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <PageContainer
      title="Kullanıcı Düzenle"
      subtitle={user.name}
      extra={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(`/users/${id}`)}
          >
            Geri
          </Button>
        </Space>
      }
    >
      <UserForm mode="edit" user={user} />
    </PageContainer>
  );
};

export default UserEditPage;
