/**
 * User Form Component
 *
 * Shared form component for creating and editing users.
 * Kullanıcı oluşturma ve düzenleme için paylaşılan form komponenti.
 */

import React from "react";
import { Form, Row, Col, Space, Grid, Button } from "antd";
import type { FormInstance } from "antd";
import { UserAddOutlined, SaveOutlined } from "@ant-design/icons";
import type { User, UserFormData } from "../../model";
import { useUserForm } from "../../hooks/useUserForm";
import {
  IdentitySection,
  OrganizationSection,
  SystemSettingsSection,
} from "./sections";
import { UserFormSidebar } from "./UserFormSidebar";

const { useBreakpoint } = Grid;

interface UserFormProps {
  mode: "create" | "edit";
  user?: User | null;
  onSuccess?: () => void;
  form?: FormInstance;
}

export const UserForm: React.FC<UserFormProps> = ({
  mode,
  user,
  onSuccess,
  form: externalForm,
}) => {
  const screens = useBreakpoint();
  const {
    form: hookForm,
    saving,
    handleSave,
    handleReset,
  } = useUserForm({
    user,
    onSuccess,
  });

  // Use external form if provided, otherwise use form from hook
  const form = (externalForm || hookForm) as FormInstance<UserFormData>;

  // Watch form values for sidebar preview
  const name = Form.useWatch("name", form);
  const email = Form.useWatch("email", form);
  const role = Form.useWatch("role", form);
  const department = Form.useWatch("department", form);

  const isMobile = !screens.md;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSave}
      requiredMark="optional"
    >
      <Row gutter={[16, 16]}>
        {/* Left Column - Form Sections */}
        <Col xs={24} lg={14}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <IdentitySection mode={mode} />
            <OrganizationSection mode={mode} />
            <SystemSettingsSection mode={mode} />

            {/* Submit Button */}
            <div style={{ paddingTop: 8, textAlign: "right" }}>
              <Space>
                {mode === "create" && (
                  <Button onClick={handleReset}>Temizle</Button>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                  icon={
                    mode === "create" ? <UserAddOutlined /> : <SaveOutlined />
                  }
                >
                  {mode === "create"
                    ? "Kullanıcı Oluştur"
                    : "Değişiklikleri Kaydet"}
                </Button>
              </Space>
            </div>
          </Space>
        </Col>

        {/* Right Column - Sidebar (hidden on mobile) */}
        {!isMobile && (
          <Col xs={24} lg={10}>
            <div style={{ position: "sticky", top: 24 }}>
              <UserFormSidebar
                mode={mode}
                name={name}
                email={email}
                role={role}
                department={department}
              />
            </div>
          </Col>
        )}
      </Row>
    </Form>
  );
};
