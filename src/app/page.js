import Link from "next/link";
import AnimeList from "@/components/animeList";
import { Button } from "@/components/ui/button";

const Home = async () => {
    // fallback ke Jikan API jika env var tidak diset
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.jikan.moe/v4";

    let anime = null;
    try {
        const response = await fetch(`${baseUrl}/top/anime?limit=8`, {
            cache: "no-store", // biar data selalu fresh
        });

        if (!response.ok) {
            throw new Error(`API responded with ${response.status}`);
        }

        anime = await response.json();
    } catch (err) {
        // Log error ke server console (Next.js server)
        console.error("Failed to fetch popular anime:", err);
    }

    // Jika fetch gagal, tampilkan UI pemberitahuan agar tidak crash
    if (!anime || !Array.isArray(anime.data)) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Paling Populer</h1>
                    <Button asChild variant="outline">
                        <Link href="/populer">
                            Lihat Semua
                        </Link>
                    </Button>
                </div>

                <div className="p-6 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-600">Gagal memuat data anime. Silakan periksa koneksi atau konfigurasi API.</p>
                    <p className="text-sm text-gray-600 mt-2">Coba set environment variable <code>NEXT_PUBLIC_API_BASE_URL</code> atau periksa apakah API eksternal sedang down.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header + Lihat Semua */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Paling Populer</h1>
                <Button asChild variant="outline">
                    <Link href="/populer">
                        Lihat Semua
                    </Link>
                </Button>
            </div>

            {/* Grid anime populer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {anime.data.map((data) => (
                    <AnimeList
                        key={data.mal_id}
                        id={data.mal_id}
                        title={data.title}
                        images={data.images.webp.image_url}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
