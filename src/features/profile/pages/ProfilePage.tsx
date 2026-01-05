import React, { useState, lazy, Suspense } from "react";
import { Tabs, Col, Row, Descriptions, Space, Spin } from "antd";
import {
  UserOutlined,
  BankOutlined,
  PhoneOutlined,
  ReadOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { PageContainer, SectionCard } from "@/shared/ui";
import { spacing } from "@/shared/styles";
import { ProfileHeader } from "../ui";
import {
  mockProfileData,
  mockSimpleProfileData,
  mockAdminProfileData,
} from "../model/profileMockData";

// Lazy load tab components for better performance
const ProfileDetailTab = lazy(() =>
  import("../ui/ProfileDetailTab").then((module) => ({
    default: module.ProfileDetailTab,
  }))
);
const WorkInfoTab = lazy(() =>
  import("../ui/WorkInfoTab").then((module) => ({
    default: module.WorkInfoTab,
  }))
);
const ContactInfoTab = lazy(() =>
  import("../ui/ContactInfoTab").then((module) => ({
    default: module.ContactInfoTab,
  }))
);
const EducationInfoTab = lazy(() =>
  import("../ui/EducationInfoTab").then((module) => ({
    default: module.EducationInfoTab,
  }))
);
const LanguageInfoTab = lazy(() =>
  import("../ui/LanguageInfoTab").then((module) => ({
    default: module.LanguageInfoTab,
  }))
);
const CertificationsTab = lazy(() =>
  import("../ui/CertificationsTab").then((module) => ({
    default: module.CertificationsTab,
  }))
);
const FamilyInfoTab = lazy(() =>
  import("../ui/FamilyInfoTab").then((module) => ({
    default: module.FamilyInfoTab,
  }))
);

type UserRole = "admin" | "worker" | "user";

/**
 * User rolü için sade profil
 */
const SimpleProfile: React.FC = () => {
  const data = mockSimpleProfileData;

  return (
    <PageContainer title="Profil" subtitle="Hesap bilgilerinizi görüntüleyin">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <ProfileHeader
            name={data.summary.name}
            title={data.summary.title}
            initials={data.summary.initials}
            role={data.summary.role}
            location={data.summary.location}
          />
        </Col>

        <Col xs={24} lg={16}>
          <SectionCard title="İletişim Bilgileri">
            <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
              <Descriptions.Item
                label={
                  <Space>
                    <PhoneOutlined />
                    Telefon
                  </Space>
                }
              >
                {data.contactInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <PhoneOutlined />
                    Cep Telefonu
                  </Space>
                }
              >
                {data.contactInfo.mobile}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <MailOutlined />
                    E-posta
                  </Space>
                }
              >
                {data.contactInfo.email}
              </Descriptions.Item>
            </Descriptions>
          </SectionCard>

          <SectionCard title="Adres" style={{ marginTop: spacing.lg }}>
            {data.contactInfo.addresses.map((addr, idx) => (
              <Descriptions
                key={idx}
                column={{ xs: 1, sm: 2 }}
                bordered
                size="small"
              >
                <Descriptions.Item label="Adres Tipi">
                  {addr.type}
                </Descriptions.Item>
                <Descriptions.Item label="İl / İlçe">
                  {addr.city} / {addr.district}
                </Descriptions.Item>
                <Descriptions.Item label="Tam Adres" span={2}>
                  {addr.address}
                </Descriptions.Item>
              </Descriptions>
            ))}
          </SectionCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

/**
 * Admin / Worker için zengin profil (sekmeli)
 */
const RichProfile: React.FC<{ role: "admin" | "worker" }> = ({ role }) => {
  const [activeTab, setActiveTab] = useState("detail");

  // Role'e göre mock data seç
  const data = role === "admin" ? mockAdminProfileData : mockProfileData;

  const tabItems = [
    {
      key: "detail",
      label: (
        <Space>
          <UserOutlined />
          <span>Profil Detayı</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <ProfileDetailTab data={data.detail} />
        </Suspense>
      ),
    },
    {
      key: "work",
      label: (
        <Space>
          <BankOutlined />
          <span>İş Bilgilerim</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <WorkInfoTab data={data.workInfo} />
        </Suspense>
      ),
    },
    {
      key: "contact",
      label: (
        <Space>
          <PhoneOutlined />
          <span>İletişim Bilgilerim</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <ContactInfoTab data={data.contactInfo} />
        </Suspense>
      ),
    },
    {
      key: "education",
      label: (
        <Space>
          <ReadOutlined />
          <span>Eğitim Bilgilerim</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <EducationInfoTab data={data.educationInfo} />
        </Suspense>
      ),
    },
    {
      key: "language",
      label: (
        <Space>
          <GlobalOutlined />
          <span>Dil Bilgilerim</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <LanguageInfoTab data={data.languageInfo} />
        </Suspense>
      ),
    },
    {
      key: "certifications",
      label: (
        <Space>
          <SafetyCertificateOutlined />
          <span>Eğitim ve Sertifikalarım</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <CertificationsTab data={data.certifications} />
        </Suspense>
      ),
    },
    {
      key: "family",
      label: (
        <Space>
          <TeamOutlined />
          <span>Aile Bilgilerim</span>
        </Space>
      ),
      children: (
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          }
        >
          <FamilyInfoTab data={data.familyInfo} />
        </Suspense>
      ),
    },
  ];

  return (
    <PageContainer
      title="Profil"
      subtitle="Tüm kişisel ve iş bilgilerinizi yönetin"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <ProfileHeader
            name={data.summary.name}
            title={data.summary.title}
            avatar={data.summary.avatar}
            initials={data.summary.initials}
            role={data.summary.role}
            department={data.summary.department}
            location={data.summary.location}
            timezone={data.summary.timezone}
          />
        </Col>

        <Col xs={24}>
          <SectionCard>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="large"
              tabPosition="top"
              animated={{ inkBar: true, tabPane: true }}
              style={{ marginTop: -spacing.md }}
            />
          </SectionCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

/**
 * Ana Profil - Role-based Render
 */
const ProfilePage: React.FC = () => {
  // localStorage'dan user rolü al
  const userRoleStr = localStorage.getItem("userRole") || "worker";
  const userRole = userRoleStr as UserRole;

  // Admin ve Worker'lar zengin versiyonu görür
  if (userRole === "admin" || userRole === "worker") {
    return <RichProfile role={userRole} />;
  }

  // Regular user'lar sade versiyonu görür
  return <SimpleProfile />;
};

export default ProfilePage;
