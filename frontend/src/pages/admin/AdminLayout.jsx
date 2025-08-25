import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBoxes,
  faShoppingCart,
  faUsers,
  faBlog,
  faBars,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faCrown,
  faGem,
  faRocket,
  faCog,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const navigationItems = [
    {
      path: "/admin",
      icon: faTachometerAlt,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/admin/products",
      icon: faBoxes,
      label: "Products",
    },
    {
      path: "/admin/orders",
      icon: faShoppingCart,
      label: "Orders",
    },
    {
      path: "/admin/users",
      icon: faUsers,
      label: "Users",
    },
    {
      path: "/admin/blogs",
      icon: faBlog,
      label: "Blogs",
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "80px" },
  };

  const contentVariants = {
    expanded: { marginLeft: "280px" },
    collapsed: { marginLeft: "80px" },
  };

  const mobileOverlayVariants = {
    open: { opacity: 1, visibility: "visible" },
    closed: { opacity: 0, visibility: "hidden" },
  };

  const mobileSidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon
                icon={faBars}
                className="text-gray-600 dark:text-gray-400"
              />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCrown}
                  className="text-white text-sm"
                />
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Admin
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            variants={mobileOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        className="hidden lg:block fixed left-0 top-0 bottom-0 z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faCrown} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                      Admin Panel
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      E-commerce Management
                    </p>
                  </div>
                </motion.div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon
                  icon={sidebarCollapsed ? faChevronRight : faChevronLeft}
                  className="text-gray-500 dark:text-gray-400"
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: linkIsActive }) =>
                    `group flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                      (item.exact ? isActive(item.path, true) : linkIsActive)
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  <div
                    className={`flex-shrink-0 ${
                      sidebarCollapsed ? "w-5" : "w-5"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4"
              >
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {userInfo?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userInfo?.email || "admin@example.com"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-1">
              <button className="group flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                <FontAwesomeIcon icon={faCog} />
                {!sidebarCollapsed && <span>Settings</span>}
              </button>
              <button
                onClick={handleLogout}
                className="group flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                {!sidebarCollapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.aside
            variants={mobileSidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Sidebar Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faCrown} className="text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                        Admin Panel
                      </h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        E-commerce Management
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive: linkIsActive }) =>
                        `group flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          (
                            item.exact
                              ? isActive(item.path, true)
                              : linkIsActive
                          )
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        }`
                      }
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </nav>

              {/* Mobile User Profile */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {userInfo?.name || "Admin User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {userInfo?.email || "admin@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <button className="group flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="group flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        variants={contentVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        className="lg:transition-all lg:duration-300 pt-16 lg:pt-0"
      >
        <div className="min-h-screen">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;
