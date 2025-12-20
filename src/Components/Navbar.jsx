import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between
      px-6 md:px-16 lg:px-24 xl:px-32 py-4
      border-b border-gray-300 bg-white">

      {/* Brand */}
      <p className="text-2xl md:text-3xl font-bold tracking-wide
        text-indigo-600 hover:text-indigo-700 transition">
        prebuiltui
      </p>

      {/* Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <Link to="/product" className="hover:text-indigo-600">Product</Link>
        <Link to="/about" className="hover:text-indigo-600">About Us</Link>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full">
          <input
            type="text"
            placeholder="Search products"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          />
          🔍
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer text-lg">
          🛒
          <span className="absolute -top-2 -right-3 text-xs text-white
            bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* Login */}
        <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600
          text-white rounded-full transition">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
