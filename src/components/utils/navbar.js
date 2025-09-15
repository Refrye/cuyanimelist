"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
const [search, setSearch] = useState("");
const router = useRouter();

const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(search)}`);
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
        <button
            type="submit"
            className="bg-indigo-700 px-4 py-2 text-white font-medium hover:bg-indigo-800 transition"
        >
            Cari
        </button>
        </form>
    </div>
    </nav>
);
};

export default Navbar;
