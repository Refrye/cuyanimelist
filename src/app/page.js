import Link from "next/link";
import AnimeList from "@/app/components/animeList";

const Home = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`,
    {
      cache: "no-store", // biar data selalu fresh
    }
  );

  const anime = await response.json();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header + Lihat Semua */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paling Populer</h1>
        <Link
          href="/populer"
          className="text-indigo-600 hover:text-indigo-800 underline transition"
        >
          Lihat Semua
        </Link>
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
