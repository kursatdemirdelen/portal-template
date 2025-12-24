# 📋 Yapılacaklar & İyileştirmeler

## ✅ Tamamlanan İşler (Aralık 2025)

### Mimari Iyileştirmeler
- ✅ **Merkezi Stil Sistemi** - Design tokens'dan renkler kullanılıyor
- ✅ **Merkezi Mock Data** - `src/shared/data/mocks/` sistemi
- ✅ **Mock Consolidation** - Feature mock'ları merkeze taşındı
  - approvals, project-teams, tickets
- ✅ **Renk Tutarlılığı** - Hardcoded hex değerler token'larla değiştirildi
- ✅ **Build Fix** - TypeScript & type errors düzeltildi

### Kod Kalitesi
- ✅ Unused mock data kaldırıldı (`ticketDetail.ts`)
- ✅ Build başarıyla tamamlanıyor
- ✅ Type safety %100

---

## 📈 Sonraki Adımlar

### Feature Geliştirmeleri
- [ ] Time Tracking - Aktif timer
- [ ] Projects - Detay sayfası iyileştirmeler
- [ ] Assignments - Görev atama formu
- [ ] Dashboard - Grafikler ve analytics

### Performans
- [ ] Infinite scroll (listeler için)
- [ ] Virtual scroll (büyük tablolar)
- [ ] Image optimization
- [ ] Bundle size monitoring

### Kullanıcı Deneyimi
- [ ] Toast notifications
- [ ] Advanced filters
- [ ] Bulk actions (seçili öğeleri işle)
- [ ] Keyboard shortcuts

### API Entegrasyonu
- [ ] Backend'e API çağrıları
- [ ] Error handling & retry logic
- [ ] Loading states standardizasyonu
- [ ] Caching & offline support

---

## 🎯 Başlangıç Noktası

**Yeni geliştirici için:**
1. `/docs/ARCHITECTURE.md` oku
2. `/docs/SETUP.md` ile kurulum yap
3. Mock data akışını anla: `src/shared/data/mocks/`
4. Bir feature module seç ve geliştir

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
