import AnimeList from "@/components/animeList";

const SearchPage = async ({ searchParams }) => {
// ambil query dari URL
const query = searchParams?.query || "";

if (!query) {
return (
    <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Pencarian Anime</h1>
    <p className="text-gray-600">Silakan masukkan kata kunci anime di kolom pencarian.</p>
    </div>
);
}

// Fetch data dari Jikan API dengan fallback dan error handling
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.jikan.moe/v4";

let anime = null;
try {
    const response = await fetch(`${baseUrl}/anime?q=${encodeURIComponent(query)}&limit=12`, { cache: "no-store" });
    if (!response.ok) throw new Error(`API responded with ${response.status}`);
    anime = await response.json();
} catch (err) {
    console.error("Search fetch failed:", err);
}

return (
<div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">
    Hasil Pencarian: <span className="text-indigo-600">"{query}"</span>
    </h1>

    {!anime || !Array.isArray(anime.data) ? (
    <p className="text-gray-600">Gagal memuat hasil pencarian. Silakan coba lagi nanti.</p>
    ) : anime.data.length === 0 ? (
    <p className="text-gray-600">Anime dengan kata kunci "{query}" tidak ditemukan.</p>
    ) : (
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
    )}
</div>
);
};

export default SearchPage;
