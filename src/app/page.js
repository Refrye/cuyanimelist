import Link from "next/link";
import AnimeList from "@/components/animeList";
import { Button } from "@/components/ui/button";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/lib/api";

const Home = async () => {
  let anime = null;
  let recommendations = null;

  try {
    anime = await getAnimeResponse("top/anime", "limit=8");
  } catch (err) {
    console.error("Failed to fetch popular anime:", err);
  }

  try {
    recommendations = await getNestedAnimeResponse("recommendations/anime", "entry");
    recommendations = reproduce(recommendations, 8);
  } catch (err) {
    console.error("Failed to fetch recommendations:", err);
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
        {anime.data.map((data) => (
          <AnimeList
            key={data.mal_id}
            id={data.mal_id}
            title={data.title}
            images={data.images?.webp?.image_url || data.images?.jpg?.image_url || "/placeholder.jpg"}
          />
        ))}
      </div>

      {/* Rekomendasi Section */}
      <div className="border-t pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Rekomendasi Anime</h2>
          <Button asChild variant="outline">
            <Link href="/recommendations">
              Lihat Semua
            </Link>
          </Button>
        </div>

        {!recommendations || !Array.isArray(recommendations.data) ? (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-600">Tidak dapat memuat rekomendasi anime saat ini.</p>
            <p className="text-sm text-gray-600 mt-2">Rekomendasi akan muncul ketika data tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.data.map((rec, index) => (
              <AnimeList
                key={`${rec.mal_id}-${index}`}
                id={rec.mal_id}
                title={rec.title}
                images={rec.images?.webp?.image_url || rec.images?.jpg?.image_url || "/placeholder.jpg"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
