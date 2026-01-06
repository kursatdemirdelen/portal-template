/**
 * User Edit Page
 *
 * Kullanıcı düzenleme sayfası.
 */

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  BankOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "@/shared/api/userService";
import type { User, UserRole, UserStatus } from "../model";
import {
  DEPARTMENTS,
  ROLE_LABELS,
  STATUS_LABELS,
  COMPANIES,
  LANGUAGES,
  TIMEZONES,
} from "../ui/constants";

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Form options from constants
  const roles = (Object.keys(ROLE_LABELS) as UserRole[]).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  const statuses = (Object.keys(STATUS_LABELS) as UserStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })
  );

  const departments = DEPARTMENTS.map((d) => ({ label: d, value: d }));

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
          form.setFieldsValue(foundUser);
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
  }, [id, navigate, form]);

  const onFinish = async (values: Partial<User>) => {
    if (!id || !user) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        ...values,
        updatedAt: new Date().toISOString(),
      };

      // localStorage'daki kullanıcıyı güncelle
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const localUsers = JSON.parse(storedUsers);
        const index = localUsers.findIndex((u: User) => u.id === id);
        if (index !== -1) {
          localUsers[index] = updatedUser;
          localStorage.setItem("users", JSON.stringify(localUsers));
        }
      }

      message.success("Kullanıcı başarıyla güncellendi!");
      navigate(`/users/${id}`);
    } catch {
      message.error("Güncelleme başarısız oldu!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer title="Kullanıcı Düzenle">
        <div style={{ textAlign: "center", padding: 50 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <PageContainer title="Kullanıcı Düzenle" subtitle={user.name}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Kimlik ve İletişim Bilgileri */}
              <SectionCard
                title="Kimlik ve İletişim Bilgileri"
                icon={<IdcardOutlined />}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Ad Soyad"
                      name="name"
                      rules={[
                        { required: true, message: "Ad soyad gerekli" },
                        { min: 2, message: "En az 2 karakter girin" },
                      ]}
                    >
                      <Input placeholder="Kullanıcı adı soyadı" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="E-Posta"
                      name="email"
                      rules={[
                        { required: true, message: "E-posta gerekli" },
                        { type: "email", message: "Geçerli e-posta girin" },
                      ]}
                    >
                      <Input
                        placeholder="ornek@sirket.com"
                        prefix={<MailOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Telefon" name="phone">
                      <Input
                        placeholder="+90 5XX XXX XXXX"
                        prefix={<PhoneOutlined />}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Şirket"
                      name="company"
                      rules={[{ required: true, message: "Şirket seçin" }]}
                    >
                      <Select
                        placeholder="Şirket seçiniz"
                        options={[...COMPANIES]}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </SectionCard>

              {/* Organizasyon ve Yetki Bilgileri */}
              <SectionCard
                title="Organizasyon ve Yetki Bilgileri"
                icon={<BankOutlined />}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Şirket"
                      name="company"
                      rules={[{ required: true, message: "Şirket seçin" }]}
                    >
                      <Select
                        placeholder="Şirket seçiniz"
                        options={[...COMPANIES]}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Departman"
                      name="department"
                      rules={[{ required: true, message: "Departman seçin" }]}
                    >
                      <Select
                        placeholder="Departman seçiniz"
                        options={departments}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Kullanıcı Rolü"
                      name="role"
                      rules={[{ required: true, message: "Rol seçin" }]}
                    >
                      <Select
                        placeholder="Rol seçiniz"
                        options={roles}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Hesap Durumu"
                      name="status"
                      rules={[{ required: true, message: "Durum seçin" }]}
                    >
                      <Select
                        placeholder="Durum seçiniz"
                        options={statuses}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </SectionCard>

              {/* Sistem Ayarları */}
              <SectionCard title="Sistem Ayarları" icon={<SettingOutlined />}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Dil"
                      name="language"
                      rules={[{ required: true, message: "Dil seçin" }]}
                    >
                      <Select
                        placeholder="Dil seçiniz"
                        options={[...LANGUAGES]}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Zaman Dilimi"
                      name="timezone"
                      rules={[
                        { required: true, message: "Zaman dilimi seçin" },
                      ]}
                    >
                      <Select
                        placeholder="Zaman dilimi seçiniz"
                        options={[...TIMEZONES]}
                        size="large"
                        showSearch
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </SectionCard>

              {/* Action Buttons */}
              <SectionCard>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Space size="middle">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={saving}
                      icon={<SaveOutlined />}
                      size="large"
                    >
                      Değişiklikleri Kaydet
                    </Button>
                    <Button
                      icon={<ArrowLeftOutlined />}
                      onClick={() => navigate(`/users/${id}`)}
                      size="large"
                    >
                      İptal
                    </Button>
                  </Space>
                </Form.Item>
              </SectionCard>
            </Space>
          </Form>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserEditPage;
