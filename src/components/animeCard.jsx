"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AnimeCard = ({ title, images, id, synopsis, trailerUrl }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Image
            src={images}
            alt={title}
            width={200}
            height={300}
            className="rounded max-h-64 object-cover"
          />
          <h2 className="mt-2 md:text-xl font-semibold text-center">{title}</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{synopsis}</DialogDescription>
        </DialogHeader>
        {trailerUrl && (
          <div className="mt-4">
            <iframe
              width="100%"
              height="315"
              src={trailerUrl}
              title={`${title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <DialogFooter>
          <Button asChild variant="outline">
            <Link href={`/anime/${id}`}>Detail Page</Link>
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnimeCard;
