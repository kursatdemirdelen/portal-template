import type { ColumnsType } from "antd/es/table";
import {
  colors,
  spacing,
  radius,
  typography,
  transitions,
  theme,
} from "@/shared/styles";
import { getStatusStyle } from "@/shared/styles";
import { UserAvatar } from "@/shared/ui";
import { formatTicketDate } from "@/features/tickets/model";
import type { TicketRecord } from "@/features/tickets";
import { getAvatarByName } from "@/shared/data/mocks";

export function createTicketColumns(
  navigate: (path: string) => void,
  allTickets: TicketRecord[],
  statusOptions: { label: string; value: string }[],
  assigneeOptions: { label: string; value: string }[]
): ColumnsType<TicketRecord> {
  return [
    {
      title: "Ticket ID",
      dataIndex: "id",
      key: "id",
      width: 110,
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: (value: string, record: TicketRecord) => (
        <span
          style={{
            fontWeight: theme.typography.fontWeight.semibold,
            color: colors.primary,
            cursor: "pointer",
            transition: transitions.fast,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onClick={() => navigate(`/tickets/${record.id}`)}
        >
          {value}
        </span>
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
              borderRadius: radius.full,
              background: style.bg,
              border: `1px solid ${style.border}`,
              color: style.text,
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.xs,
              display: "inline-block",
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
      filters: assigneeOptions.map((option) => ({
        text: option.label,
        value: option.value,
      })),
      onFilter: (value, record) => record.assignee === value,
      render: (assignee: string) => {
        const avatarInfo = getAvatarByName(assignee);
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
            }}
          >
            <UserAvatar
              size={24}
              user={{ name: assignee }}
              backgroundColor={avatarInfo.color}
              avatarUrl={avatarInfo.avatarUrl}
            />
            <span
              style={{
                fontSize: typography.fontSize.sm,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {assignee}
            </span>
          </div>
        );
      },
    },
    {
      title: "Tarih",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (value: string) => {
        const date = new Date(value);
        const formattedDate = formatTicketDate(value);
        const fullDateTime = date.toLocaleString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <span
            title={fullDateTime}
            style={{ fontSize: typography.fontSize.sm }}
          >
            {formattedDate}
          </span>
        );
      },
    },
  ];
}

export default createTicketColumns;
