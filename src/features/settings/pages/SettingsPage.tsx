/**
 * Settings Page
 *
 * Kompakt ve responsive ayarlar sayfası.
 * Büyük ekranlarda kartlar yan yana, küçük ekranlarda alt alta görünür.
 */

import React, { useState } from "react";
import { Row, Col, Button, Space, message, Segmented } from "antd";
import { Save, RotateCcw, Building2, Clock } from "lucide-react";
import { PageContainer } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import { setLogoUrl } from "@/shared/store/uiSlice";
import { useAuth } from "@/features/auth";
import { spacing } from "@/shared/styles";
import {
  CompanySettingsCard,
  NotificationSettingsCard,
  SLASettingsCard,
  TicketSettingsCard,
  WorkHoursSettingsCard,
  ThemeSettingsCard,
  SecuritySettingsCard,
} from "../ui";
import type {
  CompanyInfo,
  NotificationSettings,
  SLASettings,
  TicketSettings,
  WorkHoursSettings,
  ThemeSettings,
  SecuritySettings,
} from "../model/types";
import {
  defaultCompanyInfo,
  defaultNotificationSettings,
  defaultSLASettings,
  defaultTicketSettings,
  defaultWorkHoursSettings,
  defaultThemeSettings,
  defaultSecuritySettings,
} from "../model/mockData";

type SettingsView = "all" | "general" | "system";

