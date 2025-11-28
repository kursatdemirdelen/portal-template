/**
 * @deprecated Bu dosya artik kullanilmiyor.
 * Lutfen @/shared/data/mocks modulunu kullanin.
 * 
 * @example
 * // Eski kullanim (deprecated):
 * import { mockUsers } from '@/shared/data/mockData';
 * 
 * // Yeni kullanim:
 * import { mockUsers } from '@/shared/data/mocks';
 * 
 * @see @/shared/data/mocks/index.ts
 */

// Re-export everything from the new centralized mocks for backward compatibility
export * from './mocks';