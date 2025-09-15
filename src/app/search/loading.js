export default function Loading() {
return (
<div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Sedang mencari anime...</h1>

    {/* Grid skeleton sederhana */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
        <div
        key={i}
        className="bg-gray-300 animate-pulse rounded-lg h-64"
        ></div>
    ))}
    </div>
</div>
);
}
