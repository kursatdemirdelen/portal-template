import React, { useState, useEffect } from "react";
import {
  Table,
  Tabs,
  Button,
  Space,
  Input,
  Select,
  Modal,
  Form,
  Tag,
  Row,
  Col,
  Statistic,
  Spin,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  ClearOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette } from "@/shared/styles/styleConstants";
import {
  getParameters,
  createParameter,
  updateParameter,
  deleteParameter,
  bulkUpdateParameters,
  getParameterStats,
  exportParametersToCSV,
} from "@/shared/api/parameterService";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_DESCRIPTIONS,
  TYPE_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../ui/constants";
import type {
  Parameter,
  ParameterCategory,
  ParameterStatus,
  ParameterStats as ParameterStatsType,
} from "../model/types";

const ParametersPage: React.FC = () => {
  // State management
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [stats, setStats] = useState<ParameterStatsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParameter, setEditingParameter] = useState<Parameter | null>(
    null
  );
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<ParameterStatus | "all">(
    "all"
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeTab, setActiveTab] = useState<ParameterCategory>("system");

  // Fetch parameters on mount and when filters change
  useEffect(() => {
    loadParameters();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadParameters = async () => {
    setLoading(true);
    try {
      const response = await getParameters({
        category: activeTab,
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchText,
      });
      setParameters(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      message.error("Parametreler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await getParameterStats();
      setStats(result);
    } catch (error) {
      console.error("İstatistikler yüklenemedi:", error);
    }
  };

  // Refresh on filter/search change
  useEffect(() => {
    loadParameters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, statusFilter, searchText]);

  const handleAdd = () => {
    form.resetFields();
    setEditingParameter(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Parameter) => {
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
  };

  const handleDelete = (id: string) => {
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
  };

  const handleBulkDelete = () => {
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
          message.success(
            `${selectedRowKeys.length} parametre başarıyla silindi`
          );
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
  };

  const handleBulkStatusChange = async (status: ParameterStatus) => {
    try {
      setLoading(true);
      await bulkUpdateParameters({
        ids: selectedRowKeys as string[],
        status,
      });
      message.success(
        `${selectedRowKeys.length} parametrenin durumu güncellendi`
      );
      setSelectedRowKeys([]);
      await loadParameters();
      await loadStats();
    } catch {
      message.error("Parametreler güncellenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
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
      // Error handling for form validation and API calls
      if (error instanceof Error && error.message.includes("Argument")) {
        return; // Form validation error, ignore
      }
      message.error("İşlem başarısız oldu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
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
  };

  const columns = [
    {
      title: "Anahtar",
      dataIndex: "key",
      key: "key",
      width: 160,
      render: (key: string) => (
        <code
          style={{
            backgroundColor: "#f5f5f5",
            padding: "2px 6px",
            borderRadius: 3,
          }}
        >
          {key}
        </code>
      ),
    },
    {
      title: "Değer",
      dataIndex: "value",
      key: "value",
      width: 140,
      render: (value: string) => (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: colorPalette.textMuted,
          }}
        >
          {value.length > 30 ? `${value.substring(0, 30)}...` : value}
        </span>
      ),
      tooltip: (record: Parameter) => record.value,
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (category: ParameterCategory) => (
        <Tag color={CATEGORY_COLORS[category]}>{CATEGORY_LABELS[category]}</Tag>
      ),
    },
    {
      title: "Tip",
      dataIndex: "type",
      key: "type",
      width: 90,
      render: (type: string) => <Tag>{TYPE_LABELS[type] || type}</Tag>,
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (status: ParameterStatus) => (
        <Tag color={STATUS_COLORS[status]}>{STATUS_LABELS[status]}</Tag>
      ),
    },
    {
      title: "Son Güncelleme",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 120,
    },
    {
      title: "İşlemler",
      key: "actions",
      width: 100,
      fixed: "right" as const,
      render: (_unknown: unknown, record: Parameter) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Düzenle"
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            title="Sil"
            danger
          />
        </Space>
      ),
    },
  ];

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
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <Statistic title="Toplam" value={stats?.total || 0} />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Aktif"
              value={stats?.active || 0}
              valueStyle={{ color: colorPalette.success }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="İnaktif"
              value={stats?.inactive || 0}
              valueStyle={{ color: colorPalette.secondary }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Seçili"
              value={selectedRowKeys.length}
              valueStyle={{ color: colorPalette.primary }}
            />
          </Col>
        </Row>

        {/* Filter and Actions Toolbar */}
        <SectionCard variant="default" style={{ marginBottom: 20 }}>
          <Space style={{ marginBottom: 16 }} wrap size="middle">
            <Input.Search
              placeholder="Anahtar, değer veya açıklama ile ara..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 280 }}
              allowClear
            />

            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 140 }}
            >
              <Select.Option value="all">Tüm Durumlar</Select.Option>
              <Select.Option value="active">Aktif</Select.Option>
              <Select.Option value="inactive">İnaktif</Select.Option>
            </Select>

            {selectedRowKeys.length > 0 && (
              <>
                <Button icon={<DownloadOutlined />} onClick={handleExport}>
                  Dışa Aktar ({selectedRowKeys.length})
                </Button>

                <Select
                  placeholder="Durum Değiştir"
                  style={{ width: 150 }}
                  onChange={(status) =>
                    handleBulkStatusChange(status as ParameterStatus)
                  }
                >
                  <Select.Option value="active">Aktif Yap</Select.Option>
                  <Select.Option value="inactive">İnaktif Yap</Select.Option>
                </Select>

                <Button danger onClick={handleBulkDelete}>
                  Sil ({selectedRowKeys.length})
                </Button>

                <Button
                  type="text"
                  icon={<ClearOutlined />}
                  onClick={() => setSelectedRowKeys([])}
                >
                  Temizle
                </Button>
              </>
            )}
          </Space>
        </SectionCard>

        {/* Main Table with Category Tabs */}
        <SectionCard variant="default">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key as ParameterCategory);
              setSelectedRowKeys([]);
              setSearchText("");
              setStatusFilter("all");
            }}
            items={[
              {
                label: (
                  <span>
                    Sistem{" "}
                    <Tag color={CATEGORY_COLORS.system}>
                      {stats?.byCategory.system || 0}
                    </Tag>
                  </span>
                ),
                key: "system",
              },
              {
                label: (
                  <span>
                    Bildirim{" "}
                    <Tag color={CATEGORY_COLORS.notification}>
                      {stats?.byCategory.notification || 0}
                    </Tag>
                  </span>
                ),
                key: "notification",
              },
              {
                label: (
                  <span>
                    SLA{" "}
                    <Tag color={CATEGORY_COLORS.sla}>
                      {stats?.byCategory.sla || 0}
                    </Tag>
                  </span>
                ),
                key: "sla",
              },
              {
                label: (
                  <span>
                    Bilet{" "}
                    <Tag color={CATEGORY_COLORS.ticket}>
                      {stats?.byCategory.ticket || 0}
                    </Tag>
                  </span>
                ),
                key: "ticket",
              },
            ]}
          />

          <div style={{ marginTop: 16, marginBottom: 12 }}>
            <p
              style={{ fontSize: 12, color: colorPalette.textMuted, margin: 0 }}
            >
              {CATEGORY_DESCRIPTIONS[activeTab]}
            </p>
          </div>

          <Table
            columns={columns}
            dataSource={parameters}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 1400 }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            loading={loading}
          />
        </SectionCard>

        {/* Edit/Create Modal */}
        <Modal
          title={
            editingParameter ? "Parametreyi Düzenle" : "Yeni Parametre Ekle"
          }
          open={isModalOpen}
          onOk={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
            setEditingParameter(null);
          }}
          okText={editingParameter ? "Güncelle" : "Oluştur"}
          cancelText="İptal"
          width={600}
        >
          <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
            <Form.Item
              label="Anahtar (Key)"
              name="key"
              rules={[
                { required: true, message: "Anahtar gerekli" },
                {
                  pattern: /^[a-z_]+$/,
                  message: "Sadece küçük harfler ve alt çizgi kullanın",
                },
              ]}
            >
              <Input
                placeholder="örn. max_ticket_priority"
                disabled={!!editingParameter}
              />
            </Form.Item>

            <Form.Item
              label="Değer"
              name="value"
              rules={[{ required: true, message: "Değer gerekli" }]}
            >
              <Input.TextArea placeholder="Parametre değerini girin" rows={3} />
            </Form.Item>

            <Form.Item
              label="Açıklama"
              name="description"
              rules={[{ required: true, message: "Açıklama gerekli" }]}
            >
              <Input.TextArea
                placeholder="Parametrenin ne işe yaradığını açıklayın"
                rows={2}
              />
            </Form.Item>

            <Form.Item
              label="Kategori"
              name="category"
              rules={[{ required: true, message: "Kategori gerekli" }]}
            >
              <Select placeholder="Kategori seçin">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <Select.Option key={key} value={key}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Veri Tipi"
              name="type"
              rules={[{ required: true, message: "Veri tipi gerekli" }]}
            >
              <Select placeholder="Veri tipi seçin">
                {Object.entries(TYPE_LABELS).map(([key, label]) => (
                  <Select.Option key={key} value={key}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {editingParameter && (
              <Form.Item
                label="Durum"
                name="status"
                rules={[{ required: true, message: "Durum gerekli" }]}
                initialValue="active"
              >
                <Select>
                  <Select.Option value="active">Aktif</Select.Option>
                  <Select.Option value="inactive">İnaktif</Select.Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </Spin>
    </PageContainer>
  );
};

export default ParametersPage;
