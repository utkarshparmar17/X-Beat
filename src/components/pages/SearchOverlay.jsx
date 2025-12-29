import { IoSearchSharp, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import productsData from "../../data/productsData";
import { Link } from "react-router-dom";

function SearchOverlay({ close, initialQuery = "" }) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (initialQuery) setQuery(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    const results = productsData.filter((p) => {
        const q = query.trim().toLowerCase();
        return (
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            (p.category && p.category.toLowerCase().includes(q))
        );
    });

    return (
        // BACKDROP — click anywhere closes
        <div
            onClick={close}
            className="fixed inset-0 z-[999] backdrop-blur-md "
        >
            {/* CONTENT — stop click propagation */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl mx-auto pt-[100px] px-4"
            >
                {/* Search Bar */}
                <div className="relative">
                    <IoSearchSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xl" />

                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for product..."
                        className="w-full bg-transparent border-2 border-zinc-700 py-4 pl-12 pr-12 text-white text-lg rounded-3xl focus:outline-none focus:border-red-600"
                    />

                    <button
                        onClick={close}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                        <IoClose size={30} />
                    </button>
                </div>

                {/* Results */}
                {query && (
                    <div className="mt-4 flex flex-col divide-y divide-zinc-800">
                        {results.slice(0, 8).map((product) => (
                            <Link
                                key={product.id}
                                to={`/product-details/${product.id}`}
                                onClick={close}
                                className="flex items-center gap-4 py-3 px-3 bg-[#111] hover:bg-[#111]/70 transition"
                            >
                                <img
                                    src={product.images[0]}
                                    className="h-16 w-16 object-contain"
                                />

                                <p className="text-sm text-white truncate">
                                    {product.title}
                                </p>
                                <p className="ml-auto text-red-500 font-bold text-sm">
                                    ₹{product.finalPrice}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchOverlay;
