import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faTshirt,
  faHome,
  faGamepad,
  faBook,
  faDumbbell,
  faGem,
  faBaby,
  faArrowRight,
  faSpinner,
  faExclamationTriangle,
  faSearch,
  faFilter,
  faEye,
  faShoppingCart,
  faCrown,
  faUsers,
  faAward,
  faShieldAlt,
  faTag,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Icon mapping for category icons
  const iconMap = {
    faLaptop,
    faTshirt,
    faHome,
    faGamepad,
    faBook,
    faDumbbell,
    faGem,
    faBaby,
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection - navigate to shop with category filter
  const handleCategorySelect = (categorySlug) => {
    navigate(`/shop?category=${categorySlug}`);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-12 text-center shadow-xl"
        >
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-5xl text-primary mb-4"
          />
          <p className="text-xl text-text-primary">
            Loading premium categories...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-red-800/20 to-red-900/20 backdrop-blur-sm border border-red-700/50 rounded-2xl p-8 text-center shadow-xl max-w-md"
        >
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-4xl text-red-400 mb-4"
          />
          <p className="text-xl text-text-primary mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-24 pb-16 overflow-hidden"
      >
        {/* Background Animation */}
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
                <span>Premium Categories</span>
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
                Explore
              </span>
              <span className="block bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Categories
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our carefully curated categories featuring premium
              products from trusted brands worldwide.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full bg-glass backdrop-blur-sm border border-border rounded-xl px-4 py-3 pl-12 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: faUsers,
                  number: categories.length,
                  label: "Categories",
                  color: "from-primary to-purple-500",
                },
                {
                  icon: faShoppingCart,
                  number: "10K+",
                  label: "Products",
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
                  label: "Authentic",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
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

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Results Info */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="bg-glass backdrop-blur-sm border border-border rounded-xl px-6 py-3 inline-flex items-center space-x-3">
                <FontAwesomeIcon icon={faFilter} className="text-primary" />
                <span className="text-text-secondary">
                  {filteredCategories.length} categories found for "{searchTerm}
                  "
                </span>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredCategories.map((category, index) => {
                // Get icon from iconMap based on category icon name
                const iconToUse = iconMap[category.icon] || faTag;

                return (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    whileHover={{
                      y: -15,
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.4 },
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="group relative cursor-pointer"
                    onClick={() => handleCategorySelect(category.slug)}
                  >
                    {/* Card */}
                    <div className="relative bg-glass backdrop-blur-sm border border-border rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                      {/* Background Gradient Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        style={{
                          background: category.color
                            ? `linear-gradient(135deg, ${category.color}, transparent)`
                            : "linear-gradient(135deg, #3b82f6, transparent)",
                        }}
                      />

                      {/* Glow Effect */}
                      <div
                        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                        style={{
                          background: category.color
                            ? `linear-gradient(135deg, ${category.color}, transparent)`
                            : "linear-gradient(135deg, #3b82f6, transparent)",
                        }}
                      />

                      {/* Content */}
                      <div className="relative p-8">
                        {/* Top Section - Icon and Badge */}
                        <div className="flex items-start justify-between mb-6">
                          {/* Icon */}
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                            style={{
                              background: category.color
                                ? `linear-gradient(135deg, ${category.color})`
                                : "linear-gradient(135deg, #3b82f6, #1e40af)",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={iconToUse}
                              className="text-white text-2xl"
                            />
                          </motion.div>

                          {/* Premium Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: index * 0.1 + 0.5,
                              duration: 0.3,
                            }}
                            className="bg-gradient-to-r from-accent/20 to-orange-500/20 backdrop-blur-sm border border-accent/30 rounded-full px-3 py-1"
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-accent text-xs mr-1"
                            />
                            <span className="text-accent text-xs font-semibold">
                              Premium
                            </span>
                          </motion.div>
                        </div>

                        {/* Category Info */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-text-secondary text-sm leading-relaxed mb-3">
                            {category.description}
                          </p>

                          {/* Product Count */}
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-text-muted text-sm">
                              {category.productCount ||
                                category.actualProductCount ||
                                0}{" "}
                              Products
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="relative">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 border border-primary/20 text-primary hover:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 group-hover:shadow-lg flex items-center justify-center space-x-2"
                          >
                            <FontAwesomeIcon icon={faEye} />
                            <span>Explore Category</span>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="transform group-hover:translate-x-1 transition-transform"
                            />
                          </motion.button>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-accent/5 to-orange-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {searchTerm && filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-12 max-w-md mx-auto shadow-xl">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-6xl text-text-muted mb-6"
                />
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  No categories found
                </h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your search terms or browse all categories.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="bg-gradient-to-r from-primary to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Clear Search
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent">
                Can't find what you're looking for?
              </span>
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Browse our complete product catalog or get in touch with our
              expert team for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-gradient-to-r from-primary to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Browse All Products
              </Link>
              <Link
                to="/contact"
                className="bg-glass backdrop-blur-sm border border-border text-text-primary hover:text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Categories;
