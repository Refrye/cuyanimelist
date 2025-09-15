"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Sun, Moon } from "lucide-react"; 
import { useTheme } from "next-themes";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme(); // pakai next-themes

  const [search, setSearch] = useState(searchParams.get("query") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(search)}`);
  };

  const handleClear = () => {
    setSearch("");
    router.push("/search");
  };

  return (
    <nav className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          MyAnimeList
        </Link>

        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Cari anime..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-8 w-48 sm:w-64"
              />
              {search && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <Button type="submit" variant="default">
              Cari
            </Button>
          </form>

          {/* Toggle Theme */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
