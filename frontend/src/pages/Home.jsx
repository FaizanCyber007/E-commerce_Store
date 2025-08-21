import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShippingFast,
  faShieldAlt,
  faHeadset,
  faUndoAlt,
  faStar,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import Hero from "../components/Hero.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice.js";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 12, featured: true }));
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const featuredProducts = list.slice(0, 6);
  const newArrivals = list.slice(6, 12);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-dark-800 to-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: faShippingFast,
                title: "Free Shipping",
                description: "On orders over $100",
              },
              {
                icon: faShieldAlt,
                title: "Secure Payment",
                description: "100% secure transactions",
              },
              {
                icon: faHeadset,
                title: "24/7 Support",
                description: "Dedicated customer service",
              },
              {
                icon: faUndoAlt,
                title: "Easy Returns",
                description: "30-day return policy",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-6 glass-effect rounded-xl"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-2xl text-primary-400"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              <FontAwesomeIcon icon={faStar} className="text-accent-400 mr-3" />
              Featured Products
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products from top
              brands
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.slug || product._id}
                  variants={itemVariants}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center">
            <Link
              to="/shop"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>View All Products</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              <FontAwesomeIcon
                icon={faFire}
                className="text-primary-400 mr-3"
              />
              New Arrivals
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Be the first to discover the latest additions to our collection
            </p>
          </motion.div>

          {!loading && newArrivals.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {newArrivals.map((product) => (
                <motion.div
                  key={product.slug || product._id}
                  variants={itemVariants}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600/20 to-secondary-600/20">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated with Latest Deals
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter and get exclusive offers, new product
              launches, and special discounts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-dark-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary px-8 py-4 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
