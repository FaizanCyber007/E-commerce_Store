import React, { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((s) =>
    s.cart.items.reduce((sum, i) => sum + i.qty, 0)
  );
  const user = useSelector((s) => s.user.userInfo);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    // Dispatch logout action
    dispatch({ type: "user/logout" });
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const navClasses = ({ isActive }) =>
    `nav-link transition-all duration-200 ${
      isActive
        ? "text-primary-400 after:w-full"
        : "text-gray-300 hover:text-primary-400"
    }`;

  const mobileNavClasses = ({ isActive }) =>
    `block px-4 py-3 text-lg font-medium transition-colors duration-200 ${
      isActive
        ? "text-primary-400 bg-primary-400/10"
        : "text-gray-300 hover:text-primary-400 hover:bg-gray-800"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-gray-800/50 shadow-soft">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 text-2xl lg:text-3xl font-bold font-poppins group"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-dark-900 text-lg lg:text-xl"
                />
              </div>
              <span className="text-gradient">EliteShop</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <NavLink className={navClasses} to="/">
                Home
              </NavLink>
              <NavLink className={navClasses} to="/shop">
                Shop
              </NavLink>
              <NavLink className={navClasses} to="/about">
                About
              </NavLink>
              <NavLink className={navClasses} to="/contact">
                Contact
              </NavLink>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="input-search w-full pl-12 pr-4"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-ghost px-3 py-1 text-sm"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 group"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-lg text-gray-300 group-hover:text-primary-400"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-400 text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              {user && (
                <Link
                  to="/wishlist"
                  className="p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 group"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-lg text-gray-300 group-hover:text-red-400"
                  />
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-800 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-dark-900 text-sm"
                      />
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-200 group-hover:text-primary-400">
                      {user.name?.split(" ")[0]}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="dropdown right-0 w-48">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="dropdown-item flex items-center space-x-3"
                        >
                          <FontAwesomeIcon icon={faUser} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="dropdown-item flex items-center space-x-3"
                        >
                          <FontAwesomeIcon icon={faBox} />
                          <span>Orders</span>
                        </Link>
                        {user.isAdmin && (
                          <Link
                            to="/admin/products"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="dropdown-item flex items-center space-x-3"
                          >
                            <FontAwesomeIcon icon={faUserCog} />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <hr className="my-2 border-gray-700" />
                        <button
                          onClick={handleLogout}
                          className="dropdown-item flex items-center space-x-3 w-full text-left text-red-400 hover:bg-red-500/10"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary text-sm hidden sm:block"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={isMenuOpen ? faTimes : faBars}
                  className="text-lg text-gray-300"
                />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input-search w-full pl-12 pr-16"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-ghost px-3 py-1 text-sm"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden glass-effect border-t border-gray-800/50">
            <div className="container-responsive py-4">
              <nav className="space-y-2">
                <NavLink
                  className={mobileNavClasses}
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  className={mobileNavClasses}
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </NavLink>
                <NavLink
                  className={mobileNavClasses}
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  className={mobileNavClasses}
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>

                <hr className="my-4 border-gray-700" />

                {!user && (
                  <>
                    <NavLink
                      className={mobileNavClasses}
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      className={mobileNavClasses}
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for dropdowns */}
      {(isUserMenuOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
