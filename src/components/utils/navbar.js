"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import HeaderMenu from "./header-menu"; 

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();

  const [search, setSearch] = useState(searchParams.get("query") || "");
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <>
      <nav className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          MyAnimeList
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={20} />
        </Button>

        <div className="hidden md:block">
          <HeaderMenu />
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-1 min-w-0 items-center space-x-2">
            <div className="relative flex-grow min-w-0">
              <Input
                type="text"
                placeholder="Cari anime..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-8 w-full min-w-0"
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
            <Button type="submit" variant="default" className="flex-shrink-0">
              Cari
            </Button>
          </form>

          {/* Toggle Theme */}
          {mounted && (
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
          )}
        </div>
      </div>
    </nav>
    {isMobileMenuOpen && (
      <div className="md:hidden bg-background border-b shadow-lg z-50">
        <div className="px-4 py-2 space-y-2">
          <Link href="/" className="block py-2 hover:bg-accent rounded" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <div>
            <div className="font-semibold py-2">Anime</div>
            <Link href="/top-anime" className="block py-1 pl-4 hover:bg-accent rounded" onClick={() => setIsMobileMenuOpen(false)}>
              Top Anime
            </Link>
            <Link href="/seasonal" className="block py-1 pl-4 hover:bg-accent rounded" onClick={() => setIsMobileMenuOpen(false)}>
              Seasonal
            </Link>
            <Link href="/genres" className="block py-1 pl-4 hover:bg-accent rounded" onClick={() => setIsMobileMenuOpen(false)}>
              Genres
            </Link>
          </div>
          <Link href="/about" className="block py-2 hover:bg-accent rounded" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
