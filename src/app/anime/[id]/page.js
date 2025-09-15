import Image from "next/image";

// ini halaman detail anime
const AnimeDetail = async ({ params }) => {
  const { id } = params;

  // fetch data dari Jikan API by ID
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
    cache: "no-store",
  });
  const { data } = await res.json();

  // safe image URL
  const imageUrl = data?.images?.webp?.large_image_url || data?.images?.jpg?.image_url || "/favicon.ico";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* image container: relative so next/image fill works, set aspect ratio for consistency */}
        <div className="w-full md:w-72 lg:w-80 relative rounded-lg overflow-hidden shadow-lg flex-shrink-0" style={{ aspectRatio: "2/3" }}>
          <Image
            src={imageUrl}
            alt={data?.title || "Anime image"}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-600 italic mb-4">{data.title_japanese}</p>

          <p className="mb-4">{data.synopsis}</p>

          <ul className="text-sm space-y-2">
            <li><strong>Episodes:</strong> {data.episodes || "N/A"}</li>
            <li><strong>Status:</strong> {data.status}</li>
            <li><strong>Score:</strong> {data.score || "Not Rated"}</li>
            <li><strong>Year:</strong> {data.year || "Unknown"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
