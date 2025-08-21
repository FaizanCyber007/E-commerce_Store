import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
  faTh,
  faList,
  faSearch,
  faTags,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { fetchProducts } from "../store/productSlice.js";
import ProductCard from "../components/ProductCard.jsx";

const useDebounced = (value, delay = 400) => {
  const [d, setD] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setD(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return d;
};

const Shop = () => {
  const dispatch = useDispatch();
  const { list, page, pages, total, loading, error } = useSelector(
    (s) => s.products
  );

  // Local UI state
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search to avoid spam calls
  const debouncedSearch = useDebounced(searchTerm, 450);

  // Whenever filters change, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort, priceRange, rating, debouncedSearch]);

  // Build params sent to thunk (empty values removed in the slice)
  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 12,
      category,
      sort,
      // Keep these in case you implement them later on backend; they will be stripped if empty
      priceRange,
      rating,
      search: debouncedSearch, // mapped to `keyword` in slice
    }),
    [currentPage, category, sort, priceRange, rating, debouncedSearch]
  );

  // Fetch on mount & when params change
  useEffect(() => {
    dispatch(fetchProducts(params));
  }, [dispatch, params]);

  const categories = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Gaming",
    "Accessories",
    "Audio",
    "Wearables",
    "Home & Garden",
    "Sports & Fitness",
    "Books & Media",
  ];

  const priceRanges = [
    { label: "Under $100", value: "0-100" },
    { label: "$100 - $500", value: "100-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "$1000 - $2000", value: "1000-2000" },
    { label: "Over $2000", value: "2000-999999" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600/20 to-secondary-600/20 py-16">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Premium <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our curated selection of premium products from top brands
              worldwide
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-responsive py-8">
        {/* Search and Controls */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[300px]">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FontAwesomeIcon icon={faTh} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-600 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FontAwesomeIcon icon={faTags} className="mr-2" />
                    Category
                  </label>
                  <select
                    className="input w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Range
                  </label>
                  <select
                    className="input w-full"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="">All Prices</option>
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FontAwesomeIcon icon={faStar} className="mr-2" />
                    Rating
                  </label>
                  <select
                    className="input w-full"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FontAwesomeIcon icon={faSort} className="mr-2" />
                    Sort By
                  </label>
                  <select
                    className="input w-full"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating_desc">Top Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-300">
            Showing{" "}
            <span className="text-primary-400 font-semibold">
              {list.length}
            </span>{" "}
            of <span className="text-primary-400 font-semibold">{total}</span>{" "}
            products
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2">
            {category && (
              <span className="badge bg-primary-500/20 text-primary-400">
                {category}
                <button
                  onClick={() => setCategory("")}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {priceRange && (
              <span className="badge bg-secondary-500/20 text-secondary-400">
                {priceRanges.find((r) => r.value === priceRange)?.label}
                <button
                  onClick={() => setPriceRange("")}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-700 text-red-200">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence>
              {list.map((product) => (
                <motion.div
                  key={product.slug || product._id}
                  variants={itemVariants}
                  layout
                  className={viewMode === "list" ? "col-span-1" : ""}
                >
                  <ProductCard
                    product={product}
                    className={viewMode === "list" ? "flex-row" : ""}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && list.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl text-gray-600 mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or browse our categories
            </p>
            <button
              onClick={() => {
                setCategory("");
                setSort("");
                setPriceRange("");
                setRating("");
                setSearchTerm("");
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            {[...Array(pages)].map((_, i) => {
              const target = i + 1;
              return (
                <button
                  key={target}
                  onClick={() => setCurrentPage(target)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    currentPage === target
                      ? "bg-primary-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {target}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
