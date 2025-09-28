"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HeaderMenu = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/" className={cn("px-3 py-2 rounded-md hover:bg-accent")}>
        Home
      </Link>
      
      <div className="relative group">
        <button className="px-3 py-2 rounded-md hover:bg-accent">
          Anime
        </button>
        <div className="absolute left-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-1 hidden group-hover:block z-50">
          <Link 
            href="/top-anime" 
            className="block px-4 py-2 text-sm hover:bg-accent"
          >
            Top Anime
          </Link>
          <Link 
            href="/seasonal" 
            className="block px-4 py-2 text-sm hover:bg-accent"
          >
            Seasonal
          </Link>
          <Link 
            href="/genres" 
            className="block px-4 py-2 text-sm hover:bg-accent"
          >
            Genres
          </Link>
        </div>
      </div>
      
      <Link href="/about" className={cn("px-3 py-2 rounded-md hover:bg-accent")}>
        About
      </Link>
    </div>
  );
};

export default HeaderMenu;