const CARD_HEIGHTS = {
  company: 340,
  theme: 340,
  notifications: 200,
  sla: 320,
  tickets: 340,
  workHours: 340,
  security: 220,
};

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const logoUrl = useAppSelector((s) => s.ui.logoUrl);
  const isAdmin = user?.role === "admin";

  // State for all settings
  const [companyInfo, setCompanyInfo] =
    useState<CompanyInfo>(defaultCompanyInfo);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(defaultNotificationSettings);
  const [slaSettings, setSlaSettings] =
    useState<SLASettings>(defaultSLASettings);
  const [ticketSettings, setTicketSettings] = useState<TicketSettings>(
    defaultTicketSettings
  );
  const [workHoursSettings, setWorkHoursSettings] = useState<WorkHoursSettings>(
    defaultWorkHoursSettings
  );
  const [themeSettings, setThemeSettings] =
    useState<ThemeSettings>(defaultThemeSettings);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(
    defaultSecuritySettings
  );

  const [hasChanges, setHasChanges] = useState(false);
  const [view, setView] = useState<SettingsView>("all");

  // Handlers
  const handleLogoChange = (url: string | null) => {
    dispatch(setLogoUrl(url));
    setHasChanges(true);
  };

  const handleCompanySave = (data: Partial<CompanyInfo>) => {
    setCompanyInfo({ ...companyInfo, ...data });
    setHasChanges(true);
  };

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: unknown
  ) => {
    setNotificationSettings({ ...notificationSettings, [key]: value });
    setHasChanges(true);
  };

  const handleSLAChange = (key: keyof SLASettings, value: unknown) => {
    setSlaSettings({ ...slaSettings, [key]: value });
    setHasChanges(true);
  };

  const handleTicketChange = (key: keyof TicketSettings, value: unknown) => {
    setTicketSettings({ ...ticketSettings, [key]: value });
    setHasChanges(true);
  };

  const handleWorkHoursChange = (
    key: keyof WorkHoursSettings,
    value: unknown
  ) => {
    setWorkHoursSettings({ ...workHoursSettings, [key]: value });
    setHasChanges(true);
  };

  const handleThemeChange = (key: keyof ThemeSettings, value: unknown) => {
    setThemeSettings({ ...themeSettings, [key]: value });
    setHasChanges(true);
  };

  const handleSecurityChange = (
    key: keyof SecuritySettings,
    value: unknown
  ) => {
    setSecuritySettings({ ...securitySettings, [key]: value });
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    message.success("Tüm ayarlar kaydedildi");
    setHasChanges(false);
  };

  const handleReset = () => {
    setCompanyInfo(defaultCompanyInfo);
    setNotificationSettings(defaultNotificationSettings);
    setSlaSettings(defaultSLASettings);
    setTicketSettings(defaultTicketSettings);
    setWorkHoursSettings(defaultWorkHoursSettings);
    setThemeSettings(defaultThemeSettings);
    setSecuritySettings(defaultSecuritySettings);
    setHasChanges(false);
    message.info("Ayarlar sıfırlandı");
  };

  const renderGeneralCards = () => (
    <Row gutter={[spacing.lg, spacing.lg]}>
      {/* SOL KOLON — THEME SETTINGS */}
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <ThemeSettingsCard
          data={themeSettings}
          onChange={handleThemeChange}
          minHeight={CARD_HEIGHTS.theme}
        />
      </Col>

      {/* SAĞ KOLON — COMPANY + NOTIFICATION + WORK HOURS */}
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <Space direction="vertical" size={spacing.lg} style={{ width: "100%" }}>
          <CompanySettingsCard
            data={companyInfo}
            logoUrl={logoUrl}
            onLogoChange={handleLogoChange}
            onSave={handleCompanySave}
            minHeight={CARD_HEIGHTS.company}
          />

          <NotificationSettingsCard
            data={notificationSettings}
            onChange={handleNotificationChange}
            minHeight={CARD_HEIGHTS.notifications}
          />
        </Space>
      </Col>
    </Row>
  );

  const renderSystemCards = () => (
    <Row gutter={[spacing.lg, spacing.lg]}>
      {/* SLA SETTINGS → TAM genişlik */}
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
        <SLASettingsCard
          data={slaSettings}
          onChange={handleSLAChange}
          minHeight={CARD_HEIGHTS.sla}
        />
      </Col>

      {/* TICKET SETTINGS → yarım genişlik */}
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
        <TicketSettingsCard
          data={ticketSettings}
          onChange={handleTicketChange}
          minHeight={CARD_HEIGHTS.tickets}
        />
      </Col>
      {/* WORK HOURS SETTINGS → 12 genişlik */}
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <WorkHoursSettingsCard
          data={workHoursSettings}
          onChange={handleWorkHoursChange}
          minHeight={CARD_HEIGHTS.workHours}
        />
      </Col>
      {/* SECURITY SETTINGS → yarım genişlik (sadece admin) */}
      {isAdmin && (
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <SecuritySettingsCard
            data={securitySettings}
            onChange={handleSecurityChange}
            minHeight={CARD_HEIGHTS.security}
          />
        </Col>
      )}
    </Row>
  );

  return (
    <PageContainer
      title="Ayarlar"
      subtitle="Sistem ve uygulama konfigürasyonlarını yönetin"
      extra={
        <Space>
          {hasChanges && (
            <Button icon={<RotateCcw size={16} />} onClick={handleReset}>
              Sıfırla
            </Button>
          )}
          <Button
            type="primary"
            icon={<Save size={16} />}
            onClick={handleSaveAll}
            disabled={!hasChanges}
          >
            Tümünü Kaydet
          </Button>
        </Space>
      }
    >
      {/* View Switcher */}
      <div style={{ marginBottom: spacing.lg }}>
        <Segmented
          value={view}
          onChange={(v) => setView(v as SettingsView)}
          options={[
            {
              value: "all",
              label: "Tümü",
            },
            {
              value: "general",
              icon: <Building2 size={14} />,
              label: "Genel",
            },
            {
              value: "system",
              icon: <Clock size={14} />,
              label: "Sistem",
            },
          ]}
          size="large"
        />
      </div>

      {/* Cards Grid */}
      {view === "all" && (
        <>
          {renderGeneralCards()}
          <div style={{ height: spacing.lg }} />
          {renderSystemCards()}
        </>
      )}
      {view === "general" && renderGeneralCards()}
      {view === "system" && renderSystemCards()}
    </PageContainer>
  );
};

export default SettingsPage;
