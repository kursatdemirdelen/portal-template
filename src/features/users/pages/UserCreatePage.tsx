/**
 * User Create Page
 *
 * Yeni kullanıcı oluşturma sayfası.
 * Refactored to use shared UserForm component.
 */

import React from "react";
import { Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/shared/ui";
import { UserForm } from "../ui";

const UserCreatePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Kullanıcı Oluştur"
      subtitle="Yeni kullanıcı ekleyin"
      extra={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/users")}
          >
            Geri
          </Button>
        </Space>
      }
    >
      <UserForm mode="create" />
    </PageContainer>
  );
};

export default UserCreatePage;
