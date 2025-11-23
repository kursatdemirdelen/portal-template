# Portal Template (React + TypeScript + Vite)

Modern şirket içi portallar için hazırlanmış, modüler ve okunabilir bir başlangıç seti. Ant Design bileşenleri, feature bazlı klasörleme ve merkezi stil sistemi ile yeni modülleri hızla inşa etmeyi hedefler.

## Ana Özellikler

- Feature-based mimari: Her iş alanı `features/<feature>` altında kendi model, UI ve sayfa katmanına sahip.
- Tip güvenliği: TypeScript ve Redux Toolkit ile tiplenmiş global durum ve hook seti.
- Hazır layout ve navigasyon: `AppLayout`, `ProtectedRoute` ve `appRoutes` metadata’sı ile yan menü/breadcrumb otomatik oluşur.
- UI taslakları: Placeholder sayfalar, SectionCard/PageContainer bileşenleri ve renk/spacing token’larıyla tutarlı görünüm.
- Ant Design temelli tasarım: Tema override’ları ve componentStyles ile kolayca özelleştirilebilir.

## Teknoloji Yığını

| Amaç | Teknoloji |
| --- | --- |
| UI & bileşen modeli | React 19, Ant Design 5 |
| Dil & araçlama | TypeScript 5.9, Vite 7 (SWC React plugin) |
| Durum yönetimi | Redux Toolkit + React-Redux |
| Routing | React Router DOM 7 |
| HTTP katmanı | Axios + paylaşılmış helper’lar |
| Kalite & lint | ESLint 9, TypeScript ESLint, @eslint/js |

> Gereksinimler: Node.js 20+, npm 10+. Proje ESNext modül sistemiyle çalışır.

## Kurulum ve Çalıştırma

```bash
npm install        # bağımlılıkları yükler
npm run dev        # Vite geliştirme sunucusu (http://localhost:5173)
npm run build      # tip kontrol + production build
npm run preview    # build çıktılarını lokalde önizleme
npm run lint       # ESLint denetimleri
```

## Proje Yapısı

- `src/app`: Router, layoutlar, `ProtectedRoute` ve uygulama provider’ları.
- `src/features`: Dashboard, tickets, projects vb. her feature’ın `model/ui/pages` klasörleri.
- `src/shared/config`: Routes, tema, rol tanımları gibi uygulama geneli ayarlar.
- `src/shared/layout`: `AppLayout` ve auth layout’u.
- `src/shared/ui`: `PageContainer`, `SectionCard`, `PlaceholderPage` gibi tekrar kullanılabilir UI parçaları.
- `src/shared/styles`: Renk/spacing/token sabitleri (`styleConstants`), layout stilleri (`componentStyles`), helper fonksiyonlar.
- `src/shared/api`: `httpClient`, `apiClient` ve servis tabanlı helper’lar.

Yeni sayfa eklerken:

1. `features/<feature>/pages` altına sayfa bileşenini ekleyin.
2. `src/shared/config/routes.ts` dosyasında rota bilgilerini (`menuGroup`, `menuIcon`, `roles`, `layout`) girin.
3. Menüde grup ikonu göstermek için ilgili rotada `groupRoot: true` tanımlayın ve gerekirse `AppLayout.tsx` içindeki `GROUP_ORDER` listesine yeni grubu ekleyin.

## Navigasyon ve Yetkilendirme

- `appRoutes` içinde her rota için `roles` alanı bulunur; `useAuth` ile dönen kullanıcının rolü menüde ve guarded sayfalarda filtrelenir.
- `AppLayout`, `menuGroup` ve `menuIcon` bilgilerini kullanarak yan menüyü otomatik oluşturur; breadcrumb’ler `PageContainer` içindeki `useRouteBreadcrumbs` hook’u ile türetilir.
- Auth sayfaları `layout: "auth"` ve `showInMenu: false` olarak işaretlenir; login/logout placeholder’ları ileride gerçek sayfalarla değiştirilebilir.

## Stil Sistemi

- Renk, tipografi, spacing ve gölge token’ları `styleConstants.ts` dosyasında toplanmıştır.
- `componentStyles.ts` AppLayout, tablolar ve kart yapıları için ortak stilleri içerir.
- `styleHelpers.ts` badge/rozet gibi tekrar eden durum stillerini üretir.
- Ant Design teması `src/shared/config/theme.ts` üzerinden güncellenir; `ConfigProvider` token’larını değiştirirken mevcut palette ile uyum koruyun.

## Kullanım Notları

- HTTP çağrıları için `apiClient.ts` ve `httpClient.ts` üzerinden axios instance’ını kullanın; ortak interceptor/başlık eklemek kolaylaşır.
- Redux store şu an `ui` slice’ı ile başlar; yeni global state ihtiyaçlarında `src/shared/store` altında slice açabilir ve `store.ts` dosyasına ekleyebilirsiniz.
- Placeholder sayfalar gerçek modüller hazır olana kadar demo veri/taslak sunar; gerektikçe `features/placeholders` altındaki bileşenleri kaldırın veya güncelleyin.

## Dokümanlar

- `docs/FEATURE_BACKLOG.md`: Planlanan/eksik akışların listesi.
- `docs/DEV_TODO.md`: Routing, store, stil ve test iyileştirmeleri için teknik yapılacaklar.
