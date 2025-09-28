import { auth } from "@/lib/auth";
import { 
  getUserById, 
  addToWatchlist, 
  removeFromWatchlist,
  getWatchlist,
  addToFavorites,
  removeFromFavorites,
  getFavorites
} from "@/lib/user";

export async function GET(request) {
  const session = await auth();
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  
  try {
    switch (action) {
      case "watchlist":
        const watchlist = getWatchlist(session.user.id);
        return Response.json(watchlist);
        
      case "favorites":
        const favorites = getFavorites(session.user.id);
        return Response.json(favorites);
        
      default:
        const user = getUserById(session.user.id);
        return Response.json(user);
    }
  } catch (error) {
    return Response.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await auth();
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const { action, anime } = await request.json();
    
    switch (action) {
      case "addToWatchlist":
        const updatedWatchlist = addToWatchlist(session.user.id, anime);
        return Response.json(updatedWatchlist);
        
      case "removeFromWatchlist":
        const newWatchlist = removeFromWatchlist(session.user.id, anime.mal_id);
        return Response.json(newWatchlist);
        
      case "addToFavorites":
        const updatedFavorites = addToFavorites(session.user.id, anime);
        return Response.json(updatedFavorites);
        
      case "removeFromFavorites":
        const newFavorites = removeFromFavorites(session.user.id, anime.mal_id);
        return Response.json(newFavorites);
        
      default:
        return Response.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: "Failed to update user data" }, { status: 500 });
  }
}