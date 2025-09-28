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
import { getNestedAnimeResponse, reproduce } from "@/lib/api";

const RecommendationsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 12;

  let recommendations = null;
  try {
    // Get all recommendations and handle pagination client-side
    recommendations = await getNestedAnimeResponse("recommendations/anime", "entry");
    recommendations = reproduce(recommendations, 50); // Get more data for pagination
  } catch (err) {
    console.error("Failed to fetch recommendations:", err);
  }

  if (!recommendations || !Array.isArray(recommendations.data)) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Rekomendasi Anime</h1>
        <p className="text-red-600">Gagal memuat data rekomendasi anime.</p>
      </div>
    );
  }

  // Calculate pagination for client-side
  const totalItems = recommendations.data.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentRecommendations = recommendations.data.slice(startIndex, endIndex);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Rekomendasi Anime</h1>

      {/* Grid anime */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentRecommendations.map((rec, index) => (
          <AnimeList
            key={`${rec.mal_id}-${index}`}
            id={rec.mal_id}
            title={rec.title}
            images={rec.images?.webp?.image_url || rec.images?.jpg?.image_url || "/placeholder.jpg"}
          />
        ))}
      </div>

      {/* Pagination shadcn */}
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            {hasPreviousPage && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/recommendations?page=${currentPage - 1}`}
                />
              </PaginationItem>
            )}

            {/* Current page */}
            <PaginationItem>
              <PaginationLink href={`/recommendations?page=${currentPage}`} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {/* Next */}
            {hasNextPage && (
              <PaginationItem>
                <PaginationNext
                  href={`/recommendations?page=${currentPage + 1}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RecommendationsPage;
