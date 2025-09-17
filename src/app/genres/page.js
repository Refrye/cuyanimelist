import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

const GenresPage = async () => {
  let genres = null;
  try {
    genres = await apiFetch("/genres/anime");
  } catch (err) {
    console.error("Failed to fetch genres:", err);
  }

  if (!genres || !Array.isArray(genres.data)) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Genres Anime</h1>
        <p className="text-red-600">Gagal memuat data genres.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Genres Anime</h1>

      {/* Grid genres */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.data.map((genre) => (
          <Button
            key={genre.mal_id}
            asChild
            variant="outline"
            className="h-16 flex items-center justify-center text-center"
          >
            <Link href={`/search?query=genre:${genre.name}`}>
              {genre.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
