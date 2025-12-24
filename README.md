# Portal Template

Modüler, ölçeklenebilir ve kurumsal React başlangıç seti.

##  Hızlı Başlangıç

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
npm run lint     # Lint kontrolü
```

##  Teknoloji Yığını

| Amaç | Teknoloji |
|------|-----------|
| UI Framework | React 19 + Ant Design 5 |
| Dil | TypeScript 5.9 (Strict) |
| Build Tool | Vite 7 |
| State Management | Redux Toolkit |
| Routing | React Router 7 |
| HTTP Client | Axios |
| Rich Text | Tiptap 3 |

##  Proje Yapısı

**Detaylı mimarı rehberi için:** [ARCHITECTURE.md](ARCHITECTURE.md)

```
src/
 app/              # Redux store & router
 features/         # Feature modules
 shared/           # Ortak kaynaklar
 assets/           # Statik dosyalar
```

##  Konfigürasyon

`.env` dosyası oluştur:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Portal
```

##  Temel Özellikler

-  **Merkezi Stil Sistemi** - Design tokens + tema presetleri
-  **Merkezi Mock Data** - Tüm mock'lar bir yerde
-  **Type Safety** - Full TypeScript coverage
-  **Feature-based Modüler** - Ölçeklenebilir yapı
-  **Responsive Design** - Mobile + Desktop
-  **API Entegrasyonuna Hazır** - Axios + error handling

##  Başlıca Özellikler

### Bilet Sistemi
- Liste ve detay görünümü
- Mobil kart view
- Yorum ve efor takibi
- Rich text editör

### Dashboard & Sidebar
- İstatistik kartları
- Responsive drawer modu
- Tema presetleri: Default, Slate, Midnight, Ocean
- Smooth animasyonlar

### Hata Yönetimi
- Global ErrorBoundary
- 500 ekranı ve yenile aksiyonu

##  Yetkilendirme

- Route bazlı rol kontrolü
- Mock giriş: admin, worker, user rolleri

##  Dökümanlar

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Mimarı rehberi, best practices
- **[API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)** - Mock  API geçişi

##  Komutlar

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run lint     # Statik analiz
```

---

*Son güncelleme: 24 Aralık 2025*
