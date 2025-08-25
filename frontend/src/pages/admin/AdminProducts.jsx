import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faSpinner,
  faExclamationTriangle,
  faCheck,
  faTimes,
  faBoxes,
  faTag,
  faStar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    category: "",
    brand: "",
    sku: "",
    stock: "",
    images: [{ url: "", alt: "" }],
    status: "active",
    featured: false,
  });

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Toys",
    "Automotive",
    "Health",
    "Food",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    // Sample data
    setProducts([
      {
        _id: "1",
        name: "Wireless Bluetooth Headphones",
        description:
          "Premium quality wireless headphones with noise cancellation",
        price: 129.99,
        comparePrice: 179.99,
        category: "Electronics",
        brand: "TechBrand",
        sku: "WBH-001",
        stock: 45,
        images: [
          {
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
            alt: "Wireless Headphones",
          },
        ],
        rating: 4.5,
        reviews: 128,
        sales: 89,
        status: "active",
        featured: true,
      },
      {
        _id: "2",
        name: "Smart Fitness Watch",
        description:
          "Advanced fitness tracking with heart rate monitor and GPS",
        price: 249.99,
        comparePrice: 299.99,
        category: "Electronics",
        brand: "FitTech",
        sku: "SFW-002",
        stock: 23,
        images: [
          {
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
            alt: "Fitness Watch",
          },
        ],
        rating: 4.7,
        reviews: 95,
        sales: 156,
        status: "active",
        featured: true,
      },
      {
        _id: "3",
        name: "Organic Cotton T-Shirt",
        description: "Comfortable organic cotton t-shirt in various colors",
        price: 29.99,
        comparePrice: 39.99,
        category: "Clothing",
        brand: "EcoFashion",
        sku: "OCT-003",
        stock: 156,
        images: [
          {
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400",
            alt: "Organic T-Shirt",
          },
        ],
        rating: 4.3,
        reviews: 67,
        sales: 234,
        status: "active",
        featured: false,
      },
    ]);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    toast.success("Product created successfully!");
    setShowCreateModal(false);
    resetForm();
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    toast.success("Product updated successfully!");
    setShowEditModal(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    toast.success("Product deleted successfully!");
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      comparePrice: product.comparePrice?.toString() || "",
      category: product.category,
      brand: product.brand,
      sku: product.sku,
      stock: product.stock.toString(),
      images: product.images || [{ url: "", alt: "" }],
      status: product.status,
      featured: product.featured || false,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      comparePrice: "",
      category: "",
      brand: "",
      sku: "",
      stock: "",
      images: [{ url: "", alt: "" }],
      status: "active",
      featured: false,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const ProductFormModal = ({ show, onClose, onSubmit, title }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compare Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.comparePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, comparePrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brand name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Product SKU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image URL
              </label>
              <input
                type="url"
                value={formData.images[0]?.url || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: [
                      {
                        url: e.target.value,
                        alt: formData.images[0]?.alt || "",
                      },
                    ],
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm text-gray-700"
              >
                Mark as Featured Product
              </label>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {editingProduct ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl">
                  <FontAwesomeIcon icon={faBoxes} />
                </div>
                Product Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your inventory and track sales performance
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Product
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Products",
                value: products.length,
                icon: faBoxes,
                gradient: "from-blue-500 to-blue-600",
              },
              {
                title: "Active Products",
                value: products.filter((p) => p.status === "active").length,
                icon: faCheck,
                gradient: "from-emerald-500 to-emerald-600",
              },
              {
                title: "Low Stock",
                value: products.filter((p) => p.stock < 10 && p.stock > 0)
                  .length,
                icon: faExclamationTriangle,
                gradient: "from-amber-500 to-amber-600",
              },
              {
                title: "Out of Stock",
                value: products.filter((p) => p.stock === 0).length,
                icon: faTimes,
                gradient: "from-red-500 to-red-600",
              },
            ].map((stat) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  </div>
                  <div
                    className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    <FontAwesomeIcon
                      icon={stat.icon}
                      className="text-white text-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={
                                product.images[0]?.url ||
                                "https://via.placeholder.com/48"
                              }
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              <FontAwesomeIcon icon={faTag} className="mr-1" />
                              {product.category}
                            </div>
                            {product.featured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="mr-1"
                                />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(product.price)}
                        </div>
                        {product.comparePrice && (
                          <div className="text-xs text-gray-500 line-through">
                            {formatPrice(product.comparePrice)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.stock} units
                        </div>
                        <div
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.stock === 0
                              ? "bg-red-100 text-red-800"
                              : product.stock < 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.stock === 0
                            ? "Out of Stock"
                            : product.stock < 10
                            ? "Low Stock"
                            : "In Stock"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="mr-1 text-yellow-400"
                            />
                            {product.rating} ({product.reviews})
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              className="mr-1"
                            />
                            {product.sales} sold
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                            title="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modals */}
          <ProductFormModal
            show={showCreateModal}
            onClose={() => {
              setShowCreateModal(false);
              resetForm();
            }}
            onSubmit={handleCreateProduct}
            title="Add New Product"
          />

          <ProductFormModal
            show={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setEditingProduct(null);
              resetForm();
            }}
            onSubmit={handleUpdateProduct}
            title="Edit Product"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
