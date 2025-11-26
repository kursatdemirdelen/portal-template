/**
 * useParameters Hook
 * 
 * Parametreler sayfası için state ve işlemleri yöneten hook.
 */

import React, { useState, useEffect, useCallback } from "react";
import { Form, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getParameters,
  createParameter,
  updateParameter,
  deleteParameter,
  bulkUpdateParameters,
  getParameterStats,
  exportParametersToCSV,
} from "@/shared/api/parameterService";
import type {
  Parameter,
  ParameterCategory,
  ParameterStatus,
  ParameterStats,
} from "../model/types";

export const useParameters = () => {
  // State management
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [stats, setStats] = useState<ParameterStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParameter, setEditingParameter] = useState<Parameter | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<ParameterStatus | "all">("all");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeTab, setActiveTab] = useState<ParameterCategory>("system");

  // Load functions
  const loadParameters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getParameters({
        category: activeTab,
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchText,
      });
      setParameters(response.data);
    } catch {
      message.error("Parametreler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [activeTab, statusFilter, searchText]);

  const loadStats = useCallback(async () => {
    try {
      const result = await getParameterStats();
      setStats(result);
    } catch (error) {
      console.error("İstatistikler yüklenemedi:", error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadParameters();
    loadStats();
  }, [loadParameters, loadStats]);

  // Handlers
  const handleAdd = useCallback(() => {
    form.resetFields();
    setEditingParameter(null);
    setIsModalOpen(true);
  }, [form]);

  const handleEdit = useCallback((record: Parameter) => {
    form.setFieldsValue({
      key: record.key,
      value: record.value,
      description: record.description,
      category: record.category,
      type: record.type,
      status: record.status,
    });
    setEditingParameter(record);
    setIsModalOpen(true);
  }, [form]);

  const handleDelete = useCallback((id: string) => {
    Modal.confirm({
      title: "Parametreyi Sil",
      icon: <ExclamationCircleOutlined />,
      content:
        "Bu parametreyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
      okText: "Sil",
      cancelText: "İptal",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          setLoading(true);
          await deleteParameter(id);
          message.success("Parametre başarıyla silindi");
          await loadParameters();
          await loadStats();
        } catch {
          message.error("Parametre silinemedi");
        } finally {
          setLoading(false);
        }
      },
    });
  }, [loadParameters, loadStats]);

  const handleBulkDelete = useCallback(() => {
    Modal.confirm({
      title: "Seçili Parametreleri Sil",
      icon: <ExclamationCircleOutlined />,
      content: `${selectedRowKeys.length} parametre silinecektir. Devam etmek istiyor musunuz?`,
      okText: "Sil",
      cancelText: "İptal",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          setLoading(true);
          for (const id of selectedRowKeys) {
            await deleteParameter(id as string);
          }
          message.success(`${selectedRowKeys.length} parametre başarıyla silindi`);
          setSelectedRowKeys([]);
          await loadParameters();
          await loadStats();
        } catch {
          message.error("Parametreler silinemedi");
        } finally {
          setLoading(false);
        }
      },
    });
  }, [selectedRowKeys, loadParameters, loadStats]);

  const handleBulkStatusChange = useCallback(async (status: ParameterStatus) => {
    try {
      setLoading(true);
      await bulkUpdateParameters({
        ids: selectedRowKeys as string[],
        status,
      });
      message.success(`${selectedRowKeys.length} parametrenin durumu güncellendi`);
      setSelectedRowKeys([]);
      await loadParameters();
      await loadStats();
    } catch {
      message.error("Parametreler güncellenemedi");
    } finally {
      setLoading(false);
    }
  }, [selectedRowKeys, loadParameters, loadStats]);

  const handleSave = useCallback(async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);

      if (editingParameter) {
        await updateParameter({
          id: editingParameter.id,
          ...values,
        });
        message.success("Parametre başarıyla güncellendi");
      } else {
        await createParameter(values);
        message.success("Parametre başarıyla oluşturuldu");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingParameter(null);
      await loadParameters();
      await loadStats();
    } catch (error) {
      if (error instanceof Error && error.message.includes("Argument")) {
        return;
      }
      message.error("İşlem başarısız oldu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [form, editingParameter, loadParameters, loadStats]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingParameter(null);
  }, [form]);

  const handleExport = useCallback(async () => {
    try {
      setLoading(true);
      const dataToExport =
        selectedRowKeys.length > 0
          ? parameters.filter((p) => selectedRowKeys.includes(p.id))
          : parameters;

      const csv = await exportParametersToCSV(dataToExport);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `parameters-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      message.success("Parametreler başarıyla dışa aktarıldı");
    } catch {
      message.error("Dışa aktarma başarısız oldu");
    } finally {
      setLoading(false);
    }
  }, [selectedRowKeys, parameters]);

  const handleTabChange = useCallback((tab: ParameterCategory) => {
    setActiveTab(tab);
    setSelectedRowKeys([]);
    setSearchText("");
    setStatusFilter("all");
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedRowKeys([]);
  }, []);

  return {
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
  };
};
