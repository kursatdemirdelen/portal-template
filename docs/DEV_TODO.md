# Development TODOs

Bu liste, projeyi Ant Design 5 + React 19 mimarisiyle uyumlu, ölçeklenebilir ve dokümantasyonu güçlü tutmak için öncelikli teknik işleri içerir. Her başlık altında ilgili dosyaları inceleyip kısa açıklamalar yer alır.

## 1. Routing & Layout
- [ ] `AppRouter`’a nested route desteği ekleyerek bazı feature sayfalarını (örn. tickets detay) dinamik parametrelerle yönet.
- [ ] `AppLayout` menü grupları için `GROUP_ORDER`u config dosyasına taşı (örn. `shared/config/navigation.ts`), böylece layout ile config ayrılır.
- [ ] Auth akışında logout sonrası `/login` redirect’ini `ProtectedRoute` içinde işle, state temizliğiyle birlikte.

## 2. Shared State & Store
- [ ] Auth provider’ı Redux store’a entegre et veya context + RTK Query senaryosunu netleştir; role bilgisi tek kaynaktan gelsin.
- [ ] UI slice’a global notifications/toast state’i ekle; AntD `message`/`notification` kullanımını standardize et.
- [ ] Async slice örneği (örn. tickets listesi) ekleyip `createAsyncThunk` + axios client’i proje genelinde örnekle.

## 3. API Katmanı
- [ ] `apiClient` interceptor’larına auth token, locale, role gibi header’ları ekle.
- [ ] Error handling için merkezi `handleApiError` helper’ı yaz; UIda kullanıcı dostu mesajı tetikle.
- [ ] Mock data kullanan feature’ları sırayla servis katmanına taşı (önce tickets, sonra assignments vs.).

## 4. UI/UX ve Stil
- [x] Inline stil kullanılan bileşenleri (`PageContainer`, `ProjectTeams`, `RecentTickets`) `componentStyles.ts` veya CSS module aracılığıyla sadeleştir (PageContainer + dashboard bileşenleri `tableStyles`, `toolbarStyles`, badge helper’ları ile güncellendi).
- [ ] `FilterToolbar`, `RoleBadge` gibi shared UI parçalarını storybook/preview ile belgele; tip güvenli props ekle.
- [ ] Responsive davranışı eksik olan ekranlarda (AssignmentsTable, ProjectsPage) AntD grid/ResizeObserver kullanarak mobil desteği güçlendir.
- [ ] `componentStyles.ts` içindeki yeni grid/tablo preset’leri için örnek kullanım dokümantasyonu ekle; badge helper’larını diğer modüllere yay.

## 5. Feature Bazlı İyileştirmeler
- Tickets: Detay modalı, durum değiştirme aksiyonları, rol bazlı visible columns.
- Projects: Proje oluşturma/düzenleme formu (stepper + validate).
- Leaves: İzin talep formu, onay akışı, calendar integrasyonu.
- Assignments: Tamamla/Düzenle aksiyonlarının backend çağrıları, audit log bileşeni.
- Time Tracking: Start/stop timer, haftalık hedef takibi, export csv.

## 6. Test & Dokümantasyon
- [ ] Vitest + React Testing Library kurulumu; en azından shared UI ve critical hooks için örnek testler yaz.
- [ ] README’ye “Contribution Guide” ve “Coding Standards” bölümü ekle (naming, folder structure, styling kuralları).
- [ ] `docs/FEATURE_BACKLOG.md` ve bu TODO dosyasını sprint sonunda güncelleme alışkanlığı edin.

Bu maddeler tamamlandıkça ilgili commitlerde dokümanlara referans verin. Öncelik sırası product gereksinimlerine göre ayarlanabilir.
