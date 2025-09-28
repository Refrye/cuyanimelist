// Mock user data storage (in a real app, this would be a database)
let users = new Map();
let userWatchlists = new Map();
let userFavorites = new Map();

// User model functions
export const createUser = (userData) => {
  const userId = userData.id || Date.now().toString();
  const newUser = {
    id: userId,
    name: userData.name,
    email: userData.email,
    image: userData.image,
    createdAt: new Date().toISOString(),
    watchlist: [],
    favorites: [],
  };
  
  users.set(userId, newUser);
  userWatchlists.set(userId, []);
  userFavorites.set(userId, []);
  
  return newUser;
};

export const getUserById = (userId) => {
  return users.get(userId);
};

export const updateUser = (userId, updates) => {
  const user = users.get(userId);
  if (!user) return null;
  
  const updatedUser = { ...user, ...updates };
  users.set(userId, updatedUser);
  return updatedUser;
};

// Watchlist functions
export const getWatchlist = (userId) => {
  return userWatchlists.get(userId) || [];
};

export const addToWatchlist = (userId, anime) => {
  const watchlist = userWatchlists.get(userId) || [];
  const exists = watchlist.some(item => item.mal_id === anime.mal_id);
  
  if (!exists) {
    const updatedWatchlist = [...watchlist, anime];
    userWatchlists.set(userId, updatedWatchlist);
    
    // Also update user's watchlist reference
    const user = users.get(userId);
    if (user) {
      user.watchlist = updatedWatchlist;
    }
    
    return updatedWatchlist;
  }
  
  return watchlist;
};

export const removeFromWatchlist = (userId, animeId) => {
  const watchlist = userWatchlists.get(userId) || [];
  const updatedWatchlist = watchlist.filter(item => item.mal_id !== animeId);
  userWatchlists.set(userId, updatedWatchlist);
  
  // Also update user's watchlist reference
  const user = users.get(userId);
  if (user) {
    user.watchlist = updatedWatchlist;
  }
  
  return updatedWatchlist;
};

// Favorites functions
export const getFavorites = (userId) => {
  return userFavorites.get(userId) || [];
};

export const addToFavorites = (userId, anime) => {
  const favorites = userFavorites.get(userId) || [];
  const exists = favorites.some(item => item.mal_id === anime.mal_id);
  
  if (!exists) {
    const updatedFavorites = [...favorites, anime];
    userFavorites.set(userId, updatedFavorites);
    
    // Also update user's favorites reference
    const user = users.get(userId);
    if (user) {
      user.favorites = updatedFavorites;
    }
    
    return updatedFavorites;
  }
  
  return favorites;
};

export const removeFromFavorites = (userId, animeId) => {
  const favorites = userFavorites.get(userId) || [];
  const updatedFavorites = favorites.filter(item => item.mal_id !== animeId);
  userFavorites.set(userId, updatedFavorites);
  
  // Also update user's favorites reference
  const user = users.get(userId);
  if (user) {
    user.favorites = updatedFavorites;
  }
  
  return updatedFavorites;
};

// User stats
export const getUserStats = (userId) => {
  const user = users.get(userId);
  if (!user) return null;
  
  const watchlist = userWatchlists.get(userId) || [];
  const favorites = userFavorites.get(userId) || [];
  
  return {
    totalWatchlist: watchlist.length,
    totalFavorites: favorites.length,
    joinDate: user.createdAt,
  };
};