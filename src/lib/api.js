const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.jikan.moe/v4";

/**
 * Reusable API call function
 * @param {string} endpoint - API endpoint path, e.g. "/top/anime?limit=8"
 * @param {object} options - fetch options
 * @returns {Promise<object>} - parsed JSON response
 */
export async function apiFetch(endpoint, options = {}) {
  const url = baseUrl + endpoint;
  try {
    const response = await fetch(url, {
      cache: "no-store",
      ...options,
    });
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
