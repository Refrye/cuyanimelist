export default function Loading() {
  return (
    <div className="p-6 max-w-6xl mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster Skeleton */}
        <div
          className="w-full md:w-72 lg:w-80 bg-gray-300 rounded-lg shadow-lg flex-shrink-0"
          style={{ aspectRatio: "2/3" }}
        ></div>

        {/* Info Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          <ul className="mt-4 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="h-4 bg-gray-200 rounded w-1/3"></li>
            ))}
          </ul>

          <div className="mt-6 h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Trailer Skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>
        <div className="aspect-video bg-gray-300 rounded-lg shadow-lg"></div>
      </div>
    </div>
  );
}
