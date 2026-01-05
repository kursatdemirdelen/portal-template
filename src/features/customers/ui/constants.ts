/**
 * Customers UI Constants
 * Re-exports merkezi constants'lardan - backward compatibility
 */

import type { CustomerStatus } from '@/shared/types';

// Merkezi constants'lardan import et
export { 
  CUSTOMER_STATUS_LABELS as STATUS_LABELS,
  CUSTOMER_STATUS_COLORS as STATUS_COLORS,
  LICENSE_TYPE_LABELS,
  LICENSE_TYPE_COLORS,
  LICENSE_STATUS_LABELS,
  LICENSE_STATUS_COLORS,
  CITIES,
  COUNTRIES,
  TABLE_DEFAULTS,
  TABLE_DEFAULTS as TABLE_CONFIG, // Backward compatibility
} from '@/shared/config/constants';

// All statuses
export const ALL_STATUSES: CustomerStatus[] = ['active', 'inactive', 'pending'];

// All license types
export const ALL_LICENSE_TYPES: string[] = ['trial', 'standard', 'premium', 'enterprise'];
