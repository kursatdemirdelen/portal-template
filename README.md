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
-  **Authentication** - JWT token, rol bazında korumalı rotalar

##  Başlıca Özellikler

- 🔐 **JWT Authentication** - Token tabanlı, rol bazlı yetkilendirme
- 🎨 **Design System** - Merkezi stil tokenleri ve tema presetleri
- 📦 **Modüler Yapı** - Feature-based mimarı, ölçeklenebilir
- 🔄 **API Ready** - Axios client, mock ↔ gerçek API geçişi hazır
- 📊 **Bilet Sistemi** - Liste, detay, yorum, efor takibi
- 📱 **Responsive** - Mobile-first tasarım

**Detaylı bilgi:**
- 🏗️ [Mimarı Rehberi](ARCHITECTURE.md) - Test credentials, best practices
- 🔌 [API Entegrasyonu](API_INTEGRATION_GUIDE.md) - Backend bağlantısı

##  📚 Hızlı Linkler

| İçerik | Link |
|--------|------|
| Mimarı & Best practices | [ARCHITECTURE.md](ARCHITECTURE.md) |
| API Entegrasyonu | [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) |
| Yol Haritası | [TODO.md](TODO.md) |

##  Komutlar

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run lint     # Statik analiz
```

---

*Son güncelleme: 5 Ocak 2026*
