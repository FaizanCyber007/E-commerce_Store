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
import { addToCart } from "../store/cartSlice.js";
import toast from "react-hot-toast";

const ProductCard = ({ product, className = "" }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        product: product._id || product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
        countInStock: product.countInStock,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="text-accent-400 text-sm"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStar}
          className="text-accent-400 text-sm opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          className="text-gray-600 text-sm"
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
      <div className="card overflow-hidden h-full flex flex-col relative">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-accent-400 text-dark-900 px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
              <FontAwesomeIcon icon={faTag} />
              <span>-{discountPercentage}%</span>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-primary-500 text-dark-900 px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          </div>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <Link to={`/product/${product.slug}`} className="block h-full">
            <img
              src={
                product.images && product.images.length > 1 && isHovered
                  ? product.images[1]
                  : product.image
              }
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </Link>

          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-0 bg-dark-900/30 flex items-center justify-center space-x-3"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <FontAwesomeIcon
                    icon={isWishlisted ? faHeart : faHeartRegular}
                    className={`text-lg ${
                      isWishlisted ? "text-red-500" : "text-white"
                    }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <Link to={`/product/${product.slug}`}>
                    <FontAwesomeIcon icon={faEye} className="text-lg" />
                  </Link>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stock Status */}
          {product.countInStock === 0 && (
            <div className="absolute inset-0 bg-dark-900/70 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Brand */}
          {product.brand && (
            <div className="text-sm text-primary-400 font-medium mb-1">
              {product.brand}
            </div>
          )}

          {/* Product Name */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-primary-400 transition-colors duration-200 mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-400">
              ({product.numReviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl font-bold text-primary-400">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Features */}
          <div className="mt-auto">
            {product.countInStock > 0 && product.countInStock <= 5 && (
              <div className="text-sm text-accent-400 mb-2">
                Only {product.countInStock} left in stock!
              </div>
            )}

            {product.price >= 100 && (
              <div className="flex items-center text-sm text-green-400">
                <FontAwesomeIcon icon={faShippingFast} className="mr-2" />
                <span>Free Shipping</span>
              </div>
            )}
          </div>

          {/* Add to Cart Button (Mobile) */}
          <div className="block sm:hidden mt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
