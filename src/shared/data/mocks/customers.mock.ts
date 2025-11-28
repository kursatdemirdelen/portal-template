/**
 * Customer Mock Data - Merkezi Müşteri Verileri
 *
 * Tüm müşteri kayıtları burada tutulur.
 * 
 * @see @/shared/types/customer.ts
 */

import type { Customer, CustomerStats } from '@/shared/types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Akademi Intellium',
    shortName: 'Akademi',
    status: 'active',
    address: 'Elazığ, Bartın, İstanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    postalCode: '34000',
    contact: {
      name: 'Turgut Özçelikyürek',
      role: 'Ar-Ge Genel Müdür Yardımcısı',
      phone: '+90 (216) 388 40 33',
      email: 'turgut.ozcelikyurek@intellium.com.tr',
    },
    phone: '+90 (216) 388 40 33',
    website: 'www.intellium.com.tr',
    taxOffice: 'Sarıgazi',
    taxNumber: '444664747',
    bank: {
      bankName: 'TEB',
      accountNumber: 'TR111111111111111111111111',
      iban: 'TR111111111111111111111111',
    },
    license: {
      type: 'standard',
      key: 'I4GAfvxMhTfO',
      startDate: '2025-02-10',
      endDate: '2025-02-24',
      status: 'active',
    },
    createdAt: '2001-01-01',
  },
  {
    id: '200',
    name: 'Akademi Yazılım A.Ş.',
    shortName: 'Akademi',
    status: 'active',
    address: 'Maslak Mah. AOS 55. Sok. No:2',
    city: 'İstanbul',
    country: 'Türkiye',
    postalCode: '34398',
    contact: {
      name: 'Turgut Özçelikyürek',
      role: 'Satış Müdürü',
      phone: '+90 (216) 388 40 33',
      email: 'turgut@akademi.com.tr',
    },
    phone: '+90 (216) 388 40 33',
    website: 'www.akademi.com.tr',
    taxOffice: 'Maslak',
    taxNumber: '1234567890',
    bank: {
      bankName: 'Garanti',
      accountNumber: 'TR123456789012345678901234',
    },
    license: {
      type: 'premium',
      key: 'AKD-PRE-2025',
      startDate: '2025-01-01',
      endDate: '2026-01-01',
      status: 'active',
    },
    createdAt: '2024-06-15',
  },
  {
    id: '3',
    name: 'Albaraka Türk Katılım Bankası',
    shortName: 'Albaraka',
    status: 'active',
    address: 'Saray Mah. Dr. Adnan Büyükdeniz Cad. No:6',
    city: 'İstanbul',
    country: 'Türkiye',
    postalCode: '34768',
    contact: {
      name: 'İhsan Fatih Küçük',
      role: 'IT Direktörü',
      phone: '+90 (216) 666 01 01',
      email: 'ihsan.kucuk@albaraka.com.tr',
    },
    phone: '+90 (216) 666 01 01',
    website: 'www.albaraka.com.tr',
    taxOffice: 'Ümraniye',
    taxNumber: '9876543210',
    bank: {
      bankName: 'Albaraka',
      accountNumber: 'TR987654321098765432109876',
    },
    license: {
      type: 'enterprise',
      key: 'ALB-ENT-2025',
      startDate: '2025-01-01',
      endDate: '2027-01-01',
      status: 'active',
    },
    createdAt: '2023-03-20',
  },
  {
    id: '202',
    name: 'Dicle Elektrik Dağıtım A.Ş.',
    shortName: 'Dicle Elektrik',
    status: 'active',
    address: 'Yenişehir Mah. Lise Cad. No:12',
    city: 'Diyarbakır',
    country: 'Türkiye',
    postalCode: '21100',
    contact: {
      name: 'Baran Yavuz',
      role: 'Bilgi İşlem Müdürü',
      phone: '+90 412 280 86 30',
      email: 'baran.yavuz@dicle.com.tr',
    },
    phone: '+90 412 280 86 30',
    website: 'www.dicle.com.tr',
    taxOffice: 'Diyarbakır',
    taxNumber: '5678901234',
    bank: {
      bankName: 'Ziraat',
      accountNumber: 'TR567890123456789012345678',
    },
    license: {
      type: 'standard',
      key: 'DCL-STD-2025',
      startDate: '2025-02-01',
      endDate: '2026-02-01',
      status: 'active',
    },
    createdAt: '2024-08-10',
  },
  {
    id: '203',
    name: 'Orhan Otomotiv San. Tic. A.Ş.',
    shortName: 'Orhan Otomotiv',
    status: 'active',
    address: 'Organize Sanayi Bölgesi 14. Cad. No:8',
    city: 'Bursa',
    country: 'Türkiye',
    postalCode: '16140',
    contact: {
      name: 'Güncellenecek',
      role: 'Genel Müdür',
      phone: '+90 (224) 280 49 00',
      email: 'info@orhanotomotiv.com.tr',
    },
    phone: '+90 (224) 280 49 00',
    website: 'www.orhanotomotiv.com.tr',
    taxOffice: 'Nilüfer',
    taxNumber: '3456789012',
    bank: {
      bankName: 'İş Bankası',
      accountNumber: 'TR345678901234567890123456',
    },
    license: {
      type: 'standard',
      key: 'ORH-STD-2025',
      startDate: '2025-01-15',
      endDate: '2026-01-15',
      status: 'active',
    },
    createdAt: '2024-11-01',
  },
  {
    id: '201',
    name: 'Turkuvaz Medya Grubu',
    shortName: 'Turkuvaz Medya',
    status: 'active',
    address: 'Mahmutbey Mah. 2645. Sok. No:2',
    city: 'İstanbul',
    country: 'Türkiye',
    postalCode: '34218',
    contact: {
      name: 'Hasan Kahveci',
      role: 'CTO',
      phone: '+90 (212) 354 30 00',
      email: 'hasan.kahveci@turkuvaz.com.tr',
    },
    phone: '+90 (212) 354 30 00',
    website: 'www.turkuvaz.com.tr',
    taxOffice: 'Bağcılar',
    taxNumber: '7890123456',
    bank: {
      bankName: 'Yapı Kredi',
      accountNumber: 'TR789012345678901234567890',
    },
    license: {
      type: 'premium',
      key: 'TRK-PRE-2025',
      startDate: '2025-01-01',
      endDate: '2026-01-01',
      status: 'active',
    },
    createdAt: '2024-05-20',
  },
  {
    id: '204',
    name: 'Demo Şirket Ltd. Şti.',
    shortName: 'Demo',
    status: 'pending',
    address: 'Örnek Mah. Test Sok. No:1',
    city: 'Ankara',
    country: 'Türkiye',
    postalCode: '06100',
    contact: {
      name: 'Test Kullanıcı',
      role: 'Yönetici',
      phone: '+90 (312) 123 45 67',
      email: 'test@demo.com.tr',
    },
    phone: '+90 (312) 123 45 67',
    taxOffice: 'Çankaya',
    taxNumber: '0000000000',
    bank: {
      bankName: 'Akbank',
      accountNumber: 'TR000000000000000000000000',
    },
    license: {
      type: 'trial',
      key: 'DEMO-TRIAL-2025',
      startDate: '2025-11-01',
      endDate: '2025-12-01',
      status: 'active',
    },
    createdAt: '2025-11-01',
  },
  {
    id: '205',
    name: 'Eski Müşteri A.Ş.',
    shortName: 'Eski Müşteri',
    status: 'inactive',
    address: 'Eski Mah. Pasif Sok. No:99',
    city: 'İzmir',
    country: 'Türkiye',
    postalCode: '35000',
    contact: {
      name: 'Eski Yetkili',
      role: 'Eski Müdür',
      phone: '+90 (232) 999 99 99',
      email: 'eski@musteri.com.tr',
    },
    phone: '+90 (232) 999 99 99',
    taxOffice: 'Konak',
    taxNumber: '9999999999',
    bank: {
      bankName: 'Halkbank',
      accountNumber: 'TR999999999999999999999999',
    },
    license: {
      type: 'standard',
      key: 'ESK-STD-2024',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      status: 'expired',
    },
    createdAt: '2023-01-01',
  },
];

