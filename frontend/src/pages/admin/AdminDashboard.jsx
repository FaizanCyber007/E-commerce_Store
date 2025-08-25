import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faShoppingCart,
  faUsers,
  faBlog,
  faDollarSign,
  faArrowUp,
  faArrowDown,
  faEye,
  faHeart,
  faShoppingBag,
  faChartLine,
  faCalendarAlt,
  faCrown,
  faGem,
  faRocket,
  faStar,
  faFire,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: { count: 0, change: 0 },
    orders: { count: 0, change: 0, revenue: 0 },
    users: { count: 0, change: 0 },
    blogs: { count: 0, change: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Animation refs
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.1 });
  const cardsInView = useInView(cardsRef, { once: true, threshold: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Simulate API calls - replace with actual API calls
      const [productsRes, ordersRes, usersRes, blogsRes] = await Promise.all(
        [
          fetch("/api/admin/products/stats"),
          fetch("/api/admin/orders/stats"),
          fetch("/api/admin/users/stats"),
          fetch("/api/admin/blogs/stats"),
        ].map((p) => p.catch((e) => ({ ok: false, error: e })))
      );

      // Mock data for demonstration
      setStats({
        products: { count: 245, change: 12 },
        orders: { count: 1234, change: 8.5, revenue: 45670 },
        users: { count: 892, change: 15.2 },
        blogs: { count: 28, change: -2.1 },
      });

      setRecentOrders([
        {
          id: "ORD-001",
          customer: "John Doe",
          amount: 299.99,
          status: "completed",
          date: "2025-08-25",
        },
        {
          id: "ORD-002",
          customer: "Jane Smith",
          amount: 149.5,
          status: "processing",
          date: "2025-08-25",
        },
        {
          id: "ORD-003",
          customer: "Mike Johnson",
          amount: 89.99,
          status: "shipped",
          date: "2025-08-24",
        },
        {
          id: "ORD-004",
          customer: "Sarah Wilson",
          amount: 199.99,
          status: "pending",
          date: "2025-08-24",
        },
      ]);

      setTopProducts([
        { name: "Premium Headphones", sales: 156, revenue: 23400 },
        { name: "Wireless Mouse", sales: 134, revenue: 6700 },
        { name: "Gaming Keyboard", sales: 98, revenue: 14700 },
        { name: "USB-C Hub", sales: 87, revenue: 6960 },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    icon,
    title,
    count,
    change,
    prefix = "",
    suffix = "",
    color = "blue",
  }) => (
    <motion.div
      variants={statsVariants}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <FontAwesomeIcon icon={icon} className="text-lg" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {prefix}
            {typeof count === "number" ? count.toLocaleString() : count}
            {suffix}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            change >= 0
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          <FontAwesomeIcon
            icon={change >= 0 ? faArrowUp : faArrowDown}
            className="text-xs"
          />
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="container-responsive py-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-4xl"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl">
                <FontAwesomeIcon
                  icon={faCrown}
                  className="text-2xl text-white"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-xl text-white/80">
                  Welcome back! Manage your e-commerce empire from here.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-white/80"
                />
                <span className="text-white/90">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <FontAwesomeIcon icon={faRocket} className="text-white/80" />
                <span className="text-white/90">System Status: All Good</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container-responsive -mt-8 relative z-20">
        {/* Stats Grid */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            icon={faBoxes}
            title="Total Products"
            count={stats.products.count}
            change={stats.products.change}
            color="blue"
          />
          <StatCard
            icon={faShoppingCart}
            title="Total Orders"
            count={stats.orders.count}
            change={stats.orders.change}
            color="emerald"
          />
          <StatCard
            icon={faUsers}
            title="Total Users"
            count={stats.users.count}
            change={stats.users.change}
            color="purple"
          />
          <StatCard
            icon={faDollarSign}
            title="Revenue"
            count={stats.orders.revenue}
            change={stats.orders.change}
            prefix="$"
            color="amber"
          />
        </motion.div>

        {/* Content Cards */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12"
        >
          {/* Recent Orders */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg">
                  <FontAwesomeIcon icon={faShoppingBag} />
                </div>
                Recent Orders
              </h3>
              <Link
                to="/admin/orders"
                className="text-primary hover:text-secondary font-medium text-sm transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.id} • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${order.amount}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "completed"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : order.status === "shipped"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg">
                  <FontAwesomeIcon icon={faFire} />
                </div>
                Top Products
              </h3>
              <Link
                to="/admin/products"
                className="text-primary hover:text-secondary font-medium text-sm transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <FontAwesomeIcon icon={faStar} className="text-xs" />
                      <FontAwesomeIcon icon={faStar} className="text-xs" />
                      <FontAwesomeIcon icon={faStar} className="text-xs" />
                      <FontAwesomeIcon icon={faStar} className="text-xs" />
                      <FontAwesomeIcon icon={faStar} className="text-xs" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-lg">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            Quick Actions
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                to: "/admin/products",
                icon: faBoxes,
                title: "Manage Products",
                desc: "Add, edit, and organize your products",
                color: "from-blue-500 to-blue-600",
                bgColor:
                  "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
              },
              {
                to: "/admin/orders",
                icon: faShoppingCart,
                title: "Process Orders",
                desc: "View and manage customer orders",
                color: "from-emerald-500 to-emerald-600",
                bgColor:
                  "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
              },
              {
                to: "/admin/users",
                icon: faUsers,
                title: "User Management",
                desc: "Monitor and manage user accounts",
                color: "from-purple-500 to-purple-600",
                bgColor:
                  "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
              },
              {
                to: "/admin/blogs",
                icon: faBlog,
                title: "Content Creation",
                desc: "Write and publish blog posts",
                color: "from-amber-500 to-amber-600",
                bgColor:
                  "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
              },
            ].map((action, index) => (
              <motion.div
                key={action.to}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={action.to}
                  className={`block p-6 bg-gradient-to-br ${action.bgColor} border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 group`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${action.color} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <FontAwesomeIcon icon={action.icon} className="text-lg" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {action.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
