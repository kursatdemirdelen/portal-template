import React, { memo } from "react";
import { Avatar, Space, Typography } from "antd";
import { tableStyles } from "@/shared/styles/componentStyles";
import { getRequestTypeStyle, getStatusStyle } from "@/shared/styles/styleHelpers";
import { gradients } from "@/shared/styles/styleConstants";
import type { Ticket } from "../model/types";
import { formatTicketDate } from "../data/tickets";

const { Text } = Typography;

interface RecentTicketsProps {
  tickets: Ticket[];
}

export const RecentTickets: React.FC<RecentTicketsProps> = memo(
  ({ tickets }) => {
    return (
      <div style={tableStyles.ticketTable.outer}>
        <div style={tableStyles.ticketTable.inner}>
          {/* Header */}
          <div style={tableStyles.ticketTable.headerRow}>
            <span>ID</span>
            <span>Bilet Ad?</span>
            <span>?stek Tipi</span>
            <span>Proje</span>
            <span>Durum</span>
            <span>Atanan</span>
          </div>

          {/* Rows */}
          {tickets.map((item, index) => {
            const statusColor = getStatusStyle(item.status);
            const typeBadge = getRequestTypeStyle(item.requestType);
            const rowBackground =
              index % 2 === 0
                ? tableStyles.ticketTable.rowBackgrounds.even
                : tableStyles.ticketTable.rowBackgrounds.odd;

            return (
              <div
                key={item.id}
                style={{
                  ...tableStyles.ticketTable.row,
                  background: rowBackground,
                }}
              >
                <Text style={tableStyles.ticketTable.idCell}>{item.id}</Text>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <Text style={tableStyles.ticketTable.title}>{item.title}</Text>
                  <Text
                    type="secondary"
                    style={tableStyles.ticketTable.meta}
                  >
                    M??teri: {item.customer} | Tarih:{" "}
                    {formatTicketDate(item.createdAt)}
                  </Text>
                </div>

                <div
                  style={{
                    ...tableStyles.ticketTable.chip,
                    background: typeBadge.bg,
                    color: typeBadge.text,
                  }}
                >
                  {item.requestType}
                </div>

                <Text style={tableStyles.ticketTable.project}>
                  {item.project}
                </Text>

                <div
                  style={{
                    ...tableStyles.ticketTable.chip,
                    background: statusColor.bg,
                    color: statusColor.text,
                    border: `1px solid ${statusColor.border}`,
                  }}
                >
                  {item.status}
                </div>

                <Space size={10} align="center">
                  <Avatar
                    size={32}
                    style={{
                      ...tableStyles.ticketTable.avatar,
                      background: gradients.avatarPrimary,
                    }}
                  >
                    {item.avatar}
                  </Avatar>
                  <Text style={tableStyles.ticketTable.title}>
                    {item.assignee}
                  </Text>
                </Space>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

RecentTickets.displayName = "RecentTickets";
