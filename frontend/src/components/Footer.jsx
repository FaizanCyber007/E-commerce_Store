import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCreditCard,
  faShippingFast,
  faShieldAlt,
  faHeadset,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 glass-effect border-t border-gray-800/50">
      {/* Main Footer Content */}
      <div className="container-responsive py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-dark-900 text-xl"
                />
              </div>
              <span className="text-2xl font-bold font-poppins text-gradient">
                EliteShop
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your premier destination for premium products with exceptional
              quality, competitive prices, and outstanding customer service.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: faFacebookF, href: "#", label: "Facebook" },
                { icon: faTwitter, href: "#", label: "Twitter" },
                { icon: faInstagram, href: "#", label: "Instagram" },
                { icon: faLinkedinIn, href: "#", label: "LinkedIn" },
                { icon: faYoutube, href: "#", label: "YouTube" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-dark-900 transition-all duration-300 transform hover:scale-110"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200 font-poppins">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/faq", label: "FAQ" },
                { to: "/shipping", label: "Shipping Info" },
                { to: "/returns", label: "Returns & Exchanges" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 inline-flex items-center space-x-2"
                  >
                    <span>→</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200 font-poppins">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/shop?category=electronics", label: "Electronics" },
                { to: "/shop?category=clothing", label: "Fashion & Clothing" },
                { to: "/shop?category=home", label: "Home & Garden" },
                { to: "/shop?category=books", label: "Books & Media" },
                { to: "/shop?category=sports", label: "Sports & Outdoors" },
                { to: "/shop?category=beauty", label: "Beauty & Health" },
                { to: "/shop?category=toys", label: "Toys & Games" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 inline-flex items-center space-x-2"
                  >
                    <span>→</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200 font-poppins">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-primary-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-400">123 Business Street</p>
                  <p className="text-gray-400">City, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-primary-400 flex-shrink-0"
                />
                <a
                  href="mailto:support@eliteshop.com"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  support@eliteshop.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-primary-400 flex-shrink-0"
                />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-200 mb-2">
                  Business Hours
                </h4>
                <p className="text-sm text-gray-400">
                  Mon - Fri: 9:00 AM - 8:00 PM
                </p>
                <p className="text-sm text-gray-400">
                  Sat - Sun: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-t border-gray-800/50">
          {[
            {
              icon: faShippingFast,
              title: "Free Shipping",
              description: "Free shipping on orders over $100",
            },
            {
              icon: faCreditCard,
              title: "Secure Payment",
              description: "100% secure payment processing",
            },
            {
              icon: faShieldAlt,
              title: "Money Back Guarantee",
              description: "30-day return policy",
            },
            {
              icon: faHeadset,
              title: "24/7 Support",
              description: "Dedicated customer support",
            },
          ].map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex items-start space-x-4 p-6 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon
                  icon={icon}
                  className="text-primary-400 text-xl"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-1">{title}</h4>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800/50 bg-gray-900/50">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} EliteShop. All rights
                reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link
                  to="/terms"
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <span>•</span>
                <Link
                  to="/cookies"
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 bg-primary-500 hover:bg-primary-600 text-dark-900 rounded-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
              aria-label="Scroll to top"
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
