# 📺 MyAnimeList Clone (Next.js + Jikan API)

>    Project ini saya kembangkan untuk mendalami **Next.js 15+ (App Router)** sekaligus belajar memproses dan parsing data dari internet menggunakan **[Jikan API](https://jikan.moe/)**.


## ✨ Features

- 🔎 Cari anime populer menggunakan Jikan API  
- 📖 Detail halaman anime  
- 🎨 UI responsif dengan Tailwind CSS  
- ⚡ Data selalu fresh (no-store fetch)

## 🚀 Tech Stack

- [Next.js 13+](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jikan API](https://jikan.moe/)



Clone repo ini lalu install dependency:

```bash

git clone https://github.com/Refrye/animelist.git

cd animelist
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

📂 Project Structure
```folder
src/
 ├─ app/
 │   ├─ components/   # Reusable components
 │   ├─ populer/      # Halaman anime populer
 │   ├─ search/       # Halaman hasil pencarian
 │   └─ layout.js     # Root layout
 └─ public/           # Static assets
```

![MyAnimeList Preview](./docs/sc-anime-1.png)