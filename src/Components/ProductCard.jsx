import React, { useEffect, useState } from "react";
import { API } from "../Services/Api";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch(`${API}/products`);
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);

    // Extract categories automatically
    const uniqueCategories = ["all", ...new Set(data.map(p => p.category))];
    setCategories(uniqueCategories);
  }

  useEffect(() => {
    let tempProducts = [...products];

    // 🔍 Search by title
    if (search) {
      tempProducts = tempProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📂 Filter by category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        product => product.category === category
      );
    }

    // 🔃 Sorting
    if (sort === "az") {
      tempProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "za") {
      tempProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (sort === "low-high") {
      tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "high-low") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
  }, [search, category, sort, products]);

  // ⭐ Rating
  const renderStars = (rate) => {
    const stars = Math.round(rate);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">

      {/* 🔧 TOP RIGHT CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6 mr-[300px]">

        {/* Search */}
        <input
          type="text"
          placeholder="Search product..."
          className="border px-3 py-2 rounded-md outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="border px-3 py-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="border px-3 py-2 rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="az">A–Z (Title)</option>
          <option value="za">Z–A (Title)</option>
          <option value="low-high">Price Low → High</option>
          <option value="high-low">Price High → Low</option>
        </select>

      </div>

      {/* 🛍️ PRODUCT GRID */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="h-36 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>

            {/* Category */}
            <p className="mt-3 text-xs uppercase text-gray-400">
              {product.category}
            </p>

            {/* Title */}
            <h3 className="mt-1 text-sm font-semibold line-clamp-2">
              {product.title}
            </h3>

            {/* Description */}
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">
              {product.description}
            </p>

            {/* Price */}
            <p className="mt-2 font-bold text-indigo-600">
              ₹ {product.price}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-500 text-base">
                {renderStars(product.rating.rate)}
              </span>
              <span className="text-xs text-gray-500">
                ({product.rating.count})
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductCard;