/**
 * Müşteri istatistiklerini hesapla
 */
export const getCustomerStats = (): CustomerStats => {
  return {
    total: mockCustomers.length,
    active: mockCustomers.filter((c) => c.status === 'active').length,
    inactive: mockCustomers.filter((c) => c.status === 'inactive').length,
    pending: mockCustomers.filter((c) => c.status === 'pending').length,
    byLicenseType: {
      trial: mockCustomers.filter((c) => c.license.type === 'trial').length,
      standard: mockCustomers.filter((c) => c.license.type === 'standard').length,
      premium: mockCustomers.filter((c) => c.license.type === 'premium').length,
      enterprise: mockCustomers.filter((c) => c.license.type === 'enterprise').length,
    },
  };
};

/**
 * ID ile müşteri bul
 */
export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find((c) => c.id === id);
};

/**
 * Müşterileri filtrele
 */
export const filterCustomers = (
  customers: Customer[],
  filter: {
    status?: string;
    licenseType?: string;
    city?: string;
    search?: string;
  }
): Customer[] => {
  return customers.filter((customer) => {
    if (filter.status && customer.status !== filter.status) return false;
    if (filter.licenseType && customer.license.type !== filter.licenseType) return false;
    if (filter.city && customer.city !== filter.city) return false;
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const matchesSearch =
        customer.name.toLowerCase().includes(searchLower) ||
        customer.shortName.toLowerCase().includes(searchLower) ||
        customer.contact.name.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    return true;
  });
};
