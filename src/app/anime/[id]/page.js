import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ini halaman detail anime (SERVER COMPONENT)
const AnimeDetail = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
    cache: "no-store",
  });
  const { data } = await res.json();

  if (!data) {
    return <p className="p-6 text-center text-gray-500">Anime tidak ditemukan.</p>;
  }

  const imageUrl =
    data?.images?.webp?.large_image_url ||
    data?.images?.jpg?.image_url ||
    "/favicon.ico";

  const trailer = data?.trailer;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div
          className="w-full md:w-72 lg:w-80 relative rounded-lg overflow-hidden shadow-lg flex-shrink-0"
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
          <p className="text-gray-600 dark:text-gray-400 italic">{data.title_japanese}</p>
          <p className="text-gray-800 dark:text-gray-200">{data.synopsis}</p>

          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Episodes:</strong> {data.episodes || "N/A"}</li>
            <li><strong>Status:</strong> {data.status}</li>
            <li><strong>Score:</strong> {data.score || "Not Rated"}</li>
            <li><strong>Year:</strong> {data.year || "Unknown"}</li>
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
                <p><strong>Genres:</strong> {data.genres?.map(g => g.name).join(", ") || "Unknown"}</p>
                <p><strong>Studios:</strong> {data.studios?.map(s => s.name).join(", ") || "Unknown"}</p>
                <p><strong>Producers:</strong> {data.producers?.map(p => p.name).join(", ") || "Unknown"}</p>
                <p><strong>Source:</strong> {data.source}</p>
                <p><strong>Type:</strong> {data.type}</p>
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
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
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
