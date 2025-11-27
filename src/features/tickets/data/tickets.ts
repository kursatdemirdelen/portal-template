import type { TicketRecord } from "../model/types";
import {
  mockTicketRecords,
  getTicketsByDepartment as getCentralTickets,
  getRecentTicketsForDepartment as getCentralRecentTickets,
} from "@/shared/data/mockData";

// Merkezi mock data kullan
const TICKETS: TicketRecord[] = mockTicketRecords;

export const allTickets: TicketRecord[] = TICKETS;

export const getTicketsByDepartment = (department?: string): TicketRecord[] => {
  if (!department) {
    return [...TICKETS];
  }
  return getCentralTickets(department);
};

export const getRecentTicketsForDepartment = (
  department: string,
  limit = 6
) => {
  return getCentralRecentTickets(department, limit);
};
