import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUser,
  faTag,
  faEye,
  faComment,
  faSearch,
  faArrowRight,
  faClock,
  faFire,
  faBookmark,
  faShare,
  faHeart,
  faRss,
  faPenFancy,
  faBlog,
  faQuoteLeft,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { blogAPI } from "../utils/api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Fetch blogs data
  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, currentPage]);

  // Fetch categories and featured blogs on mount
  useEffect(() => {
    fetchCategories();
    fetchFeaturedBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 9,
        ...(selectedCategory !== "All Posts" && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      };

      const response = await blogAPI.getBlogs(params);

      if (response?.data) {
        setBlogs(response.data.blogs || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await blogAPI.getCategories();

      if (response?.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await blogAPI.getFeaturedBlogs(3);

      if (response?.data && Array.isArray(response.data)) {
        setFeaturedBlogs(response.data);
      } else {
        setFeaturedBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
      setFeaturedBlogs([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown Date";
    }
  };

  const truncateContent = (content, wordLimit = 20) => {
    const words = content?.split(" ") || [];
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content || "";
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, Math.random() * 0.5 + 0.8],
              opacity: [0.1, Math.random() * 0.3 + 0.1],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-400 font-semibold text-sm tracking-wide border border-blue-500/30 backdrop-blur-sm">
                <FontAwesomeIcon icon={faPenFancy} className="mr-2" />
                DISCOVER & EXPLORE
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Latest
              </span>
              <br />
              <span className="text-white">Stories &</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Insights
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Dive into our collection of tech reviews, industry insights, and
              expert opinions that keep you ahead of the curve in the digital
              world.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={itemVariants}
              className="max-w-2xl mx-auto mb-8"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-2 flex items-center">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles, reviews, and insights..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-6 py-4 focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Search
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Category Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center"
            >
              <button
                onClick={() => handleCategoryChange("All Posts")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "All Posts"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </section>

      {/* Featured Blogs Section */}
      {featuredBlogs.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
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
                Featured Stories
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Hand-picked articles that showcase the latest trends and
                insights
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {featuredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          blog.featuredImage?.url ||
                          `https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=600&auto=format&fit=crop`
                        }
                        alt={blog.featuredImage?.alt || blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                          <FontAwesomeIcon icon={faFire} className="mr-1" />
                          FEATURED
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                          <FontAwesomeIcon icon={faBookmark} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faCalendar} />
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faEye} />
                          {blog.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faClock} />
                          {blog.readTime || 5} min
                        </span>
                      </div>

                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full mb-3">
                        {blog.category}
                      </span>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {blog.excerpt || truncateContent(blog.content)}
                      </p>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 group-hover:translate-x-2"
                      >
                        Read More
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Blogs Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
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
              {selectedCategory === "All Posts"
                ? "All Articles"
                : selectedCategory}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              {loading
                ? "Loading articles..."
                : `Showing ${blogs.length} articles`}
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="text-3xl text-red-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Something went wrong
              </h3>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={fetchBlogs}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </motion.div>
          ) : blogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-500/20 rounded-full mb-6">
                <FontAwesomeIcon
                  icon={faBlog}
                  className="text-3xl text-gray-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Articles Found
              </h3>
              <p className="text-gray-300">
                Try adjusting your search or browse different categories.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            blog.featuredImage?.url ||
                            `https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=600&auto=format&fit=crop&seed=${index}`
                          }
                          alt={blog.featuredImage?.alt || blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                            <FontAwesomeIcon icon={faShare} />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                            {blog.category}
                          </span>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faEye} />
                              {blog.views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faClock} />
                              {blog.readTime || 5}m
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {blog.excerpt || truncateContent(blog.content)}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <FontAwesomeIcon icon={faUser} />
                            <span>{blog.author?.name || "Admin"}</span>
                            <span>•</span>
                            <span>
                              {formatDate(blog.publishedAt || blog.createdAt)}
                            </span>
                          </div>

                          <Link
                            to={`/blog/${blog.slug}`}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 group-hover:translate-x-1"
                          >
                            <FontAwesomeIcon icon={faArrowRight} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex justify-center items-center gap-4"
                >
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stay Updated
              </span>
              <br />
              <span className="text-white">with Latest Stories</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Subscribe to our newsletter and never miss out on the latest tech
              insights, product reviews, and industry trends.
            </motion.p>
            <motion.div variants={itemVariants} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center gap-2">
                  <FontAwesomeIcon icon={faRss} />
                  Subscribe
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
