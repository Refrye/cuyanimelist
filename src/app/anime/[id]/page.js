import React from "react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Flame, Heart, Crown, Calendar } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

// ini halaman detail anime (SERVER COMPONENT)
const AnimeDetail = async ({ params }) => {
  const { id } = params;

  let data = null;
  try {
    const response = await apiFetch(`/anime/${id}`);
    data = response.data;
  } catch (err) {
    console.error("Failed to fetch anime details:", err);
  }

  if (!data) {
    return (
      <p className="p-6 text-center text-gray-500">Anime tidak ditemukan.</p>
    );
  }

  const imageUrl =
    data?.images?.webp?.large_image_url ||
    data?.images?.jpg?.image_url ||
    "/favicon.ico";

  const trailer = data?.trailer;

  return (
    <div className="max-w-6xl p-6 mx-auto space-y-8">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Poster */}
        <div
          className="relative flex-shrink-0 w-full overflow-hidden rounded-lg shadow-lg md:w-72 lg:w-80"
          style={{ aspectRatio: "2/3" }}
        >
          <Image
            src={imageUrl}
            alt={data?.title || "Anime image"}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
          />
        </div>

        {/* Info Utama */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-foreground">{data.title}</h1>
          <p className="italic text-gray-600 dark:text-gray-400">
            {data.title_japanese}
          </p>
          <p className="text-gray-800 dark:text-gray-200">{data.synopsis}</p>

          {/* Card berisi statistik */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">
                    <Star size={16} className="inline mr-1" />
                    Rating
                  </span>
                  <span className="text-xl font-semibold">
                    {data.rating || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">
                    <Crown size={16} className="inline mr-1" />
                    Rank
                  </span>
                  <span className="text-xl font-semibold">
                    {data.rank || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">
                    <Flame size={16} className="inline mr-1" />
                    Popularity
                  </span>
                  <span className="text-xl font-semibold">
                    {data.popularity || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">
                  <Calendar size={16} className="inline mr-1" />
                    Season
                  </span>
                  <span className="text-xl font-semibold">
                    {data.season || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">
                    <Heart size={16} className="inline mr-1" />
                    Favorites
                  </span>
                  <span className="text-xl font-semibold">
                    {data.favorites || "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <strong>Episodes:</strong> {data.episodes || "N/A"}
            </li>
            <li>
              <strong>Duration:</strong> {data.duration || "N/A"}
            </li>
            <li>
              <strong>Status:</strong> {data.status}
            </li>
            <li>
              <strong>Score:</strong> {data.score || "Not Rated"}
            </li>
            <li>
              <strong>Year:</strong> {data.year || "Unknown"}
            </li>
          </ul>

          {/* Dialog untuk info detail */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Lihat Detail</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-background text-foreground">
              <DialogHeader>
                <DialogTitle>Info Detail</DialogTitle>
                <DialogDescription>
                  Beberapa detail tambahan tentang {data.title}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Genres:</strong>{" "}
                  {data.genres?.map((g) => g.name).join(", ") || "Unknown"}
                </p>
                <p>
                  <strong>Studios:</strong>{" "}
                  {data.studios?.map((s) => s.name).join(", ") || "Unknown"}
                </p>
                <p>
                  <strong>Producers:</strong>{" "}
                  {data.producers?.map((p) => p.name).join(", ") || "Unknown"}
                </p>
                <p>
                  <strong>Source:</strong> {data.source}
                </p>
                <p>
                  <strong>Type:</strong> {data.type}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Trailer */}
      {trailer?.embed_url && (
        <Card>
          <CardHeader>
            <CardTitle>Trailer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg shadow-lg aspect-video">
              <iframe
                src={trailer.embed_url}
                title="Anime Trailer"
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnimeDetail;
