import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faTrash,
  faEye,
  faStar,
  faShare,
  faShoppingBag,
  faSearch,
  faFilter,
  faSort,
  faTh,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useGetWishlistQuery } from "../store/apiSlice.js";

const Wishlist = () => {
  const { data: items, isLoading } = useGetWishlistQuery();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock wishlist data for demonstration
  const mockWishlist = [
    {
      _id: "1",
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400",
      price: 1199,
      originalPrice: 1299,
      rating: 4.8,
      numReviews: 287,
      countInStock: 10,
      brand: "Apple",
      category: "Electronics",
      dateAdded: "2024-01-20",
      onSale: true,
    },
    {
      _id: "2",
      name: "Sony WH-1000XM5",
      slug: "sony-wh-1000xm5",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
      price: 399,
      originalPrice: 449,
      rating: 4.7,
      numReviews: 342,
      countInStock: 8,
      brand: "Sony",
      category: "Electronics",
      dateAdded: "2024-01-18",
      onSale: true,
    },
    {
      _id: "3",
      name: "Apple Watch Ultra 2",
      slug: "apple-watch-ultra-2",
      image:
        "https://images.unsplash.com/photo-1510017098667-27dfc7150e5d?q=80&w=400",
      price: 799,
      originalPrice: 799,
      rating: 4.6,
      numReviews: 198,
      countInStock: 12,
      brand: "Apple",
      category: "Electronics",
      dateAdded: "2024-01-15",
      onSale: false,
    },
    {
      _id: "4",
      name: "iPad Pro 12.9-inch",
      slug: "ipad-pro-12-9-inch",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400",
      price: 1099,
      originalPrice: 1199,
      rating: 4.8,
      numReviews: 223,
      countInStock: 18,
      brand: "Apple",
      category: "Electronics",
      dateAdded: "2024-01-12",
      onSale: true,
    },
  ];

  const displayItems = items && items.length > 0 ? items : mockWishlist;

  const filteredItems = displayItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFromWishlist = (id) => {
    // Remove from wishlist logic
    console.log("Removing from wishlist:", id);
  };

  const addToCart = (item) => {
    // Add to cart logic
    console.log("Adding to cart:", item);
  };

  const moveAllToCart = () => {
    // Move all items to cart
    console.log("Moving all items to cart");
  };

  const clearWishlist = () => {
    // Clear wishlist logic
    console.log("Clearing wishlist");
  };

  if (isLoading) {
    return (
      <div className="pt-16">
        <div className="container py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-red-600/20"></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
              My Wishlist
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Save your favorite items for later
            </p>
            <div className="flex items-center justify-center text-pink-400">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              <span>
                {filteredItems.length} item
                {filteredItems.length !== 1 ? "s" : ""} saved
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mx-auto"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="text-6xl text-gray-600 mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-400 mb-8">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link to="/shop" className="btn btn-primary">
              <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
              Start Shopping
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="container py-8">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Saved Items ({filteredItems.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={moveAllToCart}
                  className="btn btn-primary btn-sm"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add All to Cart
                </button>
                <button
                  onClick={clearWishlist}
                  className="btn btn-outline btn-sm text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Clear Wishlist
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faTh} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
              </div>
            </div>
          </div>

          {/* Wishlist Items */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card hover-lift overflow-hidden group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-48 flex-shrink-0" : "h-64"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Sale Badge */}
                  {item.onSale && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Sale
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      title="Remove from wishlist"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    </button>
                    <button className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faShare} className="text-xs" />
                    </button>
                  </div>

                  {/* Stock Status */}
                  {item.countInStock === 0 && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-2">
                    <span className="text-blue-400 text-sm">{item.brand}</span>
                  </div>

                  <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </h3>

                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`text-sm ${
                            i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {item.rating} ({item.numReviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-400">
                        ${item.price}
                      </span>
                      {item.onSale && (
                        <span className="text-sm text-gray-400 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">
                      Added {new Date(item.dateAdded).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.countInStock === 0}
                      className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      {item.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                    <Link
                      to={`/product/${item.slug}`}
                      className="btn btn-outline"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </div>

                  {item.countInStock > 0 && item.countInStock < 10 && (
                    <div className="mt-2 text-orange-400 text-sm">
                      Only {item.countInStock} left in stock!
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recommended Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="text-center py-8 bg-gray-800 rounded-lg">
              <FontAwesomeIcon
                icon={faShoppingBag}
                className="text-4xl text-gray-600 mb-4"
              />
              <p className="text-gray-400">
                Continue shopping to discover more products you'll love
              </p>
              <Link to="/shop" className="btn btn-primary mt-4">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
