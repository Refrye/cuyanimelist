import AnimeList from "@/components/animeList";
import { apiFetch } from "@/lib/api";

const SearchPage = async ({ searchParams }) => {
// ambil query dari URL
const query = searchParams?.query || "";

if (!query) {
return (
    <div className="p-6 mx-auto max-w-7xl">
    <h1 className="mb-4 text-2xl font-bold">Pencarian Anime</h1>
    <p className="text-gray-600">Silakan masukkan kata kunci anime di kolom pencarian.</p>
    </div>
);
}

// Check if query is a genre filter
const isGenreQuery = query.startsWith("genre:");
let anime = null;

try {
    if (isGenreQuery) {
        const genreName = query.slice(6); // Remove "genre:" prefix
        // Fetch genres to get genre ID
        const genres = await apiFetch("/genres/anime");
        const genre = genres.data.find(g => g.name.toLowerCase() === genreName.toLowerCase());
        if (genre) {
            // Fetch anime by genre ID
            anime = await apiFetch(`/anime?genres=${genre.mal_id}&limit=12`);
        } else {
            // Genre not found
            anime = { data: [] };
        }
    } else {
        // Regular search
        anime = await apiFetch(`/anime?q=${encodeURIComponent(query)}&limit=12`);
    }
} catch (err) {
    console.error("Search fetch failed:", err);
    anime = null;
}

return (
<div className="p-6 mx-auto max-w-7xl">
    <h1 className="mb-6 text-2xl font-bold">
    Hasil Pencarian: <span className="text-indigo-600">"{query}"</span>
    </h1>

    {!anime || !Array.isArray(anime.data) ? (
    <p className="text-gray-600">Gagal memuat hasil pencarian. Silakan coba lagi nanti.</p>
    ) : anime.data.length === 0 ? (
    <p className="text-gray-600">Anime dengan kata kunci "{query}" tidak ditemukan.</p>
    ) : (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {anime.data.map((data) => (
        <AnimeList
            key={data.mal_id}
            id={data.mal_id}
            title={data.title}
            images={data.images.webp.image_url}
            synopsis={data.synopsis || "Sinopsis tidak tersedia."}
            trailerUrl={data.trailer?.embed_url || null}
        />
        ))}
    </div>
    )}
</div>
);
};

export default SearchPage;
