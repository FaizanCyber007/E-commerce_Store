import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShippingFast,
  faShieldAlt,
  faHeadset,
  faUndoAlt,
  faTrophy,
  faUsers,
  faGlobe,
  faStar,
  faQuoteLeft,
  faPercent,
  faFire,
  faTag,
  faBolt,
  faGift,
  faShoppingCart,
  faHeart,
  faEye,
  faSpinner,
  faCrown,
  faRocket,
  faMagic,
  faGem,
  faPlay,
  faCheckCircle,
  faLightbulb,
  faAward,
  faMedal,
  faChartLine,
  faHandshake,
  faPaperPlane,
  faArrowDown,
  faNewspaper,
  faShoppingBag,
  faBoxOpen,
  faCreditCard,
  faLock,
  faSync,
  faTimesCircle,
  faSearch,
  faFilter,
  faSort,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faApple,
  faGoogle,
  faMicrosoft,
  faAmazon,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { productAPI, blogAPI, wishlistAPI } from "../utils/api";
import { addToCart } from "../store/cartSlice";

const Home = () => {
  // State for data
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    customerSatisfaction: 98,
  });

  // Loading states
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);

  // UI states
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Refs and motion values
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Hero slides data with dynamic content
  const heroSlides = [
    {
      id: 1,
      title: "Discover Premium Electronics",
      subtitle: "Latest Tech at Unbeatable Prices",
      description:
        "Experience the future with our cutting-edge electronics collection. From smartphones to smart homes.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      cta: "Shop Electronics",
      link: "/shop?category=electronics",
      gradient: "from-slate-900 via-gray-900 to-black",
      particles: 15,
    },
    {
      id: 2,
      title: "Fashion That Defines You",
      subtitle: "Trendy Styles for Every Occasion",
      description:
        "Express your unique style with our curated fashion collection. From casual to formal, we have it all.",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",
      cta: "Shop Fashion",
      link: "/shop?category=fashion",
      gradient: "from-slate-900 via-gray-900 to-black",
      particles: 12,
    },
    {
      id: 3,
      title: "Transform Your Living Space",
      subtitle: "Home & Garden Essentials",
      description:
        "Create your perfect sanctuary with our premium home decor and lifestyle products.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      cta: "Shop Home",
      link: "/shop?category=home",
      gradient: "from-slate-900 via-gray-900 to-black",
      particles: 18,
    },
  ];

  // Testimonials with real customer feedback
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Designer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b7c37063?q=80&w=150&auto=format&fit=crop",
      text: "EliteShop has completely revolutionized my shopping experience. The quality is exceptional and the customer service is outstanding!",
      rating: 5,
      location: "New York, USA",
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "The premium products and lightning-fast delivery make EliteShop my go-to choice for all tech needs. Simply amazing!",
      rating: 5,
      location: "San Francisco, USA",
    },
    {
      name: "Emma Wilson",
      role: "Interior Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      text: "I've never experienced such attention to detail and customer care. Every purchase feels like a premium experience!",
      rating: 5,
      location: "London, UK",
    },
    {
      name: "David Rodriguez",
      role: "Business Owner",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      text: "EliteShop's product range and quality are unmatched. It's my one-stop shop for everything I need!",
      rating: 5,
      location: "Madrid, Spain",
    },
  ];

  // Initialize component
  useEffect(() => {
    initializeApp();
    setupEventListeners();

    return () => {
      cleanupEventListeners();
    };
  }, []);

  const initializeApp = async () => {
    setLoading(true);

    // Fetch all data in parallel for better performance
    await Promise.allSettled([
      fetchProducts(),
      fetchCategories(),
      fetchBlogs(),
      fetchStats(),
    ]);

    setLoading(false);
  };

  const setupEventListeners = () => {
    // Crystal cursor effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Time update
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    // Hero slide rotation
    const heroInterval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    window.addEventListener("mousemove", handleMouseMove);

    // Store intervals for cleanup
    window.timeInterval = timeInterval;
    window.testimonialInterval = testimonialInterval;
    window.heroInterval = heroInterval;
  };

  const cleanupEventListeners = () => {
    if (window.timeInterval) clearInterval(window.timeInterval);
    if (window.testimonialInterval) clearInterval(window.testimonialInterval);
    if (window.heroInterval) clearInterval(window.heroInterval);
  };

  // Fetch products from MongoDB Atlas
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      // Fetch different product types
      const [featuredResponse, newResponse, bestSellingResponse] =
        await Promise.allSettled([
          productAPI.getFeaturedProducts(8),
          productAPI.getProducts({ limit: 6, sort: "newest" }),
          productAPI.getProducts({ limit: 6, sort: "popular" }),
        ]);

      // Handle successful responses
      if (featuredResponse.status === "fulfilled") {
        setFeaturedProducts(featuredResponse.value.data || []);
      }

      if (newResponse.status === "fulfilled") {
        setNewProducts(newResponse.value.data?.products || []);
      }

      if (bestSellingResponse.status === "fulfilled") {
        setBestSellingProducts(bestSellingResponse.value.data?.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products from database");
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch categories from MongoDB Atlas
  const fetchCategories = async () => {
    try {
      const response = await productAPI.getCategories();

      // API returns { categories: [...] }
      const categoriesData =
        response.data?.categories || response.categories || [];

      // Filter out any invalid categories and validate structure
      const validCategories = categoriesData.filter(
        (category) =>
          category &&
          typeof category === "object" &&
          category.name &&
          typeof category.name === "string"
      );

      setCategories(validCategories.slice(0, 8));
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Set default categories if API fails
      setCategories([
        {
          _id: "electronics",
          name: "Electronics",
          image:
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400",
          count: 0,
        },
        {
          _id: "fashion",
          name: "Fashion",
          image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400",
          count: 0,
        },
        {
          _id: "home",
          name: "Home & Garden",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400",
          count: 0,
        },
        {
          _id: "sports",
          name: "Sports & Outdoor",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400",
          count: 0,
        },
      ]);
    }
  };

  // Fetch blogs from MongoDB Atlas
  const fetchBlogs = async () => {
    try {
      setBlogsLoading(true);
      const response = await blogAPI.getFeaturedBlogs(3);
      setFeaturedBlogs(response.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setFeaturedBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      // In a real app, you'd fetch these from your analytics API
      setStats({
        totalProducts:
          featuredProducts.length +
          newProducts.length +
          bestSellingProducts.length,
        totalCustomers: 12500,
        totalOrders: 45000,
        customerSatisfaction: 98,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Helper functions
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

  const handleAddToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      await wishlistAPI.addToWishlist(product._id);
      toast.success(`${product.name} added to wishlist!`, {
        icon: "❤️",
        style: {
          borderRadius: "10px",
          background: "#1f2937",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to add items to wishlist");
      } else {
        toast.error("Failed to add to wishlist. Please try again.");
      }
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Simulate API call - replace with actual newsletter API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmail("");
      toast.success("Successfully subscribed to newsletter! 🎉", {
        style: {
          borderRadius: "10px",
          background: "#065f46",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"
        }`}
      />
    ));
  };

  const formatPrice = (price) => `$${price.toLocaleString()}`;

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black"
    >
      {/* Crystal Cursor Effect */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-30 animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-r from-cyan-300 to-pink-300 rounded-full blur-xs opacity-50" />
          <div className="absolute inset-3 bg-white rounded-full opacity-80" />
        </div>
      </motion.div>

      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={activeHeroSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroSlides[activeHeroSlide].image})`,
                filter: "blur(2px)",
              }}
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${heroSlides[activeHeroSlide].gradient} opacity-80`}
          />

          {/* Animated geometric shapes */}
          {[...Array(heroSlides[activeHeroSlide].particles)].map((_, i) => (
            <motion.div
              key={`${activeHeroSlide}-${i}`}
              className="absolute rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent animate-pulse">
                Welcome to
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EliteShop
              </span>
            </h1>

            {/* Fixed height container to prevent layout shift */}
            <div className="mb-12 min-h-[280px] md:min-h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-center"
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {heroSlides[activeHeroSlide].title}
                  </h2>
                  <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                    {heroSlides[activeHeroSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 min-h-[80px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cta-${activeHeroSlide}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Link
                    to={heroSlides[activeHeroSlide].link}
                    className="group relative px-12 py-6 overflow-hidden rounded-2xl inline-block"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl transform group-hover:scale-110 transition-all duration-500 shadow-2xl group-hover:shadow-blue-500/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

                    <div className="relative flex items-center text-white font-bold text-lg z-10">
                      <FontAwesomeIcon
                        icon={faRocket}
                        className="mr-3 group-hover:animate-bounce"
                      />
                      {heroSlides[activeHeroSlide].cta}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              <Link
                to="/deals"
                className="group px-10 py-6 bg-white/10 backdrop-blur-xl hover:bg-white/20 border-2 border-white/20 hover:border-white/40 text-white font-bold text-lg rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center"
              >
                <FontAwesomeIcon
                  icon={faPercent}
                  className="mr-3 text-yellow-400 group-hover:rotate-12 transition-transform duration-300"
                />
                Special Deals
                <FontAwesomeIcon
                  icon={faFire}
                  className="ml-3 text-orange-400 group-hover:animate-pulse"
                />
              </Link>
            </motion.div>

            {/* Hero Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: faShoppingBag,
                  value: formatNumber(stats.totalProducts),
                  label: "Products",
                },
                {
                  icon: faUsers,
                  value: formatNumber(stats.totalCustomers),
                  label: "Customers",
                },
                {
                  icon: faShippingFast,
                  value: formatNumber(stats.totalOrders),
                  label: "Orders",
                },
                {
                  icon: faAward,
                  value: `${stats.customerSatisfaction}%`,
                  label: "Satisfaction",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center"
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-3xl text-blue-400 mb-2"
                  />
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <FontAwesomeIcon icon={faArrowDown} className="text-xl" />
            </motion.div>
          </motion.div>

          {/* Hero slide indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveHeroSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeHeroSlide
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            >
              Shop by Category
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Discover our carefully curated collections across diverse
              categories
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          {categories && categories.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {categories
                .filter((category) => category && category.name)
                .map((category, index) => (
                  <motion.div
                    key={category._id}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="group cursor-pointer"
                  >
                    <Link
                      to={`/shop?category=${
                        category.name?.toLowerCase() || ""
                      }`}
                    >
                      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden">
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                          <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-700">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <h3 className="font-bold text-white text-center mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            {category.name}
                          </h3>

                          <p className="text-sm text-gray-400 text-center">
                            {category.count} items
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          )}

          {/* See All Categories Button */}
          {categories && categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link
                to="/categories"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                See All Categories
                <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            >
              Featured Products
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Discover our handpicked selection of premium products from your
              database
            </motion.p>
          </motion.div>

          {productsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="aspect-square bg-gray-700 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {featuredProducts.map((product, index) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
            >
              View All Products
              <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 backdrop-blur-sm" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-300">
              Trusted by thousands worldwide
            </motion.p>
          </motion.div>

          <AnimatePresence>
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                {/* Quote icon */}
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="absolute top-6 left-6 text-4xl text-blue-400/20"
                />

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-xl"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map(
                        (_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="text-yellow-400 text-xl mr-1"
                          />
                        )
                      )}
                    </div>

                    <blockquote className="text-xl md:text-2xl text-white mb-6 italic leading-relaxed">
                      "{testimonials[activeTestimonial].text}"
                    </blockquote>

                    <div>
                      <div className="text-blue-300 font-bold text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonials[activeTestimonial].role} •{" "}
                        {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50"></div>
          <motion.div
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Stay Updated with
              <span className="block bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent">
                Latest Trends
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            >
              Get exclusive access to new collections, special offers, and
              insider news
            </motion.p>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubscribe}
              className="max-w-md mx-auto mb-8"
            >
              <div className="flex sm:flex-4 lg:gap-40 p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-300 focus:outline-none text-lg"
                  disabled={isSubmitting}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <FontAwesomeIcon icon={faSpinner} className="text-lg" />
                    </motion.div>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm"
            >
              {[
                { icon: faCheckCircle, text: "No spam, ever" },
                { icon: faCheckCircle, text: "Exclusive deals" },
                { icon: faCheckCircle, text: "Unsubscribe anytime" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-green-400 mr-2"
                  />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent)] opacity-70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent)] opacity-70"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-8"
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Join thousands of satisfied customers worldwide and experience the
              future of shopping
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/shop"
                className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xl rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                <FontAwesomeIcon
                  icon={faRocket}
                  className="mr-4 group-hover:animate-bounce"
                />
                Start Shopping Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FontAwesomeIcon icon={faArrowRight} className="ml-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
