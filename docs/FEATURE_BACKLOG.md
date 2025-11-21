# Feature Backlog

Bu doküman her feature için henüz tamamlanmamış işlerin özetini içerir. Yeni gereksinimler geldikçe güncelleyiniz.

## Tickets
- Mock data `features/tickets/data` üzerinden geliyor; REST servislerine bağlanmalı (liste, detay, filtre, departman bazlı sorgular).
- Ticket detay/güncelleme modalı ve “yeni ticket” akışı (create form + doğrulama) eksik.
- Rol bazlı görünüm (customer vs. internal) senaryoları tasarlanmadı.

## Projects
- Sadece kart listesi var; proje detay sayfası, filtreleme ve durum raporları eklenmeli.
- Activity/timeline verisi dashboard ile paylaşılmak yerine proje modülünde API’den alınmalı.
- Proje ekleme/düzenleme akışı henüz yok.

## Leaves
- Balance/holiday verileri mock; gerçek API’ye bağlanması ve izin talep etme/iptal etme akışlarının eklenmesi gerekiyor.
- Onay süreçleri ve rol bazlı (manager vs. user) ekran farklılaşmaları tasarlanmalı.
- Takvim entegrasyonu (ör. şirket tatil günleri) planlanmalı.

## Assignments
- Liste + ekipman bilgisi var; aksiyon butonları (tamamla, düzenle, devral) işlevsiz.
- Zimmet oluşturma/devir alma modalları ve log geçmişi detayları eksik.
- API ile senkronizasyon ve rol bazlı kısıtlar (admin vs. user) tanımlanmalı.

## Time Tracking
- Tablo/istatistikler mock; çalışma saatleri, timer ve rapor export fonksiyonları hayata geçirilmeli.
- Yöneticiler için ekip filtresi ve hedef yönetimi gereksinimleri belirlenmeli.
- Bildirim/SLA entegrasyonu planlanmalı.

## Dashboard
- Widget verileri statik; gerçek API kaynaklarına bağlanmalı ve role göre widget görünürlüğü ayarlanmalı.
- Performans için lazy-loading veya skeleton stratejileri eklenebilir.
- KPI/Trend grafikleri için tasarım kararları alınmalı.

## Auth
- Login UI hazır fakat `/login` rotası yeni eklendi; logout, session yenileme, role yönetimi backend ile entegre edilmeli.
- Şifre sıfırlama, MFA gibi ileri özellikler planlanmalı.

## Placeholders
- Customers, Parameters, Approvals vb. ekranlar tamamen şablon; gerçek domain gereksinimleri çıkarılmalı.
- Menüde görünen bu sayfalar için API sözleşmeleri ve komponent hiyerarşisi tanımlanmalı.

## Shared Layer
- httpClient/apiClient servislerinin hata yönetimi/güncelleme token logic’i genişletilmeli.
- UI kit tarafında tekrar eden pattern’ler (tablo header, filtre bar, dialogs) takip edilip `shared/ui` altına alınmalı.
- Global tema ve token yönetimi Ant Design `ConfigProvider` üzerinden merkezi hale getirilmeli.
