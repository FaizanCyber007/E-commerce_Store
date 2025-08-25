import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faSearch,
  faFilter,
  faCrown,
  faUser,
  faEnvelope,
  faCalendarAlt,
  faShieldAlt,
  faEye,
  faEdit,
  faTrash,
  faUserTie,
  faUserFriends,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAdminUsersQuery } from "../../store/apiSlice.js";

const AdminUsers = () => {
  const { data: users } = useAdminUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Mock data if no users available
  const mockUsers = [
    {
      _id: "USER001234567890",
      name: "John Doe",
      email: "john@example.com",
      isAdmin: false,
      createdAt: "2025-08-20T10:30:00Z",
      lastLogin: "2025-08-25T09:15:00Z",
      ordersCount: 12,
    },
    {
      _id: "USER001234567891",
      name: "Jane Smith",
      email: "jane@example.com",
      isAdmin: false,
      createdAt: "2025-08-15T14:20:00Z",
      lastLogin: "2025-08-24T16:45:00Z",
      ordersCount: 8,
    },
    {
      _id: "USER001234567892",
      name: "Admin User",
      email: "admin@example.com",
      isAdmin: true,
      createdAt: "2025-01-01T00:00:00Z",
      lastLogin: "2025-08-25T10:30:00Z",
      ordersCount: 0,
    },
  ];

  const allUsers = users || mockUsers;

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      filterRole === "all" ||
      (filterRole === "admin" && user.isAdmin) ||
      (filterRole === "customer" && !user.isAdmin);

    return matchesSearch && matchesRole;
  });

  const stats = {
    total: allUsers.length,
    admins: allUsers.filter((u) => u.isAdmin).length,
    customers: allUsers.filter((u) => !u.isAdmin).length,
    active: allUsers.filter((u) => u.lastLogin).length,
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getAvatarColor = (name) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-emerald-500 to-emerald-600",
      "from-purple-500 to-purple-600",
      "from-amber-500 to-amber-600",
      "from-red-500 to-red-600",
      "from-indigo-500 to-indigo-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Monitor and manage user accounts and permissions
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Users",
                value: stats.total,
                icon: faUsers,
                gradient: "from-blue-500 to-blue-600",
                change: "+12%",
              },
              {
                title: "Administrators",
                value: stats.admins,
                icon: faShieldAlt,
                gradient: "from-red-500 to-red-600",
                change: "+0%",
              },
              {
                title: "Customers",
                value: stats.customers,
                icon: faUserFriends,
                gradient: "from-emerald-500 to-emerald-600",
                change: "+8%",
              },
              {
                title: "Active Users",
                value: stats.active,
                icon: faUserTie,
                gradient: "from-purple-500 to-purple-600",
                change: "+5%",
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
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-white transition-all duration-200"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Administrators</option>
                  <option value="customer">Customers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Users ({filteredUsers.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarColor(
                            user.name
                          )} text-white font-bold`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </h4>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                user.isAdmin
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              }`}
                            >
                              {user.isAdmin ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faCrown}
                                    className="mr-1"
                                  />
                                  Administrator
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-1"
                                  />
                                  Customer
                                </>
                              )}
                            </span>
                          </div>

                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faEnvelope} />
                                {user.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                Joined {formatDate(user.createdAt)}
                              </span>
                            </div>
                            {user.ordersCount > 0 && (
                              <p className="text-xs">
                                {user.ordersCount} orders placed
                              </p>
                            )}
                            {user.lastLogin && (
                              <p className="text-xs">
                                Last login: {formatDate(user.lastLogin)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-2xl text-gray-400"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No users found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    No users match your current search and filter criteria.
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

export default AdminUsers;
