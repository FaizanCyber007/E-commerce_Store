import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faShoppingBag,
  faTruck,
  faCheckCircle,
  faEye,
  faDownload,
  faCalendar,
  faCreditCard,
  faMapMarkerAlt,
  faFilter,
  faSearch,
  faReceipt,
  faShippingFast,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useMyOrdersQuery } from "../store/apiSlice.js";

const Orders = () => {
  const { data: orders, isLoading } = useMyOrdersQuery();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock orders data for demonstration
  const mockOrders = [
    {
      _id: "64c23350e32f4a5b7c1f2a45",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      isPaid: true,
      isDelivered: true,
      totalPrice: 1598.0,
      shippingAddress: {
        address: "123 Main St",
        city: "New York",
        postalCode: "10001",
        country: "USA",
      },
      orderItems: [
        {
          _id: "1",
          name: "iPhone 15 Pro Max",
          image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=200",
          price: 1199,
          qty: 1,
        },
        {
          _id: "2",
          name: "Sony WH-1000XM5",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200",
          price: 399,
          qty: 1,
        },
      ],
    },
    {
      _id: "64c23350e32f4a5b7c1f2a46",
      orderNumber: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      isPaid: true,
      isDelivered: false,
      totalPrice: 799.0,
      shippingAddress: {
        address: "456 Oak Ave",
        city: "Los Angeles",
        postalCode: "90210",
        country: "USA",
      },
      orderItems: [
        {
          _id: "3",
          name: "Apple Watch Ultra 2",
          image:
            "https://images.unsplash.com/photo-1510017098667-27dfc7150e5d?q=80&w=200",
          price: 799,
          qty: 1,
        },
      ],
    },
    {
      _id: "64c23350e32f4a5b7c1f2a47",
      orderNumber: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      isPaid: true,
      isDelivered: false,
      totalPrice: 1099.0,
      shippingAddress: {
        address: "789 Pine St",
        city: "Chicago",
        postalCode: "60601",
        country: "USA",
      },
      orderItems: [
        {
          _id: "4",
          name: "iPad Pro 12.9-inch",
          image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200",
          price: 1099,
          qty: 1,
        },
      ],
    },
  ];

  const displayOrders = orders && orders.length > 0 ? orders : mockOrders;

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return faCheckCircle;
      case "shipped":
        return faTruck;
      case "processing":
        return faBox;
      case "cancelled":
        return faTimesCircle;
      default:
        return faShoppingBag;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-400";
      case "shipped":
        return "text-blue-400";
      case "processing":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const filteredOrders = displayOrders.filter((order) => {
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="pt-16">
        <div className="container py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section bg-gradient-to-br from-blue-900/30 to-purple-900/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
              My Orders
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Track and manage all your purchases
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {["all", "processing", "shipped", "delivered", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="text-6xl text-gray-600 mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
            <p className="text-gray-400 mb-8">
              {searchTerm || filterStatus !== "all"
                ? "No orders match your search criteria."
                : "You haven't placed any orders yet."}
            </p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover-lift"
              >
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold">
                        {order.orderNumber}
                      </h3>
                      <div
                        className={`flex items-center space-x-2 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <FontAwesomeIcon icon={getStatusIcon(order.status)} />
                        <span className="capitalize text-sm font-medium">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                        {order.isPaid ? "Paid" : "Payment Pending"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="btn btn-outline btn-sm">
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      View Details
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Invoice
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    Items ({order.orderItems.length})
                  </h4>
                  <div className="space-y-3">
                    {order.orderItems.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-400">
                            Quantity: {item.qty}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-4 border-t border-gray-700">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      Shipping Address
                    </div>
                    <p className="text-sm">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-green-400">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
