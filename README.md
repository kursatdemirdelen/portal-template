# Portal Template (React + TypeScript + Vite)

Minimal, modüler ve okunabilir portal altyapısıdır. Ant Design bileşenleriyle sade UI, merkezileştirilmiş stil sistemi ve feature-based klasörleme sunar.

## Hızlı Başlangıç

- Bağımlılıkları yükleyin: `npm install`
- Geliştirme sunucusu: `npm run dev`
- Üretim build: `npm run build`
- Yerel önizleme: `npm run preview`

> Node 20+ ve npm 10+ ile uyumludur; proje ESNext modül sistemi kullanır.

## Proje Katmanları

- `src/app`: Router, layoutlar ve `ProtectedRoute`.
- `src/features`: Dashboard, tickets, projects gibi feature bazlı sayfalar.
- `src/shared/config`: Rota/tema konfigürasyonları; menü grubu, ikon ve yetki metadata içerir (`routes.ts`, `theme.ts`).
- `src/shared/layout`: Uygulama (AppLayout) ve auth layout bileşenleri.
- `src/shared/ui`: `PageContainer`, `SectionCard`, `PlaceholderPage` gibi genel UI parçaları.
- `src/shared/styles`: `styleConstants`, `componentStyles`, `styleHelpers` ile renk/spacing/tipografi tokenları.

Yeni sayfa eklerken `features/<feature>/` altına komponenti koyup `src/shared/config/routes.ts`’de `menuGroup`/`menuIcon`/`roles` bilgilerini güncelleyin. Menü grubu ikonu için `groupRoot` true olmalı.

## Navigasyon ve Breadcrumb

1. `appRoutes` artık her rota için `menuGroup`, `menuIcon` ve gerekirse `groupRoot` bilgisi içeriyor.
2. `AppLayout` bu metadata’dan yan menüyü oluşturuyor; `GROUP_ORDER` sabiti grupları belirli sıra ile render ediyor.
3. `PageContainer` varsayılan `useRouteBreadcrumbs` özelliğiyle `useBreadcrumbs` hook’unu kullanıyor. Hook `matchRoutes` ile parametrik yolları da eşleyip `menuGroup → sayfa` kırıntısı üretiyor.

## Stil Sistemi ve Temalar

- Tüm renk, spacing, gradient, tipografi tokenları `src/shared/styles/styleConstants.ts` içinde toplanmıştır.
- Ant Design tema overrides’ı `src/shared/config/theme.ts` içinde yapılır; renkleri sabitlerden almak önerilir.
- `PageContainer`/`SectionCard` gibi bileşenlerde birçok inline stil bulunuyor; ileri aşamada bu stilleri sabitlere taşımak tutarlılığı artırır.

## Gelecek Adımlar & Notlar

1. API ve auth entegrasyonu (axios instance/interceptor, `useAuth` için gerçek backend).
2. Form bileşenleri + validasyon (örn. yup/zod).
3. Error boundary + analytics (sayfa görüntülenme / logging).
4. Unit/integration test altyapısı (vitest + React Testing Library önerilir).

`REFACTORING_NOTES.md` şu anda proje yapısını açıklıyor; öncekilere göre güncel değilse içeriğini README’e taşıyıp dosyayı arşivleyebiliriz.
