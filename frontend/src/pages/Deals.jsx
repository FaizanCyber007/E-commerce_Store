import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faClock,
  faPercent,
  faBolt,
  faGift,
  faCrown,
  faTag,
  faArrowRight,
  faSpinner,
  faExclamationTriangle,
  faSearch,
  faFilter,
  faEye,
  faShoppingCart,
  faUsers,
  faAward,
  faShieldAlt,
  faStar,
  faRocket,
  faGem,
  faMedal,
  faCalendarAlt,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, flash-sale, clearance, etc.
  const navigate = useNavigate();

  // Fetch deals from API
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/deals");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDeals(data.deals || []);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Handle deal click - navigate to deal details
  const handleDealClick = (dealId) => {
    navigate(`/deals/${dealId}`);
  };

  // Filter deals based on search term and type
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || deal.type === filterType;

    return matchesSearch && matchesType;
  });

  // Format time remaining for display
  const formatTimeRemaining = (timeRemaining) => {
    if (!timeRemaining) return "Deal Ended";

    const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor(
      (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
    );

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Get deal type icon
  const getDealTypeIcon = (type) => {
    switch (type) {
      case "flash-sale":
        return faBolt;
      case "clearance":
        return faTag;
      case "seasonal":
        return faGift;
      case "bundle":
        return faUsers;
      default:
        return faPercent;
    }
  };

  // Get deal type color
  const getDealTypeColor = (type) => {
    switch (type) {
      case "flash-sale":
        return "from-red-500 to-orange-500";
      case "clearance":
        return "from-green-500 to-emerald-500";
      case "seasonal":
        return "from-purple-500 to-pink-500";
      case "bundle":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-primary to-purple-500";
    }
  };

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
            Loading exclusive deals...
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
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * 400,
                opacity: 0,
              }}
              animate={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * 400,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <FontAwesomeIcon
                icon={
                  [faFire, faBolt, faGift, faStar, faGem][
                    Math.floor(Math.random() * 5)
                  ]
                }
                className="text-accent/20"
              />
            </motion.div>
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
              <span className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-full text-red-400 font-semibold">
                <FontAwesomeIcon
                  icon={faFire}
                  className="text-accent animate-pulse"
                />
                <span>Exclusive Deals</span>
                <FontAwesomeIcon
                  icon={faFire}
                  className="text-accent animate-pulse"
                />
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Hot
              </span>
              <span className="block bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Deals
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Limited time offers with massive discounts. Don't miss out on
              these incredible savings!
            </motion.p>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8"
            >
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search deals..."
                  className="w-full bg-glass backdrop-blur-sm border border-border rounded-xl px-4 py-3 pl-12 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
                />
              </div>

              {/* Filter Dropdown */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-glass backdrop-blur-sm border border-border rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="all">All Deals</option>
                <option value="flash-sale">Flash Sales</option>
                <option value="clearance">Clearance</option>
                <option value="seasonal">Seasonal</option>
                <option value="bundle">Bundle Deals</option>
              </select>
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
                  icon: faFire,
                  number: deals.length,
                  label: "Live Deals",
                  color: "from-red-500 to-orange-500",
                },
                {
                  icon: faPercent,
                  number: "Up to 70%",
                  label: "Discount",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: faClock,
                  number: "24/7",
                  label: "Updates",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: faMedal,
                  number: "Premium",
                  label: "Quality",
                  color: "from-accent to-orange-500",
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

      {/* Deals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Results Info */}
          {(searchTerm || filterType !== "all") && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="bg-glass backdrop-blur-sm border border-border rounded-xl px-6 py-3 inline-flex items-center space-x-3">
                <FontAwesomeIcon icon={faFilter} className="text-primary" />
                <span className="text-text-secondary">
                  {filteredDeals.length} deals found
                  {searchTerm && ` for "${searchTerm}"`}
                  {filterType !== "all" && ` in ${filterType} category`}
                </span>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDeals.map((deal, index) => (
                <motion.div
                  key={deal._id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.4 },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="group relative cursor-pointer"
                  onClick={() => handleDealClick(deal._id)}
                >
                  {/* Card */}
                  <div className="relative bg-glass backdrop-blur-sm border border-border rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    {/* Background Gradient Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getDealTypeColor(
                        deal.type
                      )} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />

                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 bg-gradient-to-br ${getDealTypeColor(
                        deal.type
                      )}`}
                    />

                    {/* Content */}
                    <div className="relative p-8">
                      {/* Top Section - Deal Type Badge and Timer */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Deal Type Badge */}
                        <div
                          className={`flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${getDealTypeColor(
                            deal.type
                          )} bg-opacity-20 backdrop-blur-sm border border-opacity-30 rounded-full`}
                        >
                          <FontAwesomeIcon
                            icon={getDealTypeIcon(deal.type)}
                            className="text-white text-xs"
                          />
                          <span className="text-white text-xs font-semibold capitalize">
                            {deal.type.replace("-", " ")}
                          </span>
                        </div>

                        {/* Timer */}
                        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-3 py-1 flex items-center space-x-2">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-red-400 text-xs animate-pulse"
                          />
                          <span className="text-red-400 text-xs font-semibold">
                            {formatTimeRemaining(deal.timeRemaining)}
                          </span>
                        </div>
                      </div>

                      {/* Deal Info */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                          {deal.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {deal.description}
                        </p>

                        {/* Discount Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-2xl font-bold bg-gradient-to-r ${getDealTypeColor(
                                deal.type
                              )} bg-clip-text text-transparent`}
                            >
                              {deal.discountType === "percentage"
                                ? `${deal.discountValue}% OFF`
                                : `$${deal.discountValue} OFF`}
                            </span>
                          </div>

                          {/* Products Count */}
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              className="text-text-muted text-sm"
                            />
                            <span className="text-text-muted text-sm">
                              {deal.products?.length || 0} Products
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Section */}
                      <div className="space-y-4">
                        {/* Primary Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full bg-gradient-to-r ${getDealTypeColor(
                            deal.type
                          )} text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 group-hover:shadow-lg flex items-center justify-center space-x-2`}
                        >
                          <FontAwesomeIcon icon={faEye} />
                          <span>View Deal</span>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="transform group-hover:translate-x-1 transition-transform"
                          />
                        </motion.button>

                        {/* Deal Urgency Indicator */}
                        {deal.timeRemaining &&
                          deal.timeRemaining < 86400000 && (
                            <div className="flex items-center justify-center space-x-2 text-red-400">
                              <FontAwesomeIcon
                                icon={faHourglass}
                                className="animate-pulse"
                              />
                              <span className="text-sm font-semibold">
                                Ends Soon!
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-accent/5 to-orange-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {(searchTerm || filterType !== "all") &&
            filteredDeals.length === 0 && (
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
                    No deals found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search terms or browse all deals.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setSearchTerm("")}
                      className="w-full bg-gradient-to-r from-primary to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      Clear Search
                    </button>
                    <button
                      onClick={() => setFilterType("all")}
                      className="w-full bg-glass backdrop-blur-sm border border-border text-text-primary px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      Show All Deals
                    </button>
                  </div>
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
        className="py-24 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Never Miss a Deal Again!
              </span>
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Subscribe to our deal alerts and get notified about exclusive
              offers, flash sales, and limited-time discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/subscribe"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <FontAwesomeIcon icon={faBolt} className="mr-2" />
                Subscribe to Alerts
              </Link>
              <Link
                to="/shop"
                className="bg-glass backdrop-blur-sm border border-border text-text-primary hover:text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Deals;
