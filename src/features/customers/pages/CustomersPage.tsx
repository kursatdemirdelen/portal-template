/**
 * Customers List Page - Müşteri Listesi
 *
 * Tüm müşterileri listeler, arama ve filtreleme imkanı sunar.
 *
 * @features
 * - Müşteri listesi (tablo)
 * - Arama ve durum filtresi
 * - Müşteri oluşturma modalı
 * - Detay sayfasına yönlendirme
 * - Düzenleme modalı
 */

import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui";
import {
  CustomerStatsCards,
  CustomerFiltersBar,
  CustomerTable,
  CustomerFormModal,
} from "../ui";
import { useCustomers } from "../hooks/useCustomers";

const CustomersPage: React.FC = () => {
  const {
    customers,
    filteredCustomers,
    filters,
    stats,
    modalVisible,
    editingCustomer,
    form,
    handleFilterChange,
    handleResetFilters,
    handleViewDetail,
    handleEdit,
    handleCreate,
    handleSave,
    handleModalClose,
  } = useCustomers();

  return (
    <PageContainer
      title="Müşteri Listele"
      subtitle="Sistemdeki tüm müşterileri görüntüleyin"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Müşteri Oluştur
        </Button>
      }
    >
      {/* Stats Cards */}
      <CustomerStatsCards stats={stats} />

      {/* Filters */}
      <CustomerFiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        filteredCount={filteredCustomers.length}
        totalCount={customers.length}
      />

      {/* Table */}
      <CustomerTable
        customers={filteredCustomers}
        onView={handleViewDetail}
        onEdit={handleEdit}
      />

      {/* Form Modal */}
      <CustomerFormModal
        open={modalVisible}
        editingCustomer={editingCustomer}
        form={form}
        onSave={handleSave}
        onCancel={handleModalClose}
      />
    </PageContainer>
  );
};

export default CustomersPage;
