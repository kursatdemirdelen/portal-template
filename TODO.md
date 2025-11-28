# 📋 Geliştirme Yapılacaklar

Bu dosya, projenin iyileştirme ve geliştirme listesini içerir.

---

## 🧹 Temizlik

- [x] `shared/ui/PlaceholderPage.tsx` - ✅ Silindi
- [x] `shared/ui/index.ts` → ✅ PlaceholderPage export kaldırıldı

---

## 🔧 Feature Geliştirmeleri

### Approvals (Onaylar)
- [x] Onay listesi tablosu
- [x] Durum filtreleri (Bekleyen, Onaylanan, Reddedilen)
- [x] Onay/Red aksiyonları

### Leaves (İzinler)
- [x] İzin talebi formu
- [x] Onay süreci (yönetici onayı)
- [x] Takvim görünümü

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
- [x] Boş liste görselleri ✅ (EmptyTicketList)
- [x] "Veri bulunamadı" mesajları ✅
- [x] Aksiyon önerileri ✅ (Yeni bilet oluştur butonu)

### Error Handling
- [ ] Global error boundary
- [ ] Hata sayfası (404, 500)
- [ ] Toast bildirimleri (başarı/hata)

### Genel
- [ ] Dark mode desteği (opsiyonel)
- [x] Animasyon tutarlılığı ✅ (hover efektleri, transitions)
- [x] Mobil görünüm iyileştirmeleri ✅ (responsive grid, breakpoints)

---

## 📊 Dashboard Geliştirmeleri

- [ ] Bilet trend grafiği (haftalık/aylık)
- [ ] Proje ilerleme grafiği
- [x] Hızlı aksiyon butonları ✅ (QuickActions - rol bazlı)
- [ ] Son aktiviteler timeline
- [ ] Mini takvim widget

---

## 🛠️ Kod Kalitesi

### Build Optimizasyonu
- [ ] Code Splitting / Lazy Loading (Bundle 2MB → ~200-300KB chunks)
  - React.lazy ile route bazlı splitting
  - Vite config'de vendor chunks (react, antd, utils)
  - Suspense fallback'ler

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

*Son güncelleme: 28 Kasım 2025*
