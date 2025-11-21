# Portal Template (React + TypeScript + Vite)

Minimal, modüler ve okunabilir portal altyapısıdır. Ant Design bileşenleriyle sade UI, merkezileştirilmiş stil sistemi ve feature-based klasörleme sunar.

## Yapılacaklar & Dokümanlar

- `docs/FEATURE_BACKLOG.md`: Tüm feature backlog ve eksik akışların listesi. New story açarken burada güncelleme yapın.
- `docs/DEV_TODO.md`: Teknik TODO listesi (routing, store, stil, test). Sprint planı yaparken bu dosyayı kontrol edin.
- Stil sistemi, layout ve data katmanına dair yönergeler aşağıdaki bölümlerde özetlenmiştir.

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

- Tüm renk, spacing, gradient, tipografi tokenları `src/shared/styles/styleConstants.ts` içinde toplanmıştır. Yeni bileşenler oluştururken mutlaka bu sabitleri kullanın.
- `styleHelpers.ts` durum/request/role rozetleri gibi tekrar eden inline stiller için yardımcı fonksiyonlar içerir; yeni badge ihtiyacınız olduğunda buraya helper ekleyin.
- `componentStyles.ts` AppLayout, PageContainer, list/table/grid düzenleri ve filtre toolbar’larının templatelerini barındırır; yeni layout veya tablo oluştururken bu objeleri genişletin.
- Ant Design tema overrides’ı `src/shared/config/theme.ts` üzerinden yapılır. `ConfigProvider` token’larını güncellerken `colorPalette` ile senkron kalın.
- `src/index.css` global resetleri ve tipografiyi yönetir; yeni global stil eklemeniz gerekiyorsa önce burada kontrol edin.
- **İyileştirme önerileri:** `PageContainer`/`SectionCard` gibi bileşenlere `className` prop’u ekleyip tema katmanını genişletin, ayrıca `componentStyles` içindeki grid/table preset’leri için Storybook veya dokümantasyon kartları hazırlayın.

## Kullanım Rehberi

- Yeni feature için klasör yapısı: `features/<feature>/{model,ui,data,pages}`. Paylaşılan veri/typelar `model`, mock/seed verileri `data`, UI bileşenleri `ui`, sayfalar `pages`.
- Rota eklerken `src/shared/config/routes.ts`’te `layout`, `roles`, `menuGroup`, `menuIcon` ve `groupRoot` alanlarını doldurun. Auth sayfaları için `layout: "auth"` ve `showInMenu: false` kullanın.
- `AppLayout` yan menüde hangi grupların gösterileceğini `GROUP_ORDER` ile belirler; yeni grup oluşturursanız bu listeye eklemeyi unutmayın.
- Global state: Redux store’da `ui` slice’ı (ör. sidebar durumu) bulunur. `useAppSelector` / `useAppDispatch` ile erişin.
- Auth: `AuthProvider` ve `useAuth` context’i login/logout bilgisini sağlar; role bazlı yetki için `appRoutes` üzerindeki `roles` alanını kullanın.
- HTTP katmanı: `src/shared/api/httpClient.ts` fetch helper’ı, `apiClient.ts` axios instance’ı içerir. Yeni servisler için `apiGet/apiPost` helper’larını kullanın.

## Gelecek Adımlar & Notlar

1. API ve auth entegrasyonu (axios instance/interceptor, `useAuth` için gerçek backend).
2. Form bileşenleri + validasyon (örn. yup/zod).
3. Error boundary + analytics (sayfa görüntülenme / logging).
4. Unit/integration test altyapısı (vitest + React Testing Library önerilir).

`REFACTORING_NOTES.md` şu anda proje yapısını açıklıyor; öncekilere göre güncel değilse içeriğini README’e taşıyıp dosyayı arşivleyebiliriz.
