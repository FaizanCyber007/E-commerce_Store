import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faFilter,
  faTruck,
  faCheck,
  faClock,
  faEye,
  faBox,
  faCreditCard,
  faCalendarAlt,
  faUser,
  faDollarSign,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  useAdminOrdersQuery,
  useMarkDeliveredMutation,
} from "../../store/apiSlice.js";

const AdminOrders = () => {
  const { data: orders, refetch } = useAdminOrdersQuery();
  const [markDelivered] = useMarkDeliveredMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Mock data if no orders available
  const mockOrders = [
    {
      _id: "ORD001234567890",
      totalPrice: 299.99,
      user: { name: "John Doe", email: "john@example.com" },
      isDelivered: false,
      isPaid: true,
      createdAt: "2025-08-25T10:30:00Z",
      items: [{ name: "Wireless Headphones", quantity: 1 }],
    },
    {
      _id: "ORD001234567891",
      totalPrice: 149.5,
      user: { name: "Jane Smith", email: "jane@example.com" },
      isDelivered: true,
      isPaid: true,
      createdAt: "2025-08-24T14:20:00Z",
      items: [{ name: "USB-C Cable", quantity: 2 }],
    },
    {
      _id: "ORD001234567892",
      totalPrice: 89.99,
      user: { name: "Mike Johnson", email: "mike@example.com" },
      isDelivered: false,
      isPaid: false,
      createdAt: "2025-08-23T09:15:00Z",
      items: [{ name: "Phone Case", quantity: 1 }],
    },
  ];

  const allOrders = orders || mockOrders;

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "delivered" && order.isDelivered) ||
      (filterStatus === "pending" && !order.isDelivered) ||
      (filterStatus === "paid" && order.isPaid) ||
      (filterStatus === "unpaid" && !order.isPaid);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allOrders.length,
    delivered: allOrders.filter((o) => o.isDelivered).length,
    pending: allOrders.filter((o) => !o.isDelivered).length,
    revenue: allOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      await markDelivered(orderId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (order) => {
    if (order.isDelivered)
      return "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400";
    if (order.isPaid)
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
    return "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";
  };

  const getStatusIcon = (order) => {
    if (order.isDelivered) return faCheck;
    if (order.isPaid) return faTruck;
    return faClock;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
                Order Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Track and manage all customer orders
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Orders",
                value: stats.total,
                icon: faBox,
                gradient: "from-blue-500 to-blue-600",
                change: "+12%",
              },
              {
                title: "Delivered",
                value: stats.delivered,
                icon: faCheck,
                gradient: "from-emerald-500 to-emerald-600",
                change: "+8%",
              },
              {
                title: "Pending",
                value: stats.pending,
                icon: faClock,
                gradient: "from-amber-500 to-amber-600",
                change: "-5%",
              },
              {
                title: "Revenue",
                value: `$${stats.revenue.toFixed(2)}`,
                icon: faDollarSign,
                gradient: "from-purple-500 to-purple-600",
                change: "+15%",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">
                      <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div
                    className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    <FontAwesomeIcon icon={stat.icon} className="text-lg" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Search orders by ID, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Orders ({filteredOrders.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${getStatusColor(
                            order
                          )}`}
                        >
                          <FontAwesomeIcon icon={getStatusIcon(order)} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              #{order._id.slice(-8)}
                            </h4>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                order
                              )}`}
                            >
                              {order.isDelivered
                                ? "Delivered"
                                : order.isPaid
                                ? "Processing"
                                : "Pending Payment"}
                            </span>
                          </div>

                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faUser} />
                                {order.user?.name || "Unknown Customer"}
                              </span>
                              <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                {formatDate(order.createdAt)}
                              </span>
                            </div>
                            {order.items && (
                              <p className="text-xs">
                                {order.items.length} item(s) -{" "}
                                {order.items
                                  .map((item) => item.name)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            ${order.totalPrice?.toFixed(2) || "0.00"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {order.isPaid ? "Paid" : "Unpaid"}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </motion.button>

                          {!order.isDelivered && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMarkDelivered(order._id)}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
                            >
                              <FontAwesomeIcon icon={faTruck} />
                              Mark Delivered
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-2xl text-gray-400"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No orders found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    No orders match your current search and filter criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
