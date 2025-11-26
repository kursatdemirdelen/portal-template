/**
 * Users Management Page
 *
 * Admin sayfası - kullanıcı yönetimi için CRUD işlemleri.
 * ui/constants.ts dosyasından sabit değerler kullanılır.
 *
 * @features
 * - Kullanıcı listeleme, ekleme, düzenleme, silme
 * - Rol ve durum filtreleme
 * - Toplu durum değiştirme
 * - Arama fonksiyonu
 */

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { PageContainer } from "@/shared/ui";
import { userService } from "@/shared/api/userService";
import type {
  User,
  CreateUserRequest,
  UserRole,
  UserStatus,
} from "../model/types";
import {
  ROLE_LABELS,
  ROLE_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
  DEPARTMENTS,
} from "../ui/constants";

/**
 * Kullanıcı yönetimi ana sayfası
 */
const UsersPage: React.FC = () => {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [form] = Form.useForm();

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch {
      message.error("Kullanıcılar yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const openCreateModal = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  // CRUD operations
  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser({ id });
      message.success("Kullanıcı silindi");
      loadUsers();
    } catch {
      message.error("Silme işlemi başarısız");
    }
  };

  const handleBulkStatusChange = async (status: UserStatus) => {
    try {
      await Promise.all(
        selectedRowKeys.map((id) =>
          userService.updateUser({ id: id as string, status })
        )
      );
      message.success(`${selectedRowKeys.length} kullanıcı güncellendi`);
      setSelectedRowKeys([]);
      loadUsers();
    } catch {
      message.error("Toplu güncelleme başarısız");
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await userService.updateUser({ id: editingUser.id, ...values });
        message.success("Kullanıcı güncellendi");
      } else {
        await userService.createUser(values as CreateUserRequest);
        message.success("Kullanıcı oluşturuldu");
      }
      closeModal();
      loadUsers();
    } catch {
      message.error("İşlem başarısız");
    }
  };

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Statistics
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  // Role options for Select - constants'tan türetiliyor
  const roleOptions = (Object.keys(ROLE_LABELS) as UserRole[]).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  // Status options for Select
  const statusOptions = (Object.keys(STATUS_LABELS) as UserStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })
  );

  // Table columns
  const columns: ColumnsType<User> = [
    {
      title: "Kullanıcı",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole) => (
        <Tag color={ROLE_COLORS[role]}>{ROLE_LABELS[role]}</Tag>
      ),
      filters: roleOptions.map((r) => ({ text: r.label, value: r.value })),
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Departman",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status: UserStatus) => (
        <Tag color={STATUS_COLORS[status]}>{STATUS_LABELS[status]}</Tag>
      ),
      filters: statusOptions.map((s) => ({ text: s.label, value: s.value })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Son Giriş",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("tr-TR") : "-",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Bu kullanıcıyı silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Row selection config
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <PageContainer
      title="Kullanıcı Yönetimi"
      subtitle="Sistem kullanıcılarını yönetin"
    >
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Toplam Kullanıcı"
              value={stats.total}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Aktif Kullanıcı"
              value={stats.active}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Yönetici Sayısı"
              value={stats.admins}
              prefix={<SafetyCertificateOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters & Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6}>
            <Input
              placeholder="Ara..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={12} sm={4}>
            <Select
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: "100%" }}
              options={[{ value: "all", label: "Tüm Roller" }, ...roleOptions]}
            />
          </Col>
          <Col xs={12} sm={4}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
              options={[
                { value: "all", label: "Tüm Durumlar" },
                ...statusOptions,
              ]}
            />
          </Col>
          <Col xs={24} sm={10} style={{ textAlign: "right" }}>
            <Space>
              {selectedRowKeys.length > 0 && (
                <>
                  <Button onClick={() => handleBulkStatusChange("active")}>
                    Aktif Yap
                  </Button>
                  <Button onClick={() => handleBulkStatusChange("inactive")}>
                    Pasif Yap
                  </Button>
                </>
              )}
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateModal}
              >
                Yeni Kullanıcı
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Users Table */}
      <Card>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} / ${total} kullanıcı`,
          }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingUser ? "Kullanıcı Düzenle" : "Yeni Kullanıcı"}
        open={modalVisible}
        onOk={handleSave}
        onCancel={closeModal}
        okText={editingUser ? "Güncelle" : "Oluştur"}
        cancelText="İptal"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Ad Soyad"
                rules={[{ required: true, message: "Ad soyad gerekli" }]}
              >
                <Input placeholder="Ad Soyad" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-posta"
                rules={[
                  { required: true, message: "E-posta gerekli" },
                  { type: "email", message: "Geçerli e-posta girin" },
                ]}
              >
                <Input placeholder="ornek@sirket.com" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Rol"
                rules={[{ required: true, message: "Rol seçin" }]}
              >
                <Select placeholder="Rol seçin" options={roleOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Departman"
                rules={[{ required: true, message: "Departman seçin" }]}
              >
                <Select
                  placeholder="Departman seçin"
                  options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Durum" initialValue="active">
                <Select options={statusOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Telefon">
                <Input placeholder="+90 5XX XXX XXXX" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UsersPage;
