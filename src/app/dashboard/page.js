'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    Eye,
    Calendar,
    Star,
    Bookmark,
    Plus,
    Trash2
} from "lucide-react";
import AnimeList from "@/components/animeList";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [userStats, setUserStats] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [activeTab, setActiveTab] = useState('watchlist');

    // In a real app, you would fetch this data from your backend
    useEffect(() => {
        if (session?.user) {
            // Mock data - in a real app, this would come from your API
            setUserStats({
                totalWatchlist: 12,
                totalFavorites: 5,
                joinDate: "2024-01-15"
            });

            // Mock watchlist data
            setWatchlist([
                {
                    mal_id: 1,
                    title: "Cowboy Bebop",
                    images: { webp: { image_url: "/placeholder.jpg" } },
                    score: 9.5,
                    episodes: 26,
                    status: "Finished Airing"
                },
                {
                    mal_id: 2,
                    title: "Attack on Titan",
                    images: { webp: { image_url: "/placeholder.jpg" } },
                    score: 9.0,
                    episodes: 75,
                    status: "Finished Airing"
                },
                {
                    mal_id: 3,
                    title: "Fullmetal Alchemist: Brotherhood",
                    images: { webp: { image_url: "/placeholder.jpg" } },
                    score: 9.1,
                    episodes: 64,
                    status: "Finished Airing"
                }
            ]);

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
        }
    }, [session]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="max-w-2xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                <p className="mb-6">You need to be signed in to view your dashboard.</p>
                <Button asChild>
                    <Link href="/">Go to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

            {/* User Profile Card */}
            <Card className="mb-6">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3">
                        {session.user.image && (
                            <img
                                src={session.user.image}
                                alt={session.user.name}
                                className="!w-10 !h-10 rounded-full object-cover shrink-0"
                            />
                        )}
                        <div>
                            <h2 className="text-lg">{session.user.name}</h2>
                            <p className="text-sm text-muted-foreground">{session.user.email}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    {userStats && (
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-2 bg-blue-50 rounded">
                                <Eye className="w-5 h-5 mx-auto text-blue-500" />
                                <span className="block text-sm font-medium">{userStats.totalWatchlist}</span>
                                <span className="block text-xs text-muted-foreground">Watchlist</span>
                            </div>
                            <div className="text-center p-2 bg-red-50 rounded">
                                <Heart className="w-5 h-5 mx-auto text-red-500" />
                                <span className="block text-sm font-medium">{userStats.totalFavorites}</span>
                                <span className="block text-xs text-muted-foreground">Favorites</span>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                                <Calendar className="w-5 h-5 mx-auto text-green-500" />
                                <span className="block text-sm font-medium">
                                    {new Date(userStats.joinDate).getFullYear()}
                                </span>
                                <span className="block text-xs text-muted-foreground">Member</span>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>


            {/* Tabs for Watchlist and Favorites */}
            <div className="mb-4">
                <div className="flex border-b">
                    <button
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'watchlist' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                        onClick={() => setActiveTab('watchlist')}
                    >
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            Watchlist ({watchlist.length})
                        </div>
                    </button>
                    <button
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'favorites' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            Favorites ({favorites.length})
                        </div>
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            <div>
                {activeTab === 'watchlist' && (
                    <div>
                        {watchlist.length === 0 ? (
                            <Card className="p-6 text-center">
                                <Eye className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                                <h3 className="text-base font-medium mb-1">Your watchlist is empty</h3>
                                <p className="text-sm text-muted-foreground mb-3">Add anime to your watchlist to keep track of what you want to watch</p>
                                <Button asChild size="sm">
                                    <Link href="/top-anime">Browse Top Anime</Link>
                                </Button>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                {watchlist.map((anime) => (
                                    <div key={anime.mal_id} className="relative">
                                        <AnimeList
                                            id={anime.mal_id}
                                            title={anime.title}
                                            images={anime.images?.webp?.image_url || "/placeholder.jpg"}
                                        />
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="absolute top-1 right-1 h-6 w-6"
                                            onClick={() => {
                                                setWatchlist(watchlist.filter(item => item.mal_id !== anime.mal_id));
                                            }}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                        <div className="mt-1 flex items-center justify-between">
                                            <Badge variant="secondary" className="text-xs px-1 py-0">
                                                <Star className="w-2.5 h-2.5 mr-0.5" />
                                                {anime.score}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs px-1 py-0">
                                                {anime.episodes} eps
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div>
                        {favorites.length === 0 ? (
                            <Card className="p-6 text-center">
                                <Heart className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                                <h3 className="text-base font-medium mb-1">No favorites yet</h3>
                                <p className="text-sm text-muted-foreground mb-3">Add anime to your favorites to save your top picks</p>
                                <Button asChild size="sm">
                                    <Link href="/top-anime">Browse Top Anime</Link>
                                </Button>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
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
                                            className="absolute top-1 right-1 h-6 w-6"
                                            onClick={() => {
                                                setFavorites(favorites.filter(item => item.mal_id !== anime.mal_id));
                                            }}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                        <div className="mt-1 flex items-center justify-between">
                                            <Badge variant="secondary" className="text-xs px-1 py-0">
                                                <Star className="w-2.5 h-2.5 mr-0.5" />
                                                {anime.score}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs px-1 py-0">
                                                {anime.episodes} eps
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}