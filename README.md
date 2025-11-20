# Portal Template (React + TypeScript + Vite)

Minimal, modüler ve okunabilir bir portal başlangıç teması. Ant Design ile sade bir UI, merkezileştirilmiş stil sistemi ve feature-based klasörleme kullanır.

## Başlarken

- Bağımlılıklar: `npm install`
- Geliştirme: `npm run dev` (Vite dev server)
- Build: `npm run build`
- Önizleme: `npm run preview`

## Yapı Özeti

- `src/app` — Router, layout ve korumalı rota yapısı
- `src/features` — Özellik bazlı sayfalar (dashboard, tickets, assignments, time-tracking vb.)
- `src/shared/config` — Tema ve rota konfigürasyonları
- `src/shared/styles` — Stil sabitleri, yardımcılar ve bileşen stil konfigleri
- `src/shared/ui` — Ortak UI bileşenleri (PageContainer, SectionCard vb.)

## Navigasyon / Rotalar

`src/shared/config/routes.ts` içindeki menü sırası:

- Dashboard
- Bilet Oluştur, Biletler
- Profil, Müşteri, Parametreler Yönetimi
- Proje, Proje Ekibi, Scrum Board
- Kullanıcı Listesi, Kullanıcı Oluştur
- Zimmet Biçileri, Onay Süreçleri, Takıl Biçileri
- Puantaj, Logs, Çıkış
- Login (menüde gizli)

Not: Bazı rotalar henüz placeholder; ilgili sayfalar eklendikçe `EmptyPage` yerine gerçek bileşenleri bağlayın.

## Stil Sistemi

Tüm stil sabitleri `src/shared/styles/styleConstants.ts` içinde merkezileştirildi (renkler, gradyentler, spacing, tipografi vb.). Ant Design tema tokenları `src/shared/config/theme.ts` dosyasında özelleştirildi.

## Refaktör Notları

- Dashboard, alt bileşenlere bölünerek sadeleştirildi.
- Router ve ProtectedRoute okunabilir ve genişletilebilir hâle getirildi.
- Encode/label hataları temizlendi; menü isimleri Türkçe ve tutarlı.

Geliştirme sırasında yeni özellikleri `features/<feature>/` altında konumlandırın ve ilgili rotayı `src/shared/config/routes.ts` dosyasına ekleyin.
