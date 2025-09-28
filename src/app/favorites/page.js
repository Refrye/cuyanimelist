'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Star, 
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import AnimeList from "@/components/animeList";

export default function Favorites() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch this data from your backend
  useEffect(() => {
    if (session?.user) {
      // Mock favorites data
      setFavorites([
        {
          mal_id: 4,
          title: "Death Note",
          images: { webp: { image_url: "/placeholder.jpg" } },
          score: 9.0,
          episodes: 37,
          status: "Finished Airing"
        },
        {
          mal_id: 5,
          title: "Demon Slayer",
          images: { webp: { image_url: "/placeholder.jpg" } },
          score: 8.7,
          episodes: 44,
          status: "Ongoing"
        }
      ]);
      setLoading(false);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading favorites...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <Card className="p-8">
          <AlertCircle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
          <CardTitle className="text-xl mb-2">Sign in Required</CardTitle>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your favorites.</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => signIn("github")}>
              Sign in with GitHub
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="text-red-500" />
          My Favorites
        </h1>
        <Badge variant="secondary">{favorites.length} items</Badge>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading your favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <Card className="p-8 text-center">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <CardTitle className="text-xl mb-2">No favorites yet</CardTitle>
          <p className="text-muted-foreground mb-6">Add anime to your favorites to save your top picks</p>
          <Button asChild>
            <Link href="/top-anime">Browse Top Anime</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((anime) => (
            <div key={anime.mal_id} className="relative">
              <AnimeList
                id={anime.mal_id}
                title={anime.title}
                images={anime.images?.webp?.image_url || "/placeholder.jpg"}
              />
              <Button 
                size="icon" 
                variant="destructive" 
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => {
                  // In a real app, you would call an API to remove from favorites
                  setFavorites(favorites.filter(item => item.mal_id !== anime.mal_id));
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="mt-1 flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  {anime.score}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {anime.episodes} eps
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}