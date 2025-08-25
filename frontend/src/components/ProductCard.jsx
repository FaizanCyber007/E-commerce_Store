import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faEye,
  faStar,
  faTag,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { cartAPI } from "../utils/cartAPI";
import { wishlistAPI } from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import toast from "react-hot-toast";

const ProductCard = ({ product, className = "" }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      toast.error("Please login to add items to cart");
      return;
    }

    setIsAddingToCart(true);
    try {
      await cartAPI.addToCart(product._id || product.id, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      await wishlistAPI.addToWishlist(product._id);
      setIsWishlisted(!isWishlisted);
      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`w-3 h-3 ${
            i < fullStars ? "text-yellow-400" : "text-gray-500"
          }`}
        />
      );
    }

    return stars;
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      className={`group relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden h-full flex flex-col group-hover:border-blue-400/30 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
              <FontAwesomeIcon icon={faTag} className="mr-1" />-
              {discountPercentage}%
            </div>
          )}
          {product.isNew && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              NEW
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            <FontAwesomeIcon
              icon={isWishlisted ? faHeart : faHeartRegular}
              className={`text-sm ${
                isWishlisted ? "text-red-500" : "text-white"
              }`}
            />
          </motion.button>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-700">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay Actions */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleAddToCart}
                      disabled={product.countInStock === 0 || isAddingToCart}
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-sm"
                      />
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faEye} className="text-sm" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stock Status */}
            {product.countInStock === 0 && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="bg-red-600 text-white px-3 py-2 rounded-lg font-semibold text-sm">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand */}
          {product.brand && (
            <div className="text-xs text-blue-400 font-medium mb-1 uppercase tracking-wide">
              {product.brand}
            </div>
          )}

          {/* Product Name */}
          <Link to={`/product/${product.slug}`} className="block mb-2">
            <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-200 text-sm line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(product.rating || 4.5)}
            </div>
            <span className="text-xs text-gray-400">
              ({product.numReviews || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-blue-400">
              ${(product.price || 0).toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="mt-auto">
            {product.countInStock > 0 && product.countInStock <= 5 && (
              <div className="text-xs text-orange-400 mb-2">
                Only {product.countInStock} left!
              </div>
            )}

            {product.price >= 100 && (
              <div className="flex items-center text-xs text-green-400">
                <FontAwesomeIcon icon={faShippingFast} className="mr-1" />
                <span>Free Shipping</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
