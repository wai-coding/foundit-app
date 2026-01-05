const STORAGE_KEY = "foundit_favorites";

// Get favorite ids from localStorage
export function getFavoriteIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

// Toggle favorite (add/remove)
export function toggleFavorite(id) {
  const favs = getFavoriteIds();
  const strId = String(id);

  const updatedFavs = favs.includes(strId)
    ? favs.filter((favId) => favId !== strId)
    : [...favs, strId];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavs));
  return updatedFavs;
}

// Check if product is favorite
export function isFavorite(id) {
  return getFavoriteIds().includes(String(id));
}
