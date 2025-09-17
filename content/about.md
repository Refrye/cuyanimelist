# 🎌 Anime Discovery Website

Website untuk menjelajahi dunia anime, dibangun dengan teknologi modern dan desain yang elegan.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![Jikan API](https://img.shields.io/badge/Jikan-API-ED1C24?style=for-the-badge)

## ✨ Fitur Unggulan

- 🎬 **Anime Populer** - Lihat daftar anime trending dengan informasi terkini
- 📺 **Detail Lengkap** - Sinopsis, trailer, genre, studio, dan informasi detail lainnya
- 🔍 **Pencarian Anime** - Temukan anime berdasarkan judul atau kata kunci
- 🌙 **Dark/Light Mode** - Toggle tema dengan persistensi preferensi pengguna
- 📱 **Responsif** - Desain adaptif untuk semua perangkat (desktop, tablet, mobile)
- ⚡ **Performansi Tinggi** - Load cepat berkat Next.js App Router dan optimisasi
- 🎨 **UI Modern** - Desain clean menggunakan shadcn/ui dan Tailwind CSS

## 🛠 Teknologi yang Digunakan

- **Framework**: [Next.js 14](https://nextjs.org/) dengan App Router
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [Jikan API](https://jikan.moe/) (Unofficial MyAnimeList API)
- **Deployment**: [Vercel](https://vercel.com/) (Recommended)

## 🌐 API Reference

Website ini menggunakan [Jikan API v4](https://docs.api.jikan.moe/) untuk mendapatkan data anime:

- `GET /v4/top/anime` - Mendapatkan anime populer
- `GET /v4/anime/{id}` - Mendapatkan detail anime berdasarkan ID
- `GET /v4/anime?q={query}` - Mencari anime berdasarkan query

Contoh penggunaan:
```typescript
// Mengambil anime populer
const response = await fetch('https://api.jikan.moe/v4/top/anime')
const data = await response.json()
```

## 🎨 Customization

### Menambahkan Tema Warna Baru
Edit file `src/lib/utils.ts` untuk menambahkan tema warna baru:

```typescript
export const themes = [
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "system", label: "System", icon: Monitor },
]
```

### Modifikasi Komponen
Semua komponen shadcn/ui dapat dimodifikasi dengan mudah melalui file komponen di `src/components/ui/`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub repository
2. Import project di [Vercel](https://vercel.com/)
3. Deploy otomatis akan dilakukan

## 🤝 Berkontribusi

Kontribusi selalu diterima! Silakan:

1. Fork project ini
2. Buat branch untuk fitur Anda (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini dibuat untuk tujuan edukasi dan bukan affiliated dengan MyAnimeList atau Jikan API. Data yang ditampilkan merupakan properti dari MyAnimeList dan konten creator terkait.

---

**Disclaimer**: Website ini dibuat sebagai project pembelajaran untuk menguasai Next.js App Router, TypeScript, dan modern web development. Bukan website resmi MyAnimeList.