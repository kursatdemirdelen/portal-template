import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Tooltip,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  SearchOutlined,
  FileTextOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { PageContainer, SectionCard, FilterToolbar } from "@/shared/ui";
import { mockApprovals } from "../model";
import { ApprovalRequest, ApprovalStatus, ApprovalType } from "../model";
import { colors, avatarColors } from "@/shared/styles/tokens";

const { Option } = Select;

const ApprovalsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | "all">(
    "all"
  );
  const [data, setData] = useState<ApprovalRequest[]>(mockApprovals);

  const handleApprove = (id: string) => {
    message.success(`Talep #${id} onaylandı.`);
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
  };

  const handleReject = (id: string) => {
    message.info(`Talep #${id} reddedildi.`);
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
  };

  const getStatusColor = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      case "pending":
        return "Bekliyor";
      default:
        return status;
    }
  };

  const getTypeIcon = (type: ApprovalType) => {
    switch (type) {
      case "leave":
        return <ClockCircleOutlined style={{ color: colors.info }} />;
      case "expense":
        return <DollarOutlined style={{ color: colors.success }} />;
      case "project":
        return <ProjectOutlined style={{ color: avatarColors.purple }} />;
      case "overtime":
        return <ClockCircleOutlined style={{ color: colors.warning }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.requesterName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: "Tip",
      dataIndex: "type",
      key: "type",
      render: (type: ApprovalType) => (
        <Tooltip title={type.toUpperCase()}>{getTypeIcon(type)}</Tooltip>
      ),
      width: 60,
      align: "center" as const,
    },
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: ApprovalRequest) => (
        <Space direction="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>{text}</span>
          <span style={{ fontSize: 12, color: colors.textSecondary }}>
            {record.id}
          </span>
        </Space>
      ),
    },
    {
      title: "Talep Eden",
      dataIndex: "requesterName",
      key: "requesterName",
    },
    {
      title: "Tarih",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Tutar",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (amount ? `${amount} ₺` : "-"),
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status: ApprovalStatus) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_value: unknown, record: ApprovalRequest) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Tooltip title="Onayla">
                <Button
                  type="text"
                  icon={
                    <CheckCircleOutlined style={{ color: colors.success }} />
                  }
                  onClick={() => handleApprove(record.id)}
                />
              </Tooltip>
              <Tooltip title="Reddet">
                <Button
                  type="text"
                  icon={<CloseCircleOutlined style={{ color: colors.error }} />}
                  onClick={() => handleReject(record.id)}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="Detay">
            <Button icon={<EyeOutlined />} type="text" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Onay Süreçleri"
      subtitle="Bekleyen ve tamamlanan onay talepleri"
    >
      <SectionCard>
        <FilterToolbar
          actions={<Button type="primary">Yeni Talep Oluştur</Button>}
        >
          <Input
            placeholder="Ara..."
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={(value) =>
              setStatusFilter(value as ApprovalStatus | "all")
            }
          >
            <Option value="all">Tüm Durumlar</Option>
            <Option value="pending">Bekleyen</Option>
            <Option value="approved">Onaylanan</Option>
            <Option value="rejected">Reddedilen</Option>
          </Select>
        </FilterToolbar>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default ApprovalsPage;
