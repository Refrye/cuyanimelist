# TODO - Anime List Project

## Completed Tasks ✅
- [x] Added recommendations section to main page (`src/app/page.js`)
  - [x] Integrated Jikan API `/recommendations/anime` endpoint
  - [x] Added proper error handling for recommendations fetch
  - [x] Created separate section with header and "Lihat Semua" button
  - [x] Used same grid layout and styling as popular anime section
  - [x] Added visual separator (border-top) between sections

## Implementation Details
- **Data Structure**: Handles nested recommendation data structure (`rec.entry.mal_id`, `rec.entry.title`, etc.)
- **Error Handling**: Shows yellow warning message if recommendations fail to load
- **UI Design**: Consistent with existing design patterns
- **Performance**: Limited to 8 recommendations to match popular anime section
- **Responsive**: Uses same responsive grid classes as existing sections

## Next Steps (Optional)
- [x] Create dedicated recommendations page (`/recommendations/page.js`) for "Lihat Semua" button
- [x] Add pagination to recommendations page if needed
- [x] Test the implementation with development server
- [x] Verify error handling works correctly when API is down
- [x] Fix all remaining files using old `apiFetch` function
  - [x] Fixed `src/app/anime/[id]/page.js`
  - [x] Fixed `src/app/top-anime/page.js`
  - [x] Fixed `src/app/seasonal/page.js`
  - [x] Fixed `src/app/search/page.js`
  - [x] Fixed `src/app/genres/page.js`

## Notes
- The recommendations section is completely separate from popular anime
- Both sections can fail independently without affecting each other
- Uses the same `AnimeList` component for consistency
- Follows the existing code patterns and styling conventions
- All API calls now use the correct functions from `src/lib/api.js`
