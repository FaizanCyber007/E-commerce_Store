import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faSort,
  faTh,
  faList,
  faChevronUp,
  faChevronDown,
  faStar,
  faShoppingCart,
  faEye,
  faHeart,
  faBolt,
  faFire,
  faExclamationTriangle,
  faSpinner,
  faGem,
  faRocket,
  faShieldAlt,
  faCrown,
  faUsers,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 10000,
    inStock: false,
    onSale: false,
    sortBy: "featured",
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // Handle URL parameters for category filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get("category");

    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: categoryParam,
      }));
    }
  }, [location.search]);

  // Fetch products from backend with filters
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.brand && { brand: filters.brand }),
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        inStock: filters.inStock.toString(),
        onSale: filters.onSale.toString(),
        sortBy: filters.sortBy,
      });

      const response = await fetch(`/api/products?${queryParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalProducts(data.totalProducts || 0);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and brands for filters
  const fetchFiltersData = async () => {
    try {
      const [categoriesResponse, brandsResponse] = await Promise.all([
        fetch("/api/products/categories"),
        fetch("/api/products/brands"),
      ]);

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.categories || []);
      }

      if (brandsResponse.ok) {
        const brandsData = await brandsResponse.json();
        setBrands(brandsData.brands || []);
      }
    } catch (error) {
      console.error("Error fetching filter data:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchFiltersData();
  }, []);

  // Refetch products when filters or page changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(currentPage);
    }, 500); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product: product._id,
        qty: 1,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
      })
    );
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#1f2937",
        color: "#fff",
      },
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // Crystal cursor effect
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "crystal-cursor";
    cursor.innerHTML = "✦";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Hero Section - Redesigned to match Home page theme */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-24 pb-16 overflow-hidden"
      >
        {/* Background Animation - matches Home page */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * 300,
                opacity: 0,
              }}
              animate={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * 300,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 rounded-full text-primary font-semibold">
                <FontAwesomeIcon icon={faCrown} className="text-accent" />
                <span>Premium Collection</span>
                <FontAwesomeIcon icon={faCrown} className="text-accent" />
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="block bg-gradient-to-r from-text-primary via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Elite
              </span>
              <span className="block bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Shopping
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Discover extraordinary products curated with precision and
              passion. Experience luxury shopping redefined.
            </motion.p>

            {/* Enhanced Stats with Home page styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: faGem,
                  number: totalProducts,
                  label: "Premium Products",
                  color: "from-primary to-purple-500",
                },
                {
                  icon: faUsers,
                  number: "100K+",
                  label: "Happy Customers",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: faAward,
                  number: "4.9★",
                  label: "Rating",
                  color: "from-accent to-orange-500",
                },
                {
                  icon: faShieldAlt,
                  number: "100%",
                  label: "Secure",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-6 relative overflow-hidden group shadow-xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <FontAwesomeIcon
                        icon={stat.icon}
                        className="text-white text-lg"
                      />
                    </div>
                    <div className="text-2xl font-bold text-text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-text-secondary text-sm">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4"
          >
            <div className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-6 sticky top-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FontAwesomeIcon
                    icon={faFilter}
                    className="mr-3 text-primary"
                  />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden glass-card p-2 rounded-lg text-white"
                >
                  <FontAwesomeIcon
                    icon={showFilters ? faChevronUp : faChevronDown}
                  />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters || "hidden"} lg:block`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                      placeholder="Search products..."
                      className="w-full glass-input rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full glass-input rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-slate-800">
                      All Categories
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-slate-800"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brands */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) =>
                      handleFilterChange("brand", e.target.value)
                    }
                    className="w-full glass-input rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-slate-800">
                      All Brands
                    </option>
                    {brands.map((brand) => (
                      <option
                        key={brand}
                        value={brand}
                        className="bg-slate-800"
                      >
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange(
                          "minPrice",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="Min"
                      className="w-1/2 glass-input rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange(
                          "maxPrice",
                          parseInt(e.target.value) || 10000
                        )
                      }
                      placeholder="Max"
                      className="w-1/2 glass-input rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) =>
                        handleFilterChange("inStock", e.target.checked)
                      }
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 mr-3"
                    />
                    In Stock Only
                  </label>
                </div>

                {/* Sale Filter */}
                <div>
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.onSale}
                      onChange={(e) =>
                        handleFilterChange("onSale", e.target.checked)
                      }
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 mr-3"
                    />
                    On Sale
                  </label>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      category: "",
                      brand: "",
                      minPrice: 0,
                      maxPrice: 10000,
                      inStock: false,
                      onSale: false,
                      sortBy: "featured",
                    });
                    setCurrentPage(1);
                  }}
                  className="w-full glass-card text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-white mr-4">
                    Products
                    {totalProducts > 0 &&
                      ` (${totalProducts.toLocaleString()} items)`}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faSort}
                      className="text-purple-400 mr-2"
                    />
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        handleFilterChange("sortBy", e.target.value)
                      }
                      className="glass-input rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="featured" className="bg-slate-800">
                        Featured
                      </option>
                      <option value="newest" className="bg-slate-800">
                        Newest
                      </option>
                      <option value="popular" className="bg-slate-800">
                        Popular
                      </option>
                      <option value="price-asc" className="bg-slate-800">
                        Price: Low to High
                      </option>
                      <option value="price-desc" className="bg-slate-800">
                        Price: High to Low
                      </option>
                      <option value="rating" className="bg-slate-800">
                        Top Rated
                      </option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-glass/50 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faList} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center py-20"
              >
                <div className="glass-card rounded-2xl p-8 text-center">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-4xl text-purple-400 mb-4"
                  />
                  <p className="text-xl text-white">Loading products...</p>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-4xl text-red-400 mb-4"
                />
                <p className="text-xl text-white mb-4">{error}</p>
                <button
                  onClick={() => fetchProducts(currentPage)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <AnimatePresence>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="bg-glass backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-xl group relative"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="glass-card text-white p-2 rounded-lg flex-1"
                            >
                              <FontAwesomeIcon icon={faEye} className="mr-2" />
                              View
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="glass-card text-white p-2 rounded-lg"
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </motion.button>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.featured && (
                            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                              <FontAwesomeIcon icon={faBolt} className="mr-1" />
                              Featured
                            </span>
                          )}
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                                <FontAwesomeIcon
                                  icon={faFire}
                                  className="mr-1"
                                />
                                Sale
                              </span>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="absolute top-4 right-4 glass-card px-2 py-1 rounded-lg">
                          <div className="flex items-center">
                            {renderStars(product.rating || 0)}
                            <span className="text-white text-sm ml-1">
                              {product.rating?.toFixed(1) || "0.0"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {product.brand}
                          </span>
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-white">
                              ${product.price?.toFixed(2)}
                            </span>
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through ml-2">
                                  ${product.originalPrice?.toFixed(2)}
                                </span>
                              )}
                          </div>
                          <span
                            className={`text-sm ${
                              product.countInStock > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(product)}
                          disabled={product.countInStock === 0}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-all transform hover:shadow-lg flex items-center justify-center"
                        >
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="mr-2"
                          />
                          {product.countInStock === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                        </motion.button>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                          <span>Category: {product.category}</span>
                          <span>{product.numReviews || 0} reviews</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}

            {/* No Products Found */}
            {!loading && !error && products.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-4xl text-gray-400 mb-4"
                />
                <h3 className="text-xl text-white mb-2">No products found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      category: "",
                      brand: "",
                      minPrice: 0,
                      maxPrice: 10000,
                      inStock: false,
                      onSale: false,
                      sortBy: "featured",
                    });
                    setCurrentPage(1);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-6 mt-8 shadow-xl"
              >
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="glass-card hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Previous
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = currentPage <= 3 ? i + 1 : currentPage + i - 2;

                    if (page <= totalPages && page > 0) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "glass-card text-white hover:bg-white/20"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="glass-card hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>

                <div className="text-center mt-4 text-gray-400 text-sm">
                  Showing {(currentPage - 1) * 12 + 1} to{" "}
                  {Math.min(currentPage * 12, totalProducts)} of {totalProducts}{" "}
                  products
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
