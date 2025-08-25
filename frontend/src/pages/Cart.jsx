import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faShoppingCart,
  faHeart,
  faArrowLeft,
  faShippingFast,
  faShieldAlt,
  faUndo,
  faTag,
  faGift,
  faPercentage,
  faTimes,
  faShoppingBag,
  faLock,
  faSpinner,
  faExclamationTriangle,
  faCheck,
  faCrown,
  faStar,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { cartAPI } from "../utils/cartAPI";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const navigate = useNavigate();

  // Get user info from Redux store
  const { userInfo } = useSelector((state) => state.user || {});

  // Fetch user's cart from API
  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Cart: Fetching cart for user:", userInfo.name);
        const response = await cartAPI.getCart();
        console.log("Cart: Full API response:", response);
        console.log("Cart: Response cart data:", response.cart);
        console.log("Cart: Cart items count:", response.cart?.length || 0);

        // Handle different possible response structures
        if (response.cart && Array.isArray(response.cart)) {
          setCartItems(response.cart);
        } else if (response.data && Array.isArray(response.data)) {
          setCartItems(response.data);
        } else if (Array.isArray(response)) {
          setCartItems(response);
        } else {
          console.warn("Cart: Unexpected response structure:", response);
          setCartItems([]);
        }

        setError(null);
        console.log("Cart: Set cart items:", cartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError(error.message);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userInfo]);

  // Update cart item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (!userInfo) {
      toast.error("Please sign in to update cart");
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      setUpdating(true);
      await cartAPI.updateCartItem(productId, newQuantity);

      // Update local state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      toast.success("Cart updated!");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error(error.message || "Failed to update cart");
    } finally {
      setUpdating(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!userInfo) {
      toast.error("Please sign in to remove items");
      return;
    }

    try {
      setUpdating(true);
      await cartAPI.removeFromCart(productId);

      // Update local state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error(error.message || "Failed to remove item");
    } finally {
      setUpdating(false);
    }
  };

  // Move item to wishlist
  const moveToWishlist = async (productId) => {
    if (!userInfo) {
      toast.error("Please sign in to use wishlist");
      return;
    }

    try {
      // For now, just remove from cart - you can implement wishlist API later
      await removeFromCart(productId);
      toast.success("Item moved to wishlist!");
    } catch (error) {
      toast.error("Failed to move item to wishlist");
    }
  };

  // Apply promo code
  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    try {
      setUpdating(true);
      // Mock promo code validation
      const validCodes = {
        SAVE10: { discount: 0.1, type: "percentage" },
        SAVE20: { discount: 0.2, type: "percentage" },
        FREESHIP: { discount: 10, type: "fixed" },
      };

      if (validCodes[promoCode.toUpperCase()]) {
        setAppliedPromo({
          code: promoCode.toUpperCase(),
          ...validCodes[promoCode.toUpperCase()],
        });
        toast.success("Promo code applied!");
        setPromoCode("");
      } else {
        toast.error("Invalid promo code");
      }
    } catch (error) {
      toast.error("Failed to apply promo code");
    } finally {
      setUpdating(false);
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
    toast.success("Promo code removed");
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? subtotal * appliedPromo.discount
      : appliedPromo.discount
    : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - promoDiscount) * 0.1;
  const total = subtotal - promoDiscount + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-primary mb-4"
          />
          <p className="text-text-secondary">Loading your cart...</p>
        </motion.div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-lg mx-auto"
          >
            <div className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-12 shadow-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-full mb-6 shadow-lg"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-3xl text-white"
                />
              </motion.div>

              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Welcome to Your Cart
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Sign in to view your saved items and start shopping with
                personalized recommendations.
              </p>

              <div className="space-y-4">
                <Link
                  to="/login"
                  className="w-full bg-gradient-to-r from-primary to-purple-500 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-lg inline-block"
                >
                  Sign In to Your Account
                </Link>
                <Link
                  to="/register"
                  className="w-full bg-background/50 border border-border text-text-primary py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 hover:bg-background/70 inline-block"
                >
                  Create New Account
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-text-muted text-sm mb-4">
                  Or continue browsing our products
                </p>
                <Link
                  to="/shop"
                  className="text-primary hover:text-accent transition-colors font-medium"
                >
                  Explore Our Collection →
                </Link>
              </div>

              <div className="flex items-center justify-center mt-6 text-xs text-text-muted">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="mr-2 text-green-400"
                />
                Secure shopping with 256-bit SSL encryption
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-6xl text-red-400 mb-6"
          />
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Error Loading Cart
          </h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    console.log("Cart: No items in cart, showing empty state");
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-lg mx-auto"
          >
            <div className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-12 shadow-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-accent to-secondary rounded-full mb-8 shadow-lg"
              >
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-4xl text-white"
                />
              </motion.div>

              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Your Cart Awaits
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Discover our premium collection and add items that speak to your
                style. Every purchase is backed by our satisfaction guarantee.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-8">
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-primary to-purple-500 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
                  Explore Our Collection
                </Link>
                <Link
                  to="/categories"
                  className="bg-background/50 border border-border text-text-primary py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 hover:bg-background/70 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTag} className="mr-3" />
                  Browse by Category
                </Link>
                <Link
                  to="/deals"
                  className="bg-gradient-to-r from-accent to-secondary text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faRocket} className="mr-3" />
                  View Special Deals
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm text-text-muted">
                <div>
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className="text-green-400 text-lg mb-2 block"
                  />
                  Free Shipping
                  <br />
                  Over $100
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-blue-400 text-lg mb-2 block"
                  />
                  Secure
                  <br />
                  Checkout
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faUndo}
                    className="text-purple-400 text-lg mb-2 block"
                  />
                  Easy
                  <br />
                  Returns
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  console.log("Cart: Rendering cart with items:", cartItems);
  console.log("Cart: Number of items:", cartItems.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4"
              >
                Shopping Cart
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4 text-text-secondary"
              >
                <span className="flex items-center">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="mr-2 text-primary"
                  />
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="mr-2 text-accent"
                  />
                  VIP Member
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <Link
                to="/shop"
                className="flex items-center px-6 py-3 bg-background/30 border border-border rounded-xl text-text-primary hover:bg-background/50 transition-all transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Continue Shopping
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center px-4 py-3 bg-accent/20 border border-accent/40 rounded-xl text-accent hover:bg-accent/30 transition-all"
              >
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                Wishlist
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Cart Items Section */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-primary">
                  Cart Items
                </h2>
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-green-400"
                  />
                  <span>Secure Shopping</span>
                </div>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.product._id}-${JSON.stringify(
                        item.variant || {}
                      )}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-background/30 border border-border rounded-2xl p-6 hover:bg-background/40 transition-all duration-300"
                    >
                      {updating && (
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="text-2xl text-primary"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-background/50 flex-shrink-0 shadow-lg">
                          {item.product.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={faShoppingBag}
                                className="text-text-muted text-2xl"
                              />
                            </div>
                          )}
                          {item.product.badge && (
                            <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-semibold">
                              {item.product.badge}
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                                {item.product.name}
                              </h3>
                              <p className="text-text-muted text-sm mb-2">
                                SKU: {item.product._id?.slice(-6) || "N/A"}
                              </p>
                              <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-primary">
                                  ${item.product.price?.toFixed(2) || "0.00"}
                                </span>
                                {item.product.originalPrice && (
                                  <span className="text-text-muted line-through">
                                    ${item.product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                                {item.product.discount && (
                                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-lg text-sm font-semibold">
                                    -{item.product.discount}%
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => moveToWishlist(item.product._id)}
                                className="p-2 bg-background/50 border border-border rounded-xl text-text-muted hover:text-accent hover:border-accent transition-all"
                                title="Move to Wishlist"
                              >
                                <FontAwesomeIcon icon={faHeart} />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product._id)}
                                disabled={updating}
                                className="p-2 bg-background/50 border border-border rounded-xl text-text-muted hover:text-red-400 hover:border-red-400 transition-all disabled:opacity-50"
                                title="Remove Item"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-text-secondary text-sm">
                                Quantity:
                              </span>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={updating || item.quantity <= 1}
                                  className="w-10 h-10 rounded-xl bg-background/50 border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background/70 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="text-sm"
                                  />
                                </button>

                                <span className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-xl text-text-primary font-bold min-w-[60px] text-center">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    updating ||
                                    item.quantity >=
                                      (item.product.countInStock || 10)
                                  }
                                  className="w-10 h-10 rounded-xl bg-background/50 border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background/70 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="text-sm"
                                  />
                                </button>
                              </div>
                              {item.product.countInStock &&
                                item.product.countInStock < 10 && (
                                  <span className="text-accent text-sm">
                                    Only {item.product.countInStock} left
                                  </span>
                                )}
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-2xl font-bold text-text-primary">
                                $
                                {(
                                  (item.product.price || 0) * item.quantity
                                ).toFixed(2)}
                              </p>
                              <p className="text-text-muted text-sm">
                                ${item.product.price?.toFixed(2) || "0.00"} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl sticky top-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-text-primary">
                  Order Summary
                </h3>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-400 text-xl"
                />
              </div>

              {/* Promo Code Section */}
              <div className="mb-8 p-4 bg-background/30 border border-border rounded-xl">
                <div className="flex items-center mb-3">
                  <FontAwesomeIcon icon={faTag} className="text-accent mr-2" />
                  <span className="font-semibold text-text-primary">
                    Promo Code
                  </span>
                </div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-accent/20 border border-accent/40 rounded-lg">
                    <div>
                      <span className="text-accent font-bold">
                        {appliedPromo.code}
                      </span>
                      <p className="text-text-muted text-sm">
                        {appliedPromo.type === "percentage"
                          ? `${(appliedPromo.discount * 100).toFixed(0)}% off`
                          : `$${appliedPromo.discount.toFixed(2)} off`}
                      </p>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 bg-background/50 border border-border rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      onKeyPress={(e) => e.key === "Enter" && applyPromoCode()}
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={updating || !promoCode.trim()}
                      className="px-4 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Order Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-accent">
                    <span>Discount ({appliedPromo.code})</span>
                    <span className="font-semibold">
                      -${promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-text-secondary">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faShippingFast} className="mr-2" />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-400">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-xl font-bold text-text-primary">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Benefits */}
              <div className="mb-8">
                {shipping === 0 ? (
                  <div className="p-4 bg-green-400/20 border border-green-400/40 rounded-xl">
                    <div className="flex items-center text-green-400 mb-2">
                      <FontAwesomeIcon icon={faCheck} className="mr-2" />
                      <span className="font-semibold">
                        Free Shipping Unlocked!
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      You've qualified for free shipping on this order.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-primary/20 border border-primary/40 rounded-xl">
                    <div className="flex items-center text-primary mb-2">
                      <FontAwesomeIcon icon={faShippingFast} className="mr-2" />
                      <span className="font-semibold">
                        Free Shipping Available
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Add ${(100 - subtotal + promoDiscount).toFixed(2)} more to
                      qualify for free shipping.
                    </p>
                    <div className="mt-3 bg-background/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            ((subtotal - promoDiscount) / 100) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-gradient-to-r from-primary to-purple-500 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faLock} className="mr-3" />
                  Proceed to Checkout
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/shop"
                    className="px-4 py-3 bg-background/50 border border-border rounded-xl text-text-primary text-center hover:bg-background/70 transition-all flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    Continue Shopping
                  </Link>
                  <Link
                    to="/wishlist"
                    className="px-4 py-3 bg-accent/20 border border-accent/40 rounded-xl text-accent text-center hover:bg-accent/30 transition-all flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    Wishlist
                  </Link>
                </div>
              </div>

              {/* Security & Trust Badges */}
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-text-muted">
                  <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-green-400 text-lg mb-1"
                    />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faUndo}
                      className="text-blue-400 text-lg mb-1"
                    />
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faShippingFast}
                      className="text-purple-400 text-lg mb-1"
                    />
                    <span>Fast Delivery</span>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-text-muted text-xs flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="mr-2 text-green-400"
                    />
                    Protected by 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
