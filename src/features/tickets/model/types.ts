/**
 * Tickets Feature - Type Definitions
 * ====================================
 * 
 * Bu dosya, Tickets feature'ının TypeScript type'larını içerir.
 * Temel tipler @/shared/types'dan import edilir.
 */

// Shared types'dan re-export
export type { 
  TicketStatusSimple,
  TicketStatusDetailed,
  RequestTypeSimple,
  RequestTypeDetailed,
  Ticket, 
  TicketRecord,
  TicketEffort,
  TicketComment,
  TicketHistoryItem,
  TicketAttachment,
  TicketProjectInfo,
  TicketDetail,
  // TicketStatusMeta is exported from ./status.ts locally
} from '@/shared/types';

