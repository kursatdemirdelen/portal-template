import React, { useMemo, useState } from "react";
import { Table, Input, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { PageContainer, SectionCard, FilterToolbar } from "@/shared/ui";
import { TicketStatusChips } from "@/features/tickets/ui/TicketStatusChips";
import { TICKET_STATUS_META } from "@/features/tickets/model/status";
import {
  allTickets,
  formatTicketDate,
  type TicketRecord,
} from "@/features/tickets";
import { getStatusStyle } from "@/shared/styles/styleHelpers";

const statusOptions = TICKET_STATUS_META.map((item) => ({
  label: item.label,
  value: item.key,
}));

const requestTypeOptions = Array.from(
  new Set(allTickets.map((ticket) => ticket.requestType))
).map((type) => ({ label: type, value: type }));

const TicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>();
  const [requestTypeFilter, setRequestTypeFilter] = useState<string>();

  const filteredTickets = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allTickets.filter((ticket) => {
      const matchesSearch = term
        ? ticket.title.toLowerCase().includes(term) ||
          ticket.id.toLowerCase().includes(term) ||
          ticket.project.toLowerCase().includes(term)
        : true;
      const matchesStatus = statusFilter
        ? ticket.status === statusFilter
        : true;
      const matchesRequest = requestTypeFilter
        ? ticket.requestType === requestTypeFilter
        : true;
      return matchesSearch && matchesStatus && matchesRequest;
    });
  }, [searchTerm, statusFilter, requestTypeFilter]);

  const ticketStatusSummary = useMemo(
    () =>
      TICKET_STATUS_META.map((meta) => ({
        ...meta,
        count: filteredTickets.filter((ticket) => ticket.status === meta.key)
          .length,
      })),
    [filteredTickets]
  );

  const columns: ColumnsType<TicketRecord> = [
    {
      title: "Ticket ID",
      dataIndex: "id",
      key: "id",
      width: 110,
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: (value: string) => (
        <span style={{ fontWeight: 600 }}>{value}</span>
      ),
    },
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Proje",
      dataIndex: "project",
      key: "project",
      width: 150,
      filters: Array.from(
        new Set(allTickets.map((ticket) => ticket.project))
      ).map((project) => ({ text: project, value: project })),
      onFilter: (value, record) => record.project === value,
    },
    {
      title: "İstek Tipi",
      dataIndex: "requestType",
      key: "requestType",
      width: 180,
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      width: 140,
      filters: statusOptions.map((option) => ({
        text: option.label,
        value: option.value,
      })),
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        const style = getStatusStyle(status);
        return (
          <span
            style={{
              padding: "2px 10px",
              borderRadius: 999,
              background: style.bg,
              border: `1px solid ${style.border}`,
              color: style.text,
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Atanan",
      dataIndex: "assignee",
      key: "assignee",
      width: 170,
    },
    {
      title: "Tarih",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (value: string) => formatTicketDate(value),
    },
  ];

  return (
    <PageContainer
      title="Biletler"
      subtitle="Tüm istekleri tek yerden takip et"
      extra={
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => navigate("/tickets/create")}
        >
          Yeni Bilet
        </Button>
      }
    >
      <SectionCard
        title="Tüm Biletler"
        extra={<TicketStatusChips summary={ticketStatusSummary} />}
      >
        <FilterToolbar>
          <Input
            placeholder="ID, başlık ya da proje ara"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            allowClear
            style={{ minWidth: 220 }}
          />
          <Select
            placeholder="Durum"
            allowClear
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            style={{ width: 160 }}
          />
          <Select
            placeholder="İstek tipi"
            allowClear
            options={requestTypeOptions}
            value={requestTypeFilter}
            onChange={(value) => setRequestTypeFilter(value)}
            style={{ width: 200 }}
          />
        </FilterToolbar>
        <Table
          columns={columns}
          dataSource={filteredTickets}
          rowKey="id"
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </SectionCard>
    </PageContainer>
  );
};

export default TicketsPage;
