import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faSearch,
  faBars,
  faTimes,
  faShoppingBag,
  faUserCog,
  faSignOutAlt,
  faBox,
  faTags,
  faPercent,
  faHome,
  faStore,
  faNewspaper,
  faInfoCircle,
  faEnvelope,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get cart count and user from Redux
  const cartCount = useSelector(
    (s) => s.cart?.items?.reduce((sum, i) => sum + i.qty, 0) || 0
  );
  const user = useSelector((s) => s.user?.userInfo);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const navLinks = [
    { to: "/", icon: faHome, label: "Home" },
    { to: "/shop", icon: faShoppingBag, label: "Shop" },
    { to: "/categories", icon: faTags, label: "Categories" },
    { to: "/deals", icon: faPercent, label: "Deals" },
    { to: "/blog", icon: faNewspaper, label: "Blog" },
    { to: "/about", icon: faInfoCircle, label: "About" },
    { to: "/contact", icon: faEnvelope, label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 shadow-xl"
            : "bg-gray-900/90 backdrop-blur-md border-b border-gray-700/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-5 h-16">
            {/* Logo */}
            <Link to="/" className="flex lg:-ml-20 items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faStore}
                  className="text-white text-lg"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden sm:block">
                EliteStore
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-2" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-shrink-0 w-80">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-20 py-2.5 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-800 transition-all duration-200"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="xl:hidden p-2.5 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={isMenuOpen ? faTimes : faBars}
                  className="text-gray-300 hover:text-white text-xl"
                />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-xl text-gray-300 group-hover:text-white transition-colors duration-200"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              {user && (
                <Link
                  to="/wishlist"
                  className="p-2.5 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-xl text-gray-300 group-hover:text-red-400 transition-colors duration-200"
                  />
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all duration-200 shadow-md">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white text-sm"
                      />
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-200 max-w-20 truncate">
                      {user.name?.split(" ")[0] || "User"}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50 py-2 z-50">
                      <div className="p-4 border-b border-gray-700/50">
                        <p className="font-medium text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FontAwesomeIcon
                            icon={faUserCog}
                            className="w-4 h-4 mr-3"
                          />
                          Profile Settings
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FontAwesomeIcon
                            icon={faBox}
                            className="w-4 h-4 mr-3"
                          />
                          My Orders
                        </Link>
                        {user.isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-3 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FontAwesomeIcon
                              icon={faUserCog}
                              className="w-4 h-4 mr-3"
                            />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="w-4 h-4 mr-3"
                          />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      className="w-4 h-4 mr-2"
                    />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="w-4 h-4 mr-2"
                    />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        >
          <div className="fixed top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-20 py-3 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-5 h-5 mr-3"
                    />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
