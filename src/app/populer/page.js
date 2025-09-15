import Link from "next/link";
import AnimeList from "@/components/animeList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const PopulerPage = async ({ searchParams }) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.jikan.moe/v4";

  const currentPage = Number(searchParams.page) || 1;
  const limit = 12;

  let anime = null;
  try {
    const response = await fetch(
      `${baseUrl}/top/anime?page=${currentPage}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    anime = await response.json();
  } catch (err) {
    console.error("Failed to fetch popular anime:", err);
  }

  if (!anime || !Array.isArray(anime.data)) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Anime Populer</h1>
        <p className="text-red-600">Gagal memuat data anime populer.</p>
      </div>
    );
  }

  const hasNextPage = anime.pagination?.has_next_page;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Anime Populer</h1>

      {/* Grid anime */}
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

      {/* Pagination shadcn */}
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/populer?page=${currentPage - 1}`}
                />
              </PaginationItem>
            )}

            {/* Current page (bisa dikembangkan jadi banyak nomor halaman) */}
            <PaginationItem>
              <PaginationLink href={`/populer?page=${currentPage}`} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {/* Next */}
            {hasNextPage && (
              <PaginationItem>
                <PaginationNext
                  href={`/populer?page=${currentPage + 1}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PopulerPage;
