/**
 * Permissions Management Page
 *
 * Rol bazlı izin yönetimi sayfası.
 * ui/constants.ts dosyasından MODULE_LABELS, ACTION_LABELS kullanılır.
 *
 * @features
 * - Rol seçimi ve izin matrisi görüntüleme
 * - İzin toggle ve kaydetme
 * - Rol kopyalama ve silme
 * - İstatistikler
 */

import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Tag,
  Row,
  Col,
  Statistic,
  Select,
} from "antd";
import { SaveOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { PageContainer } from "@/shared/ui/PageContainer";
import { SectionCard } from "@/shared/ui/SectionCard";
import { colorPalette } from "@/shared/styles/styleConstants";
import { mockRolePermissions, getPermissionStats } from "../mockData";
import type { RolePermissionMap, PermissionModule, Permission } from "../model";
import { MODULE_LABELS, ALL_MODULES } from "../ui/constants";

const PermissionsPage: React.FC = () => {
  const [rolePermissions, setRolePermissions] =
    useState<RolePermissionMap[]>(mockRolePermissions);
  const [selectedRole, setSelectedRole] = useState<RolePermissionMap>(
    mockRolePermissions[0]
  );
  const [editingPermissions, setEditingPermissions] = useState<Set<string>>(
    new Set()
  );
  const [isDirty, setIsDirty] = useState(false);
  const stats = getPermissionStats();

  const handlePermissionToggle = (permId: string) => {
    const newSet = new Set(editingPermissions);
    if (newSet.has(permId)) {
      newSet.delete(permId);
    } else {
      newSet.add(permId);
    }
    setEditingPermissions(newSet);
    setIsDirty(true);
  };

  const handleSave = () => {
    Modal.confirm({
      title: "Yetkileri Kaydet",
      content: `${selectedRole.roleName} rolünün yetkileri güncellenecektir. Devam etmek istiyor musunuz?`,
      okText: "Kaydet",
      cancelText: "İptal",
      onOk() {
        const updatedPermissions = selectedRole.permissions.map(
          (p: Permission) => ({
            ...p,
            isEnabled: editingPermissions.has(p.id),
          })
        );

        const updatedRole: RolePermissionMap = {
          ...selectedRole,
          permissions: updatedPermissions,
        };
        setRolePermissions(
          rolePermissions.map((r) =>
            r.id === selectedRole.id ? updatedRole : r
          )
        );
        setSelectedRole(updatedRole);
        setEditingPermissions(new Set());
        setIsDirty(false);
      },
    });
  };

  const handleCloneRole = () => {
    Modal.confirm({
      title: "Rolü Kopyala",
      content: `${selectedRole.roleName} rolü kopyalanacaktır. Devam etmek istiyor musunuz?`,
      okText: "Kopyala",
      cancelText: "İptal",
      onOk() {
        const newRole: RolePermissionMap = {
          ...selectedRole,
          id: `ROLE_${Date.now()}`,
          roleId: `role_${Date.now()}`,
          roleName: `${selectedRole.roleName} (Kopya)`,
        };
        setRolePermissions([...rolePermissions, newRole]);
      },
    });
  };

  const handleDeleteRole = () => {
    if (selectedRole.isSystem) {
      Modal.error({
        title: "Sistem Rolü Silinemez",
        content: "Sistem rollerini silemezsiniz.",
      });
      return;
    }

    Modal.confirm({
      title: "Rolü Sil",
      content: `${selectedRole.roleName} rolü silinecektir. Devam etmek istiyor musunuz?`,
      okText: "Sil",
      cancelText: "İptal",
      okButtonProps: { danger: true },
      onOk() {
        const remaining = rolePermissions.filter(
          (r) => r.id !== selectedRole.id
        );
        setRolePermissions(remaining);
        if (remaining.length > 0) {
          setSelectedRole(remaining[0]);
        }
      },
    });
  };

  const matrixData = ALL_MODULES.map((module) => {
    const modulePerms = selectedRole.permissions.filter(
      (p: Permission) => p.module === module
    );
    return {
      module,
      view: modulePerms.find((p: Permission) => p.action === "view")?.id || "",
      create:
        modulePerms.find((p: Permission) => p.action === "create")?.id || "",
      edit: modulePerms.find((p: Permission) => p.action === "edit")?.id || "",
      delete:
        modulePerms.find((p: Permission) => p.action === "delete")?.id || "",
      export:
        modulePerms.find((p: Permission) => p.action === "export")?.id || "",
    };
  });

  const matrixColumns = [
    {
      title: "Modül",
      dataIndex: "module",
      key: "module",
      width: 130,
      render: (module: PermissionModule) => (
        <strong>{MODULE_LABELS[module]}</strong>
      ),
    },
    {
      title: "Görüntüle",
      dataIndex: "view",
      key: "view",
      width: 80,
      align: "center" as const,
      render: (permId: string) =>
        permId && (
          <input
            type="checkbox"
            checked={
              editingPermissions.has(permId) ||
              (selectedRole.permissions.find((p) => p.id === permId)
                ?.isEnabled ??
                false)
            }
            onChange={() => handlePermissionToggle(permId)}
            style={{ cursor: "pointer", width: 18, height: 18 }}
          />
        ),
    },
    {
      title: "Oluştur",
      dataIndex: "create",
      key: "create",
      width: 80,
      align: "center" as const,
      render: (permId: string) =>
        permId && (
          <input
            type="checkbox"
            checked={
              editingPermissions.has(permId) ||
              (selectedRole.permissions.find((p) => p.id === permId)
                ?.isEnabled ??
                false)
            }
            onChange={() => handlePermissionToggle(permId)}
            style={{ cursor: "pointer", width: 18, height: 18 }}
          />
        ),
    },
    {
      title: "Düzenle",
      dataIndex: "edit",
      key: "edit",
      width: 80,
      align: "center" as const,
      render: (permId: string) =>
        permId && (
          <input
            type="checkbox"
            checked={
              editingPermissions.has(permId) ||
              (selectedRole.permissions.find((p) => p.id === permId)
                ?.isEnabled ??
                false)
            }
            onChange={() => handlePermissionToggle(permId)}
            style={{ cursor: "pointer", width: 18, height: 18 }}
          />
        ),
    },
    {
      title: "Sil",
      dataIndex: "delete",
      key: "delete",
      width: 80,
      align: "center" as const,
      render: (permId: string) =>
        permId && (
          <input
            type="checkbox"
            checked={
              editingPermissions.has(permId) ||
              (selectedRole.permissions.find((p) => p.id === permId)
                ?.isEnabled ??
                false)
            }
            onChange={() => handlePermissionToggle(permId)}
            style={{ cursor: "pointer", width: 18, height: 18 }}
          />
        ),
    },
    {
      title: "Dışa Aktar",
      dataIndex: "export",
      key: "export",
      width: 80,
      align: "center" as const,
      render: (permId: string) =>
        permId && (
          <input
            type="checkbox"
            checked={
              editingPermissions.has(permId) ||
              (selectedRole.permissions.find((p) => p.id === permId)
                ?.isEnabled ??
                false)
            }
            onChange={() => handlePermissionToggle(permId)}
            style={{ cursor: "pointer", width: 18, height: 18 }}
          />
        ),
    },
  ];

  return (
    <PageContainer
      title="Yetkilendirme"
      subtitle="Roller ve izinleri yönetin"
      extra={
        <Space>
          {isDirty && (
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Kaydet
            </Button>
          )}
          <Button icon={<CopyOutlined />} onClick={handleCloneRole}>
            Rolü Kopyala
          </Button>
          {!selectedRole.isSystem && (
            <Button danger icon={<DeleteOutlined />} onClick={handleDeleteRole}>
              Sil
            </Button>
          )}
        </Space>
      }
    >
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col xs={12} sm={6}>
          <Statistic title="Toplam Rol" value={stats.totalRoles} />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic title="Sistem Rolleri" value={stats.systemRoles} />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic title="Toplam İzin" value={stats.totalPermissions} />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic
            title="Etkin"
            value={
              selectedRole.permissions.filter((p: Permission) => p.isEnabled)
                .length
            }
            valueStyle={{ color: colorPalette.success }}
          />
        </Col>
      </Row>

      <SectionCard variant="default" style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ marginRight: 12 }}>Rol Seçin:</strong>
          <Select
            value={selectedRole.id}
            onChange={(roleId) => {
              const role = rolePermissions.find((r) => r.id === roleId);
              if (role) {
                setSelectedRole(role);
                setEditingPermissions(new Set());
                setIsDirty(false);
              }
            }}
            style={{ width: 250 }}
          >
            {rolePermissions.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.roleName}
                {role.isSystem && <Tag style={{ marginLeft: 8 }}>Sistem</Tag>}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div style={{ fontSize: 12, color: colorPalette.textMuted }}>
          <p>{selectedRole.description}</p>
        </div>
      </SectionCard>

      <SectionCard variant="default">
        <h3 style={{ marginBottom: 16 }}>
          {selectedRole.roleName} - İzin Matrisi
        </h3>

        <Table
          columns={matrixColumns}
          dataSource={matrixData}
          rowKey="module"
          pagination={false}
          scroll={{ x: 800 }}
          bordered
        />

        {selectedRole.isSystem && (
          <div
            style={{
              marginTop: 16,
              padding: "8px 12px",
              backgroundColor: "#f5f5f5",
              borderRadius: 4,
            }}
          >
            <strong style={{ color: colorPalette.textMuted }}>
              ℹ Sistem Rolü:
            </strong>
            <span style={{ color: colorPalette.textMuted, marginLeft: 8 }}>
              Bu rol sistem tarafından koruma altındadır ve silinemez.
            </span>
          </div>
        )}
      </SectionCard>

      <SectionCard variant="default" style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Tüm Roller ve İzin Sayıları</h3>

        <Table
          columns={[
            {
              title: "Rol Adı",
              dataIndex: "roleName",
              key: "roleName",
              width: 180,
            },
            {
              title: "Açıklama",
              dataIndex: "description",
              key: "description",
              width: 250,
            },
            {
              title: "İzin Sayısı",
              key: "permCount",
              width: 100,
              render: (_unknown: unknown, record: RolePermissionMap) => (
                <Tag color={colorPalette.primary}>
                  {
                    record.permissions.filter((p: Permission) => p.isEnabled)
                      .length
                  }
                  /{record.permissions.length}
                </Tag>
              ),
            },
            {
              title: "Tip",
              key: "type",
              width: 100,
              render: (_unknown: unknown, record: RolePermissionMap) =>
                record.isSystem ? (
                  <Tag color="cyan">Sistem</Tag>
                ) : (
                  <Tag>Özel</Tag>
                ),
            },
          ]}
          dataSource={rolePermissions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default PermissionsPage;
