import React, { useEffect, useState } from "react";
import { Table, Button, Grid, Select, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { PageContainer, SectionCard } from "@/shared/ui";
import { Card } from "antd";
import { TableSkeleton, CardSkeleton } from "@/shared/ui/Loaders";
import {
  TicketListCard,
  StatsGrid,
  TicketsHeaderActions,
  TicketsFilterBar,
  EmptyTicketList,
  createTicketColumns,
} from "@/features/tickets/ui/ticket-list";
import { theme } from "@/shared/styles";
import {
  allTickets,
  type TicketRecord,
  MOCK_CURRENT_USER,
  TABLE_CONFIG,
} from "@/features/tickets";
import { useTicketFilters } from "@/features/tickets/hooks/useTicketFilters";
import { useTicketStats } from "@/features/tickets/hooks/useTicketStats";
import { useTicketExport } from "@/features/tickets/hooks/useTicketExport";
import { useTicketFilterOptions } from "@/features/tickets/hooks/useTicketFilterOptions";

const { useBreakpoint } = Grid;

/**
 * API Integration Notes:
 * - GET /api/tickets - Fetch all tickets (replace allTickets)
 * - GET /api/tickets/:id - Fetch single ticket detail
 * - POST /api/tickets - Create new ticket
 * - PUT /api/tickets/:id - Update ticket
 * - DELETE /api/tickets/:id - Delete ticket
 * - GET /api/tickets/stats - Get statistics (myTickets, open, urgent, resolved)
 * - Use apiClient from @/shared/api for requests
 * - Add loading states with useState<boolean>
 * - Add error handling with try-catch and message.error()
 * - Current user should come from auth store/context
 */

const TicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [loading, setLoading] = useState(false);

  // Mobile pagination & sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const pageSize = 10;

  // Filter options - computed from ticket data
  const { statusOptions, requestTypeOptions, assigneeOptions } =
    useTicketFilterOptions(allTickets);

  // Filtering logic
  const {
    searchTerm,
    statusFilter,
    requestTypeFilter,
    assigneeFilter,
    setSearchTerm,
    setStatusFilter,
    setRequestTypeFilter,
    setAssigneeFilter,
    resetFilters,
    filteredTickets,
  } = useTicketFilters({ tickets: allTickets });

  // Statistics
  const {
    myTicketsCount,
    openTicketsCount,
    pendingTicketsCount,
    resolvedThisWeek,
    ticketStatusSummary,
  } = useTicketStats({
    tickets: allTickets,
    filteredTickets,
    currentUser: MOCK_CURRENT_USER,
  });

  // Table columns
  const columns: ColumnsType<TicketRecord> = createTicketColumns(
    (path) => navigate(path),
    allTickets,
    statusOptions,
    assigneeOptions
  );

  // Export functionality
  const { exportToCSV } = useTicketExport();

  // Check if filters are active
  const hasActiveFilters = Boolean(
    searchTerm || statusFilter || requestTypeFilter || assigneeFilter
  );

  // NOTE: Şimdilik mock veri ile loading false; API'ye geçince setLoading(true)->fetch->false şeklinde kullanılacak.

  return (
    <PageContainer
      title="Biletler"
      subtitle="Tüm istekleri tek yerden takip et"
      extra={
        <Button
          type="primary"
          icon={<Plus size={16} />}
          size={isMobile ? "middle" : "large"}
          onClick={() => navigate("/tickets/create")}
        >
          {isMobile ? "Yeni" : "Yeni Bilet"}
        </Button>
      }
    >
      {/* Stats Cards - Responsive fixed heights */}
      <StatsGrid
        myTicketsCount={myTicketsCount}
        openTicketsCount={openTicketsCount}
        pendingTicketsCount={pendingTicketsCount}
        resolvedThisWeek={resolvedThisWeek}
        onClickMy={() => setAssigneeFilter(MOCK_CURRENT_USER)}
        onClickOpen={() => setStatusFilter("Açık")}
        onClickPending={() => setStatusFilter("Devam Ediyor")}
        onClickResolved={() => setStatusFilter("Çözüldü")}
      />

      <SectionCard
        title="Biletler"
        extra={
          <TicketsHeaderActions
            isMobile={isMobile}
            summary={ticketStatusSummary}
            showReset={hasActiveFilters}
            onReset={resetFilters}
            onExport={() => exportToCSV(filteredTickets)}
          />
        }
      >
        <TicketsFilterBar
          isMobile={isMobile}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          requestTypeFilter={requestTypeFilter}
          assigneeFilter={assigneeFilter}
          statusOptions={statusOptions}
          requestTypeOptions={requestTypeOptions}
          assigneeOptions={assigneeOptions}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onRequestTypeChange={setRequestTypeFilter}
          onAssigneeChange={setAssigneeFilter}
        />

        {loading ? (
          isMobile ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: theme.spacing.md }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardSkeleton />
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <TableSkeleton />
            </Card>
          )
        ) : isMobile ? (
          <>
            {/* Sorting controls for mobile */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 12, color: theme.colors.text.muted }}>
                {filteredTickets.length} bilet
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Select
                  size="small"
                  value={sortBy}
                  onChange={(value) => {
                    setSortBy(value);
                    setCurrentPage(1);
                  }}
                  style={{ width: 120 }}
                  options={[
                    { label: "Tarihe göre", value: "createdAt" },
                    { label: "Duruma göre", value: "status" },
                    { label: "Atanana göre", value: "assignee" },
                    { label: "ID'ye göre", value: "id" },
                  ]}
                />
                <Button
                  size="small"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  style={{ padding: "0 8px" }}
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </div>
            </div>

            {/* Card list */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: theme.spacing.md,
              }}
            >
              {filteredTickets.length === 0 ? (
                <EmptyTicketList
                  hasFilters={hasActiveFilters}
                  onClearFilters={resetFilters}
                  onCreateTicket={() => navigate("/tickets/create")}
                />
              ) : (
                (() => {
                  // Sort tickets
                  const sortedTickets = [...filteredTickets].sort((a, b) => {
                    let comparison = 0;
                    if (sortBy === "createdAt") {
                      comparison =
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime();
                    } else if (sortBy === "status") {
                      comparison = a.status.localeCompare(b.status);
                    } else if (sortBy === "assignee") {
                      comparison = a.assignee.localeCompare(b.assignee);
                    } else if (sortBy === "id") {
                      comparison = a.id.localeCompare(b.id);
                    }
                    return sortOrder === "asc" ? comparison : -comparison;
                  });

                  // Paginate
                  const startIndex = (currentPage - 1) * pageSize;
                  const paginatedTickets = sortedTickets.slice(
                    startIndex,
                    startIndex + pageSize
                  );

                  return paginatedTickets.map((ticket) => (
                    <TicketListCard
                      key={ticket.id}
                      id={ticket.id}
                      title={ticket.title}
                      project={ticket.project}
                      requestType={ticket.requestType}
                      status={ticket.status}
                      assignee={ticket.assignee}
                      createdAt={ticket.createdAt}
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                    />
                  ));
                })()
              )}
            </div>

            {/* Pagination for mobile */}
            {filteredTickets.length > 0 && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredTickets.length}
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}
                  showSizeChanger={false}
                  showTotal={(total) => `Toplam ${total} bilet`}
                  size="small"
                />
              </div>
            )}
          </>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredTickets}
            rowKey="id"
            pagination={{
              pageSize: TABLE_CONFIG.DEFAULT_PAGE_SIZE,
              showSizeChanger: TABLE_CONFIG.SHOW_SIZE_CHANGER,
              showTotal: (total) => `Toplam ${total} bilet`,
              pageSizeOptions: [...TABLE_CONFIG.PAGE_SIZE_OPTIONS],
            }}
            scroll={{ x: 1000 }}
            size="middle"
            locale={{
              emptyText: (
                <EmptyTicketList
                  hasFilters={hasActiveFilters}
                  onClearFilters={resetFilters}
                  onCreateTicket={() => navigate("/tickets/create")}
                />
              ),
            }}
            rowClassName={() => "table-row-hover"}
          />
        )}
      </SectionCard>
    </PageContainer>
  );
};

export default TicketsPage;
