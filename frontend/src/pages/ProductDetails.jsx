import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShoppingCart,
  faHeart,
  faShare,
  faShippingFast,
  faUndo,
  faShieldAlt,
  faCheckCircle,
  faThumbsUp,
  faThumbsDown,
  faChevronLeft,
  faChevronRight,
  faTags,
  faBoxOpen,
  faInfoCircle,
  faPlus,
  faMinus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock product data (in real app, this would come from API)
  const product = {
    _id: "64c23350e32f4a5b7c1f2a45",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Electronics",
    price: 1199,
    originalPrice: 1299,
    countInStock: 10,
    rating: 4.8,
    numReviews: 287,
    isNew: false,
    onSale: true,
    slug: "iphone-15-pro-max",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800",
    ],
    description:
      "The iPhone 15 Pro Max represents the pinnacle of smartphone technology, featuring the revolutionary A17 Pro chip built on a 3-nanometer process. This powerhouse device delivers unprecedented performance while maintaining exceptional battery life. The titanium design makes it both lighter and more durable than its predecessors.",
    fullDescription:
      "Experience the future of mobile technology with the iPhone 15 Pro Max. This flagship device combines cutting-edge performance with stunning design, featuring a titanium build that's both lightweight and incredibly strong. The A17 Pro chip delivers desktop-class performance in the palm of your hand, while the advanced camera system captures professional-quality photos and videos. With ProRAW photography, Action mode video stabilization, and all-day battery life, this is the ultimate smartphone for creators and professionals.",
    features: [
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP main",
      "Action mode video stabilization",
      "Always-On display technology",
      "5G connectivity worldwide",
      "Face ID security system",
      "MagSafe wireless charging",
      "Water resistant to 6 meters",
    ],
    specifications: {
      Display: "6.7-inch Super Retina XDR",
      Processor: "A17 Pro chip",
      Storage: "256GB, 512GB, 1TB",
      Camera: "48MP + 12MP + 12MP",
      Battery: "Up to 29 hours video",
      "Operating System": "iOS 17",
      Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
      Weight: "221 grams",
    },
    colors: [
      "Natural Titanium",
      "Blue Titanium",
      "White Titanium",
      "Black Titanium",
    ],
    sizes: ["128GB", "256GB", "512GB", "1TB"],
  };

  const reviews = [
    {
      _id: "1",
      user: "John Smith",
      rating: 5,
      comment:
        "Absolutely amazing phone! The camera quality is outstanding and the performance is incredible. Best iPhone yet!",
      date: "2024-01-15",
      verified: true,
      helpful: 24,
    },
    {
      _id: "2",
      user: "Sarah Johnson",
      rating: 4,
      comment:
        "Great phone overall. Battery life is excellent and the build quality is premium. Only wish it was a bit cheaper.",
      date: "2024-01-10",
      verified: true,
      helpful: 18,
    },
    {
      _id: "3",
      user: "Mike Chen",
      rating: 5,
      comment:
        "The titanium design feels amazing in hand. Camera improvements are significant, especially in low light conditions.",
      date: "2024-01-08",
      verified: false,
      helpful: 12,
    },
  ];

  const relatedProducts = [
    {
      _id: "1",
      name: "iPhone 15 Pro",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300",
      rating: 4.7,
      slug: "iphone-15-pro",
    },
    {
      _id: "2",
      name: "AirPods Pro 2",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=300",
      rating: 4.8,
      slug: "airpods-pro-2",
    },
    {
      _id: "3",
      name: "Apple Watch Ultra 2",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1510017098667-27dfc7150e5d?q=80&w=300",
      rating: 4.6,
      slug: "apple-watch-ultra-2",
    },
    {
      _id: "4",
      name: "MagSafe Charger",
      price: 39,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=300",
      rating: 4.5,
      slug: "magsafe-charger",
    },
  ];

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Adding to cart:", {
      product: product._id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.countInStock) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStar}
          className="text-yellow-400 opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          className="text-gray-600"
        />
      );
    }

    return stars;
  };

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/categories/${product.category.toLowerCase()}`}
            className="hover:text-white"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative overflow-hidden rounded-xl bg-gray-800"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    New
                  </div>
                )}
                {product.onSale && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Sale
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-400"
                      : "border-gray-700"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Brand & Title */}
              <div className="mb-4">
                <p className="text-blue-400 font-medium mb-2">
                  {product.brand}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-white font-medium">
                    {product.rating}
                  </span>
                </div>
                <div className="text-gray-400">
                  ({product.numReviews} reviews)
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-green-400">
                    ${product.price}
                  </span>
                  {product.onSale && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100
                        )}
                        % OFF
                      </span>
                    </>
                  )}
                </div>
                {product.countInStock < 10 && (
                  <p className="text-orange-400 text-sm">
                    Only {product.countInStock} left in stock!
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed">
                  {showFullDescription
                    ? product.fullDescription
                    : product.description}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2"
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                          selectedColor === color
                            ? "border-blue-400 bg-blue-400/10 text-blue-400"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Storage</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                          selectedSize === size
                            ? "border-blue-400 bg-blue-400/10 text-blue-400"
                            : "border-gray-600 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-600 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.countInStock}
                      className="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {product.countInStock} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1"
                  disabled={!selectedSize || !selectedColor}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to Cart
                </button>
                <button className="btn btn-outline">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="btn btn-outline">
                  <FontAwesomeIcon icon={faShare} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className="text-blue-400 text-xl mb-2"
                  />
                  <p className="text-sm text-gray-300">Free Shipping</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <FontAwesomeIcon
                    icon={faUndo}
                    className="text-green-400 text-xl mb-2"
                  />
                  <p className="text-sm text-gray-300">30-Day Return</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-purple-400 text-xl mb-2"
                  />
                  <p className="text-sm text-gray-300">2-Year Warranty</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-blue-400 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab}
                  {tab === "reviews" && ` (${product.numReviews})`}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      About This Product
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {product.fullDescription}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-400 mr-3 mt-1 text-sm"
                          />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-gray-800"
                      >
                        <span className="font-medium text-gray-300">{key}</span>
                        <span className="text-gray-400">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Reviews Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <button className="btn btn-outline btn-sm">
                    Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{review.user}</h4>
                            {review.verified && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-400">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{review.comment}</p>

                      <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-green-400 text-sm">
                          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-gray-400 hover:text-red-400 text-sm">
                          <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="mr-1"
                          />
                          Not helpful
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover-lift overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faEye} className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 hover:text-blue-400 transition-colors">
                    <Link to={`/product/${relatedProduct.slug}`}>
                      {relatedProduct.name}
                    </Link>
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-1 mr-2">
                      {renderStars(relatedProduct.rating)}
                    </div>
                    <span className="text-sm text-gray-400">
                      {relatedProduct.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-400">
                      ${relatedProduct.price}
                    </span>
                    <button className="btn btn-primary btn-sm">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
