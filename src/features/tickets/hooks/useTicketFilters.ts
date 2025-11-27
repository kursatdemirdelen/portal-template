import { useMemo, useState } from "react";
import type { TicketRecord } from "../model/types";

export interface UseTicketFiltersOptions {
  tickets: TicketRecord[];
}

export function useTicketFilters({ tickets }: UseTicketFiltersOptions) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [requestTypeFilter, setRequestTypeFilter] = useState<string | undefined>();
  const [assigneeFilter, setAssigneeFilter] = useState<string | undefined>();

  const filteredTickets = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return tickets.filter((ticket) => {
      const matchesSearch = term
        ? ticket.title.toLowerCase().includes(term) ||
          ticket.id.toLowerCase().includes(term) ||
          ticket.project.toLowerCase().includes(term)
        : true;
      const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
      const matchesRequest = requestTypeFilter ? ticket.requestType === requestTypeFilter : true;
      const matchesAssignee = assigneeFilter ? ticket.assignee === assigneeFilter : true;
      return matchesSearch && matchesStatus && matchesRequest && matchesAssignee;
    });
  }, [tickets, searchTerm, statusFilter, requestTypeFilter, assigneeFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter(undefined);
    setRequestTypeFilter(undefined);
    setAssigneeFilter(undefined);
  };

  return {
    // state
    searchTerm,
    statusFilter,
    requestTypeFilter,
    assigneeFilter,
    // setters
    setSearchTerm,
    setStatusFilter,
    setRequestTypeFilter,
    setAssigneeFilter,
    resetFilters,
    // derived
    filteredTickets,
  };
}
