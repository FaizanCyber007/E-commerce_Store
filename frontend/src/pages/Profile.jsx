import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faEdit,
  faSave,
  faTimes,
  faCamera,
  faShoppingBag,
  faHeart,
  faSignOutAlt,
  faShieldAlt,
  faCreditCard,
  faBell,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { fetchProfile, logoutUser } from "../store/userSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Mock user data for demonstration if no user is loaded
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
    joinDate: "January 2023",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    },
  };

  const displayUser = user || mockUser;

  const [formData, setFormData] = useState({
    name: displayUser.name || "",
    email: displayUser.email || "",
    phone: displayUser.phone || "",
    address: displayUser.address || {},
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
    console.log("Saving user data:", formData);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const tabs = [
    { id: "profile", name: "Profile Information", icon: faUser },
    { id: "orders", name: "Order History", icon: faShoppingBag },
    { id: "wishlist", name: "Wishlist", icon: faHeart },
    { id: "security", name: "Security", icon: faShieldAlt },
    { id: "notifications", name: "Notifications", icon: faBell },
  ];

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
            <div className="relative inline-block mb-6">
              <img
                src={displayUser.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover"
              />
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-white text-sm"
                />
              </button>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-gradient">
              {displayUser.name}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{displayUser.email}</p>
            <p className="text-gray-400">Member since {displayUser.joinDate}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <FontAwesomeIcon icon={tab.icon} className="mr-3" />
                    {tab.name}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-500/10 transition-colors mt-8"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6"
            >
              {/* Profile Information Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary"
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="btn btn-primary"
                        >
                          <FontAwesomeIcon icon={faSave} className="mr-2" />
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="btn btn-outline"
                        >
                          <FontAwesomeIcon icon={faTimes} className="mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="form-label">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="form-input"
                            />
                          ) : (
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="text-gray-400 mr-3"
                              />
                              <span>{displayUser.name}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="form-label">Email</label>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="form-input"
                            />
                          ) : (
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-gray-400 mr-3"
                              />
                              <span>{displayUser.email}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="form-label">Phone</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="form-input"
                            />
                          ) : (
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faPhone}
                                className="text-gray-400 mr-3"
                              />
                              <span>{displayUser.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="form-label">Street Address</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.street"
                              value={formData.address?.street || ""}
                              onChange={handleInputChange}
                              className="form-input"
                            />
                          ) : (
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="text-gray-400 mr-3"
                              />
                              <span>{displayUser.address?.street}</span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">City</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address.city"
                                value={formData.address?.city || ""}
                                onChange={handleInputChange}
                                className="form-input"
                              />
                            ) : (
                              <span>{displayUser.address?.city}</span>
                            )}
                          </div>

                          <div>
                            <label className="form-label">State</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address.state"
                                value={formData.address?.state || ""}
                                onChange={handleInputChange}
                                className="form-input"
                              />
                            ) : (
                              <span>{displayUser.address?.state}</span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">ZIP Code</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address.zipCode"
                                value={formData.address?.zipCode || ""}
                                onChange={handleInputChange}
                                className="form-input"
                              />
                            ) : (
                              <span>{displayUser.address?.zipCode}</span>
                            )}
                          </div>

                          <div>
                            <label className="form-label">Country</label>
                            {isEditing ? (
                              <select
                                name="address.country"
                                value={formData.address?.country || ""}
                                onChange={handleInputChange}
                                className="form-select"
                              >
                                <option value="United States">
                                  United States
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                              </select>
                            ) : (
                              <span>{displayUser.address?.country}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                  <div className="text-center py-12">
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-6xl text-gray-600 mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      No Recent Orders
                    </h3>
                    <p className="text-gray-400 mb-6">
                      You haven't placed any orders yet.
                    </p>
                    <Link to="/orders" className="btn btn-primary mr-4">
                      View All Orders
                    </Link>
                    <Link to="/shop" className="btn btn-outline">
                      Start Shopping
                    </Link>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-6xl text-gray-600 mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Save items you love for later.
                    </p>
                    <Link to="/wishlist" className="btn btn-primary mr-4">
                      View Wishlist
                    </Link>
                    <Link to="/shop" className="btn btn-outline">
                      Browse Products
                    </Link>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    <div className="card p-4 bg-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">Password</h3>
                          <p className="text-sm text-gray-400">
                            Last changed 30 days ago
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setShowPasswordChange(!showPasswordChange)
                          }
                          className="btn btn-outline btn-sm"
                        >
                          <FontAwesomeIcon icon={faLock} className="mr-2" />
                          Change Password
                        </button>
                      </div>

                      {showPasswordChange && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="form-label">
                                Current Password
                              </label>
                              <input type="password" className="form-input" />
                            </div>
                            <div>
                              <label className="form-label">New Password</label>
                              <input type="password" className="form-input" />
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <button className="btn btn-primary btn-sm">
                              Update Password
                            </button>
                            <button
                              onClick={() => setShowPasswordChange(false)}
                              className="btn btn-outline btn-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="card p-4 bg-gray-800">
                      <h3 className="font-semibold mb-4">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="btn btn-primary">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Email Notifications</h3>
                        <p className="text-sm text-gray-400">
                          Receive order updates via email
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-semibold">SMS Notifications</h3>
                        <p className="text-sm text-gray-400">
                          Get shipping updates via text
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">
                          Receive promotional offers and deals
                        </p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
