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
import { Space, Button, Spin } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui/PageContainer";
import {
  ParameterStatsCards,
  ParameterFiltersBar,
  ParameterTable,
  ParameterFormModal,
} from "../ui";
import { useParameters } from "../hooks/useParameters";

const ParametersPage: React.FC = () => {
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
