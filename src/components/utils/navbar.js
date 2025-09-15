"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // sync dengan query saat ini
  const [search, setSearch] = useState(searchParams.get("query") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(search)}`);
  };

  const handleClear = () => {
    setSearch("");
    router.push("/search"); // balik ke halaman search kosong
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyAnimeList
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Cari anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 text-black outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          )}
          <Button type="submit">
            Cari
          </Button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
