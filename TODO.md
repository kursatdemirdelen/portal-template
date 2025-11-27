# 📋 Geliştirme Yapılacaklar

Bu dosya, projenin iyileştirme ve geliştirme listesini içerir.

---

## 🧹 Temizlik

- [ ] `shared/ui/PlaceholderPage.tsx` - Kullanılmıyor, silinecek
- [ ] `shared/ui/index.ts` → PlaceholderPage export kaldırılacak

---

## 🔧 Feature Geliştirmeleri

### Approvals (Onaylar)
- [ ] Onay listesi tablosu
- [ ] Durum filtreleri (Bekleyen, Onaylanan, Reddedilen)
- [ ] Onay/Red aksiyonları

### Leaves (İzinler)
- [ ] İzin talebi formu
- [ ] Onay süreci (yönetici onayı)
- [ ] Takvim görünümü

### Time Tracking (Zaman Takibi)
- [ ] Aktif timer (başlat/durdur)
- [ ] Haftalık özet grafiği
- [ ] Proje bazlı zaman raporu

### Projects (Projeler)
- [ ] Proje detay sayfası
- [ ] İlerleme grafiği
- [ ] Takım üyeleri listesi

### Assignments (Görevler)
- [ ] Görev atama formu
- [ ] Sürükle-bırak öncelik sıralaması
- [ ] Görev durumu değiştirme

---

## 🎨 UI/UX İyileştirmeleri

### Loading States
- [ ] Sayfalarda Skeleton loader
- [ ] Tablo yüklenirken spinner
- [ ] Button loading state

### Empty States
- [ ] Boş liste görselleri
- [ ] "Veri bulunamadı" mesajları
- [ ] Aksiyon önerileri

### Error Handling
- [ ] Global error boundary
- [ ] Hata sayfası (404, 500)
- [ ] Toast bildirimleri (başarı/hata)

### Genel
- [ ] Dark mode desteği (opsiyonel)
- [ ] Animasyon tutarlılığı
- [ ] Mobil görünüm iyileştirmeleri

---

## 📊 Dashboard Geliştirmeleri

- [ ] Bilet trend grafiği (haftalık/aylık)
- [ ] Proje ilerleme grafiği
- [ ] Hızlı aksiyon butonları
- [ ] Son aktiviteler timeline
- [ ] Mini takvim widget

---

## 🛠️ Kod Kalitesi

### Ortak Hook'lar
- [ ] `useDebounce` - Arama gecikmesi
- [ ] `useLocalStorage` - Yerel depolama
- [ ] `useMediaQuery` - Responsive kontrol
- [ ] `useTableConfig` - Ortak tablo ayarları

### Form Yönetimi
- [ ] Form pattern standardizasyonu
- [ ] Validasyon mesajları Türkçeleştirme
- [ ] Ortak form bileşenleri

### Error Handling
- [ ] Merkezi hata yönetimi
- [ ] API hata formatı standardizasyonu
- [ ] Retry mekanizması

---

## 👤 Profil Sayfası

- [ ] Avatar yükleme özelliği
- [ ] Şifre değiştirme formu
- [ ] Bildirim ayarları (çalışır toggle'lar)
- [ ] Oturum yönetimi

---

## 🔍 Arama ve Filtreleme

- [ ] Global arama (Cmd+K)
- [ ] URL query params ile filtre saklama
- [ ] Kaydedilmiş filtre kombinasyonları
- [ ] Arama geçmişi

---

## 📱 Responsive İyileştirmeler

- [ ] Tablet görünümü optimizasyonu
- [ ] Mobil tablo alternatifleri (kart view)
- [ ] Touch-friendly butonlar
- [ ] Swipe gesture desteği

---

## 📝 Notlar

- API entegrasyonu ayrı bir aşamada yapılacak
- Öncelik sırası ihtiyaca göre güncellenebilir
- Her tamamlanan madde [x] ile işaretlenecek

---

*Son güncelleme: 27 Kasım 2025*
