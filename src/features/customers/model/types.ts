/**
 * Customers Feature - Type Definitions
 * =====================================
 *
 * Müşteri yönetimi için type tanımları.
 */

// Müşteri durumu
export type CustomerStatus = 'active' | 'inactive' | 'pending';

// Lisans türü
export type LicenseType = 'trial' | 'standard' | 'premium' | 'enterprise';

// Lisans durumu
export type LicenseStatus = 'active' | 'expired' | 'suspended';

// Yetkili kişi bilgisi
export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  email: string;
}

// Banka bilgisi
export interface BankInfo {
  bankName: string;
  accountNumber: string;
  iban?: string;
}

// Lisans bilgisi
export interface LicenseInfo {
  type: LicenseType;
  key: string;
  startDate: string;
  endDate: string;
  status: LicenseStatus;
}

// Ana Müşteri entity
export interface Customer {
  id: string;
  name: string;              // Müşteri Adı (tam)
  shortName: string;         // Müşteri Kısa Adı
  status: CustomerStatus;
  
  // Adres bilgileri
  address: string;
  city: string;
  country: string;
  postalCode: string;
  
  // Yetkili kişi
  contact: ContactPerson;
  
  // Firma bilgileri
  phone: string;
  website?: string;
  taxOffice: string;         // Vergi Dairesi
  taxNumber: string;         // Vergi No
  
  // Banka bilgisi
  bank: BankInfo;
  
  // Lisans bilgisi
  license: LicenseInfo;
  
  // Meta
  createdAt: string;
  updatedAt?: string;
}

// Form için kullanılacak tip
export interface CustomerFormData {
  name: string;
  shortName: string;
  status: CustomerStatus;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  contactName: string;
  contactRole: string;
  contactPhone: string;
  contactEmail: string;
  phone: string;
  website?: string;
  taxOffice: string;
  taxNumber: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  licenseType: LicenseType;
  licenseKey?: string;
  licenseStartDate: string;
  licenseEndDate: string;
}

// Filtre
export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus | 'all';
  city?: string;
  licenseType?: LicenseType | 'all';
}

// İstatistikler
export interface CustomerStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  byLicenseType: Record<LicenseType, number>;
}
