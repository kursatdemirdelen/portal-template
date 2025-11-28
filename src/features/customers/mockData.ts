/**
 * Customers Feature - Mock Data
 *
 * Re-export from centralized mocks for backward compatibility.
 * @see @/shared/data/mocks/customers.mock.ts
 */

export { 
  mockCustomerList as mockCustomers, 
  getCustomerStats, 
  getCustomerById, 
  filterCustomers 
} from '@/shared/data/mocks';

// Re-export types
export type { Customer, CustomerStats } from '@/shared/types';
