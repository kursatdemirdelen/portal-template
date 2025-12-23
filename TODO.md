# 📋 Geliştirme Yapılacaklar

Bu dosya, projenin iyileştirme ve geliştirme listesini içerir.

---

## 🧹 Temizlik

- [x] `shared/ui/PlaceholderPage.tsx` - ✅ Silindi
- [x] `shared/ui/index.ts` → ✅ PlaceholderPage export kaldırıldı
- [x] Mock API delays - ✅ Tüm `setTimeout` bloklarını kaldırıldı (userService, permissionService)
- [x] TODO/FIXME yorumları - ✅ 9 actionable comment güncellendi ve açıklık sağlandı
- [x] Style file consolidation - ✅ Merkezi `detailStyles.ts` sistemi oluşturuldu (550 satır)
- [x] Duplicate components - ✅ 6 eski component silinip, paylaşılan sistem kuruldu
- [x] Kod yorumları Türkçeleştirildi - ✅ Proje dilsel tutarlılığı sağlandı

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
- [x] Sayfalarda Skeleton loader (Users, Tickets)
- [ ] Tablo yüklenirken spinner
- [ ] Button loading state

### Empty States
- [x] Boş liste görselleri ✅ (EmptyTicketList)
- [x] "Veri bulunamadı" mesajları ✅
- [x] Aksiyon önerileri ✅ (Yeni bilet oluştur butonu)

### Error Handling
- [x] Global error boundary
- [ ] Hata sayfası (404, 500)
- [ ] Toast bildirimleri (başarı/hata)

### Genel
- [x] Dark mode desteği (toggle + CSS vars)
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
- [x] Code Splitting / Lazy Loading ✅
  - [x] React.lazy ile route bazlı splitting
  - [x] Vite config'de vendor chunks (react, antd, tiptap, icons)
  - [x] Suspense fallback'ler
  - [x] `chunkSizeWarningLimit` 1500
- [x] HTTP Client Consolidation ✅ (httpClient.ts silindi)
- [x] CSS Refactoring ✅ (globals.css sadeleştirildi, duplicate'ler kaldırıldı)

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

- ✅ **API entegrasyonuna hazır**: HTTP client konsolide edildi, mock services merkezi noktada
- ✅ **Kod kalitesi iyileşti**: CSS duplicate'leri temizlendi, hardcoded değerler ortadan kaldırıldı
- Öncelik sırası ihtiyaca göre güncellenebilir

## ▶️ Yakın Yol Haritası

**Yüksek Öncelik:**
- [ ] Toast notifications (başarı/hata/uyarı)
- [ ] Projects detay sayfası (Tickets gibi)
- [ ] Time Tracking aktif timer
- [ ] 404/500 error pages

**Orta Öncelik:**
- [ ] Tickets dışındaki sayfalarda Skeleton/Empty standardizasyonu
- [ ] URL query params ile filtre saklama
- [ ] Ortak hook'lar (`useDebounce`, `useLocalStorage`, `useMediaQuery`)

**Düşük Öncelik:**
- [ ] Ant Design icon chunk'ını optimize etme
- [ ] Global arama (Cmd+K)
- [ ] Dashboard grafikleri ve trend analizi
- [ ] Mobil/tablet optimizasyonları

## 🧪 Komutlar

- `npm run dev`: Geliştirme sunucusu
- `npm run build`: Production derleme
- `npm run preview`: Production build önizleme
- `npm run lint`: ESLint ile statik analiz

---

*Son güncelleme: 24 Aralık 2025*
