# TODO: Implement Seasonal and Genres Pages

## Tasks
- [x] Create src/app/seasonal/page.js to fetch and display current seasonal anime with pagination
- [x] Create src/app/top-anime/page.js to fetch and display current top-anime anime with pagination
- [x] Create src/app/genres/page.js to fetch and display anime genres, allowing browsing by genre
- [ ] Test navigation to ensure links work correctly
- [ ] Verify API endpoints and error handling

## Notes
- Use similar structure to src/app/populer/page.js for consistency
- Fetch seasonal anime from /seasons/now endpoint
- For genres, fetch from /genres/anime and display as links or selectable options
