import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faShippingFast,
  faShieldAlt,
  faHeadset,
  faArrowUp,
  faPaperPlane,
  faUser,
  faCrown,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mt-10"
          >
            {/* Column 1: Logo/Brand and Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 space-y-7"
            >
              <Link to="/" className="inline-flex items-center group">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-white text-2xl group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                </div>
                <span className="ml-4 text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                  EliteShop
                </span>
              </Link>

              <p className="text-gray-200 leading-relaxed text-base font-medium tracking-wide">
                Crafting exceptional shopping experiences with <span className="text-blue-400 font-semibold">premium products</span>, outstanding service, and innovation at every step.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  {
                    icon: faMapMarkerAlt,
                    text: "123 Elite Street, Commerce City, NY 10001",
                  },
                  { icon: faPhone, text: "+1 (555) 123-4567" },
                  { icon: faEnvelope, text: "hello@eliteshop.com" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FontAwesomeIcon
                        icon={contact.icon}
                        className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-base leading-relaxed font-medium">
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center tracking-tight">
                <FontAwesomeIcon
                  icon={faRocket}
                  className="mr-3 text-blue-400"
                />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "New Arrivals", path: "/shop?filter=new" },
                  { name: "Best Sellers", path: "/shop?filter=bestsellers" },
                  { name: "Special Deals", path: "/deals" },
                  { name: "Categories", path: "/categories" },
                  { name: "Gift Cards", path: "/gift-cards" },
                  { name: "Wishlist", path: "/wishlist" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-200 hover:text-blue-400 transition-colors duration-200 flex items-center group text-base font-medium"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Customer Care */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center tracking-tight">
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="mr-3 text-purple-400"
                />
                Customer Care
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Help Center", path: "/help" },
                  { name: "Track Your Order", path: "/track-order" },
                  { name: "Returns & Exchanges", path: "/returns" },
                  { name: "Shipping Info", path: "/shipping" },
                  { name: "Size Guide", path: "/size-guide" },
                  { name: "Contact Support", path: "/contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-200 hover:text-purple-400 transition-colors duration-200 flex items-center group text-base font-medium"
                    >
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Company */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center tracking-tight">
                <FontAwesomeIcon
                  icon={faCrown}
                  className="mr-3 text-yellow-400"
                />
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Our Story", path: "/story" },
                  { name: "Careers", path: "/careers" },
                  { name: "Press & Media", path: "/press" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Terms of Service", path: "/terms" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group text-base font-medium"
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          {/* Social Media Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-10 pt-8 border-t border-white/10"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Us & Stay Connected
              </h4>
              <div className="flex justify-center space-x-4 gap-4 mb-6">
                {[
                  {
                    icon: faFacebookF,
                    color: "hover:bg-blue-600",
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    icon: faTwitter,
                    color: "hover:bg-blue-400",
                    label: "Twitter",
                    href: "https://twitter.com",
                  },
                  {
                    icon: faInstagram,
                    color: "hover:bg-pink-600",
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    icon: faLinkedinIn,
                    color: "hover:bg-blue-700",
                    label: "LinkedIn",
                    href: "https://linkedin.com",
                  },
                  {
                    icon: faYoutube,
                    color: "hover:bg-red-600",
                    label: "YouTube",
                    href: "https://youtube.com",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-current/25`}
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-lg" />
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Join our community of 50,000+ satisfied customers and get
                exclusive updates, deals, and insider access
              </p>
            </motion.div>
          </motion.div>

          {/* Premium Features Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-10 pt-8 border-t border-white/10"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h4 className="text-xl font-semibold text-white mb-2">
                Why Choose EliteShop?
              </h4>
              <p className="text-gray-400 text-sm">
                Premium shopping experience with unmatched service quality
              </p>
            </motion.div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
              {[
                {
                  icon: faShippingFast,
                  title: "Free & Fast Shipping",
                  description: "Free delivery on orders over $50 worldwide",
                  gradient: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-500/10",
                  borderColor: "border-blue-500/20",
                  hoverShadow: "hover:shadow-blue-500/20",
                },
                {
                  icon: faShieldAlt,
                  title: "Secure & Safe",
                  description: "100% secure payments with SSL encryption",
                  gradient: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-500/10",
                  borderColor: "border-green-500/20",
                  hoverShadow: "hover:shadow-green-500/20",
                },
                {
                  icon: faHeadset,
                  title: "24/7 Support",
                  description: "Round-the-clock customer assistance",
                  gradient: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-500/10",
                  borderColor: "border-purple-500/20",
                  hoverShadow: "hover:shadow-purple-500/20",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl ${feature.bgColor} ${feature.borderColor} border backdrop-blur-sm hover:bg-white/5 transition-all duration-500 ${feature.hoverShadow} hover:shadow-2xl`}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${feature.gradient
                        .replace("from-", "")
                        .replace(" to-", ", ")}))`,
                    }}
                  />

                  <div className="relative p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <FontAwesomeIcon
                        icon={feature.icon}
                        className="text-white text-2xl"
                      />
                    </div>
                    <h5 className="font-semibold text-white mb-2 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {feature.title}
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-yellow-400 font-medium">
                    4.9/5 Rating
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-600"></div>
                <span>Trusted by 50,000+ customers worldwide</span>
                <div className="h-4 w-px bg-gray-600"></div>
                <span>ISO 9001:2015 Certified</span>
                <div className="h-4 w-px bg-gray-600"></div>
                <span>SSL Secured Shopping</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 EliteShop. All rights reserved. Made with ❤️ for amazing
              customers.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">
                Trusted by 50,000+ customers worldwide
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-yellow-400 ml-2">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 backdrop-blur-sm border border-white/20"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-lg" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
