# Development TODOs

Bu liste, projeyi Ant Design 5 + React 19 mimarisiyle uyumlu, ölçeklenebilir ve dokümantasyonu güçlü tutmak için öncelikli teknik işleri içerir.

---

## 📊 İlerleme Özeti

| Kategori | Tamamlanan | Bekleyen | Toplam |
|----------|------------|----------|--------|
| Mimari | 6 | 1 | 7 |
| API Katmanı | 3 | 4 | 7 |
| UI/UX | 4 | 2 | 6 |
| Features | 4 | 7 | 11 |
| Test & Docs | 3 | 3 | 6 |

---

## 1. ✅ Tamamlanan İşler

### Mimari & Yapı
- [x] Feature-based folder structure (`model/ui/pages` pattern)
- [x] Parameters feature tam mimari alignment
- [x] Users feature model/ui yapısı
- [x] Permissions feature model/ui yapısı
- [x] Barrel exports (index.ts) tüm feature'larda
- [x] **Customers feature modüler refactoring** (CustomersPage 839 satır → 80 satır + componentler + hook)

### API Katmanı
- [x] `parameterService.ts` - Mock CRUD + bulk operations
- [x] `userService.ts` - Mock CRUD + stats
- [x] `permissionService.ts` - Mock CRUD + role management

### UI/UX
- [x] `PageContainer`, `SectionCard` inline stilleri `componentStyles.ts`'e taşındı
- [x] Dashboard bileşenleri için `tableStyles`, `toolbarStyles` eklendi
- [x] **PageContainer responsive düzenleme** (Row/Col yapısı, mobil uyum)
- [x] **CustomerStatsCards responsive** (xs/sm/md breakpoints)

### Dokümantasyon
- [x] README.md güncellendi (kapsamlı proje yapısı)
- [x] API_INTEGRATION.md oluşturuldu
- [x] DEV_TODO.md güncellendi

---

## 2. 🔧 Devam Eden İşler

### 2.1 Routing & Layout
- [ ] `AppRouter`'a nested route desteği (tickets/:id detay sayfası)
- [ ] `GROUP_ORDER` config dosyasına taşınması (`shared/config/navigation.ts`)

### 2.2 API Katmanı
- [ ] `httpClient` interceptor'larına auth token eklenmesi
- [ ] Error handling için merkezi `handleApiError` helper
- [ ] Mock servislerin gerçek HTTP call'lara dönüşümü
- [ ] `apiClient` generic helpers (`get<T>`, `post<T>` vs.)

### 2.3 Shared State
- [ ] Auth context'in Redux store'a entegrasyonu
- [ ] Global notifications/toast state (UI slice)
- [ ] Async slice örneği (`createAsyncThunk`)

### 2.4 UI/UX
- [x] ~~`FilterToolbar`, `RoleBadge` tiplenmiş props~~
- [x] ~~Responsive davranış (mobil grid düzenlemeleri)~~ ✅ PageContainer + Stats kartları
- [ ] Skeleton/Loading states standardizasyonu
- [ ] Dark mode desteği

---

## 3. 📋 Feature Bazlı Backlog

### 3.1 Admin Paneli (Öncelik: Yüksek)
| Feature | Durum | Açıklama |
|---------|-------|----------|
| Parameters | ✅ Tamamlandı | API-driven, CRUD, bulk ops, export |
| Users | 🔄 Mock Data | UsersPage async'e çevrilmeli |
| Permissions | 🔄 Mock Data | PermissionsPage async'e çevrilmeli |

### 3.2 Core Features (Öncelik: Orta)
| Feature | Durum | Eksikler |
|---------|-------|----------|
| Tickets | 📋 Placeholder | Detay modal, CRUD, filtreler |
| Projects | 📋 Placeholder | Detay sayfa, form, timeline |
| Assignments | 📋 Placeholder | Aksiyon butonları, log |
| Time Tracking | 📋 Placeholder | Timer, export, hedef takip |

### 3.3 Secondary Features (Öncelik: Düşük)
| Feature | Durum | Eksikler |
|---------|-------|----------|
| Leaves | 📋 Placeholder | Talep formu, onay akışı |
| Customers | ✅ Tamamlandı | Modern UI, modüler yapı, responsive |
| Approvals | 📋 Placeholder | Workflow, notifications |
| Dashboard | ⚠️ Static Data | Widget'lar API'ye bağlanmalı |

---

## 4. 🧪 Test & Kalite

### Kurulum
- [ ] Vitest + React Testing Library kurulumu
- [ ] Test configuration (`vitest.config.ts`)

### Öncelikli Testler
- [ ] Shared UI bileşenleri (`PageContainer`, `SectionCard`)
- [ ] Custom hooks (`useAuth`, `useBreadcrumbs`)
- [ ] API servis fonksiyonları

---

## 5. 📝 Dokümantasyon

### Mevcut
- [x] README.md - Proje genel bakış
- [x] API_INTEGRATION.md - Backend entegrasyon rehberi
- [x] FEATURE_BACKLOG.md - Özellik listesi
- [x] DEV_TODO.md - Teknik yapılacaklar

### Planlanan
- [ ] CODING_STANDARDS.md - Naming, folder, styling kuralları
- [ ] COMPONENT_GUIDE.md - UI bileşen kullanım örnekleri
- [ ] DEPLOYMENT.md - Build ve deploy süreçleri

---

## 6. 🎯 Sonraki Sprint Önerileri

### Sprint 1: API Foundation
1. `httpClient` interceptor'ları (auth, error)
2. `handleApiError` centralized handler
3. UsersPage async dönüşümü
4. PermissionsPage async dönüşümü

### Sprint 2: Core Features
1. Tickets CRUD + detay modal
2. Projects detay sayfası
3. Dashboard widget'ları API'ye bağlama

### Sprint 3: Polish & Test
1. Vitest kurulumu
2. Temel test coverage
3. Responsive düzenlemeler
4. Dokümantasyon tamamlama

---

## 📌 Notlar

- Her PR'da ilgili TODO maddesi işaretlenmelidir
- Yeni gereksinimler `FEATURE_BACKLOG.md`'ye eklenmelidir
- Teknik borç items'ları bu dosyaya eklenmelidir
- Sprint sonlarında progress güncellenmeli

---

*Son güncelleme: 26 Kasım 2025*
