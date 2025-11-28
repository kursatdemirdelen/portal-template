/**
 * Customer Domain Types
 *
 * Müşteri yönetimi için merkezi tip tanımları.
 */

export type CustomerStatus = 'active' | 'inactive' | 'pending';

export type LicenseType = 'trial' | 'standard' | 'premium' | 'enterprise';

export type LicenseStatus = 'active' | 'expired' | 'suspended';

export interface CustomerContact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface CustomerBank {
  bankName: string;
  accountNumber: string;
  iban?: string;
}

export interface CustomerLicense {
  type: LicenseType;
  key: string;
  startDate: string;
  endDate: string;
  status: LicenseStatus;
}

export interface Customer {
  id: string;
  name: string;
  shortName: string;
  status: CustomerStatus;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  contact: CustomerContact;
  phone: string;
  website?: string;
  taxOffice: string;
  taxNumber: string;
  bank: CustomerBank;
  license: CustomerLicense;
  createdAt: string;
}

export interface CustomerStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  byLicenseType: Record<LicenseType, number>;
}

export interface CustomerFilter {
  status?: CustomerStatus;
  licenseType?: LicenseType;
  city?: string;
  search?: string;
}
