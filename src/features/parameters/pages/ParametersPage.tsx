/**
 * Parameters Management Page
 *
 * Sistem ayarlarını ve konfigürasyonları yönetme sayfası.
 *
 * @features
 * - Parametre listeleme ve kategori bazlı filtreleme
 * - Parametre oluşturma, düzenleme, silme
 * - Toplu durum değiştirme ve silme
 * - CSV dışa aktarma
 */

import React from "react";
import { Space, Button, Spin, Card, Upload, message, Image } from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { PageContainer } from "@/shared/ui/PageContainer";
import { useAuth } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppStore";
import { setLogoUrl } from "@/shared/store/uiSlice";
import {
  ParameterStatsCards,
  ParameterFiltersBar,
  ParameterTable,
  ParameterFormModal,
} from "../ui";
import { useParameters } from "../hooks/useParameters";

const ParametersPage: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const logoUrl = useAppSelector((s) => s.ui.logoUrl);
  const isAdmin = user?.role === "admin";

  const {
    parameters,
    stats,
    loading,
    isModalOpen,
    editingParameter,
    form,
    searchText,
    statusFilter,
    selectedRowKeys,
    activeTab,
    setSearchText,
    setStatusFilter,
    setSelectedRowKeys,
    handleAdd,
    handleEdit,
    handleDelete,
    handleBulkDelete,
    handleBulkStatusChange,
    handleSave,
    handleModalClose,
    handleExport,
    handleTabChange,
    handleClearSelection,
    loadParameters,
  } = useParameters();

  const handleLogoUpload: UploadProps["customRequest"] = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      dispatch(setLogoUrl(dataUrl));
      message.success("Logo başarıyla yüklendi!");
    };
    reader.readAsDataURL(file as Blob);
  };

  const handleLogoRemove = () => {
    dispatch(setLogoUrl(null));
    message.success("Logo kaldırıldı!");
  };

  return (
    <PageContainer
      title="Sistem Parametreleri"
      subtitle="Sistem ayarlarını ve konfigürasyonları yönetin"
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => loadParameters()}
            loading={loading}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            loading={loading}
          >
            Yeni Parametre
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        {/* Logo Management Card - Admin Only */}
        {isAdmin && (
          <Card
            title="Logo Yönetimi"
            style={{ marginBottom: 16 }}
            extra={
              logoUrl && (
                <Button
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={handleLogoRemove}
                >
                  Logoyu Kaldır
                </Button>
              )
            }
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <p style={{ marginBottom: 8, color: "#666" }}>
                  Sistemde kullanılacak logo görselini yükleyebilirsiniz. Logo
                  sidebar'da görünecektir.
                </p>
                <Upload
                  accept="image/*"
                  customRequest={handleLogoUpload}
                  showUploadList={false}
                  disabled={!isAdmin}
                >
                  <Button icon={<UploadOutlined />}>Logo Yükle</Button>
                </Upload>
              </div>
              {logoUrl && (
                <div>
                  <p style={{ marginBottom: 8, fontWeight: 500 }}>
                    Mevcut Logo:
                  </p>
                  <Image
                    src={logoUrl}
                    alt="Current Logo"
                    style={{
                      maxWidth: 200,
                      maxHeight: 100,
                      border: "1px solid #d9d9d9",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  />
                </div>
              )}
            </Space>
          </Card>
        )}

        {/* Statistics Row */}
        <ParameterStatsCards
          stats={stats}
          selectedCount={selectedRowKeys.length}
        />

        {/* Filter and Actions Toolbar */}
        <ParameterFiltersBar
          searchText={searchText}
          statusFilter={statusFilter}
          selectedCount={selectedRowKeys.length}
          onSearchChange={setSearchText}
          onStatusFilterChange={setStatusFilter}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkDelete={handleBulkDelete}
          onExport={handleExport}
          onClearSelection={handleClearSelection}
        />

        {/* Main Table with Category Tabs */}
        <ParameterTable
          parameters={parameters}
          loading={loading}
          activeTab={activeTab}
          stats={stats}
          selectedRowKeys={selectedRowKeys}
          onTabChange={handleTabChange}
          onSelectionChange={setSelectedRowKeys}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Edit/Create Modal */}
        <ParameterFormModal
          open={isModalOpen}
          editingParameter={editingParameter}
          form={form}
          onSave={handleSave}
          onCancel={handleModalClose}
        />
      </Spin>
    </PageContainer>
  );
};

export default ParametersPage;
