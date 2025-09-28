"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Sun, Moon, Menu, LogIn, LogOut, User, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import HeaderMenu from "./header-menu";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();

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
        <nav className="border-b shadow-sm bg-background">
            <div className="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-primary">
                MyAnimeList
            </Link>

            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu size={20} />
            </Button>

            {/* Desktop menu */}
            <div className="hidden md:block">
                <HeaderMenu />
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-3">
                {/* Search bar */}
                <form
                onSubmit={handleSearch}
                className="flex items-center flex-1 min-w-0 space-x-2"
                >
                <div className="relative flex-grow min-w-0">
                    <Input
                    type="text"
                    placeholder="Cari anime..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full min-w-0 pr-8 h-8 text-sm"
                    />
                    {search && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute -translate-y-1/2 right-2 top-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X size={14} />
                    </button>
                    )}
                </div>
                <Button type="submit" variant="default" className="flex-shrink-0 h-8 text-sm px-3">
                    Cari
                </Button>
                </form>

                {/* User Authentication */}
                {session ? (
                    <div className="relative group">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                        >
                            {session.user.image ? (
                                <img 
                                    src={session.user.image} 
                                    alt={session.user.name} 
                                    className="w-6 h-6 rounded-full"
                                />
                            ) : (
                                <User size={16} />
                            )}
                        </Button>
                        
                        {/* Dropdown menu */}
                        <div className="absolute right-0 mt-1 w-48 bg-background border rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                            <div className="px-3 py-2 border-b">
                                <p className="text-sm font-medium truncate">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                            </div>
                            <Link 
                                href="/dashboard" 
                                className="flex items-center px-3 py-2 text-sm hover:bg-accent"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent text-left"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => signIn("github")}
                        title="Login with GitHub"
                        className="h-8 w-8"
                    >
                        <LogIn size={16} />
                    </Button>
                )}

                {/* Toggle Theme */}
                {mounted && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="h-8 w-8"
                >
                    {theme === "dark" ? (
                    <Sun size={16} className="text-yellow-400" />
                    ) : (
                    <Moon size={16} className="text-slate-700" />
                    )}
                </Button>
                )}
            </div>
            </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
            <div className="z-50 border-b shadow-lg md:hidden bg-background">
            <div className="px-4 py-2 space-y-2">
                <Link
                href="/"
                className="block py-2 rounded hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                Home
                </Link>
                <div>
                <div className="py-2 font-semibold">Anime</div>
                <Link
                    href="/top-anime"
                    className="block py-1 pl-4 rounded hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Top Anime
                </Link>
                <Link
                    href="/seasonal"
                    className="block py-1 pl-4 rounded hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Seasonal
                </Link>
                <Link
                    href="/genres"
                    className="block py-1 pl-4 rounded hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Genres
                </Link>
                </div>
                <Link
                href="/about"
                className="block py-2 rounded hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                About
                </Link>
                
                {/* Mobile Auth */}
                {session ? (
                    <div className="pt-2 border-t">
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                                {session.user.image ? (
                                    <img 
                                        src={session.user.image} 
                                        alt={session.user.name} 
                                        className="w-6 h-6 rounded-full mr-2"
                                    />
                                ) : (
                                    <User size={14} className="mr-2" />
                                )}
                                <span className="text-sm font-medium truncate">
                                    {session.user.name}
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/dashboard"
                            className="flex items-center py-2 text-sm hover:bg-accent rounded"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <LayoutDashboard size={14} className="mr-2" />
                            Dashboard
                        </Link>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                signOut();
                            }}
                            className="flex items-center w-full py-2 text-sm hover:bg-accent rounded text-left"
                        >
                            <LogOut size={14} className="mr-2" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            signIn("github");
                        }}
                        className="w-full justify-start h-8"
                    >
                        <LogIn size={14} className="mr-2" />
                        <span className="text-sm">Login with GitHub</span>
                    </Button>
                )}
            </div>
            </div>
        )}
        </>
    );
};

export default Navbar;