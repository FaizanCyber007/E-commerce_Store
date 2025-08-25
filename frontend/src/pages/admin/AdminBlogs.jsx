import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faSearch,
  faFilter,
  faSortAmountDown,
  faSpinner,
  faExclamationTriangle,
  faCheck,
  faTimes,
  faCalendar,
  faUser,
  faTag,
  faComment,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { blogAPI } from "../../utils/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("-publishedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Technology",
    tags: [],
    featuredImage: { url: "", alt: "" },
    status: "draft",
    featured: false,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  });

  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, filterStatus, sortBy, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        sort: sortBy,
        ...(filterStatus !== "all" && { status: filterStatus }),
        ...(searchTerm && { search: searchTerm }),
      };

      const response = await blogAPI.getBlogs(params);
      setBlogs(response.data.blogs || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await blogAPI.createBlog({
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim()),
        seo: {
          ...formData.seo,
          keywords: formData.seo.keywords.filter((keyword) => keyword.trim()),
        },
      });
      toast.success("Blog created successfully!");
      setShowCreateModal(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;

    try {
      await blogAPI.updateBlog(editingBlog._id, {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim()),
        seo: {
          ...formData.seo,
          keywords: formData.seo.keywords.filter((keyword) => keyword.trim()),
        },
      });
      toast.success("Blog updated successfully!");
      setShowEditModal(false);
      setEditingBlog(null);
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await blogAPI.deleteBlog(id);
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags || [],
      featuredImage: blog.featuredImage || { url: "", alt: "" },
      status: blog.status,
      featured: blog.featured || false,
      seo: blog.seo || {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      },
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Technology",
      tags: [],
      featuredImage: { url: "", alt: "" },
      status: "draft",
      featured: false,
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      },
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const BlogFormModal = ({ show, onClose, onSubmit, title }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter blog title"
                />
              </div>

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
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Business">Business</option>
                  <option value="Product Reviews">Product Reviews</option>
                  <option value="Shopping Tips">Shopping Tips</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Trends">Trends</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Brief description of the blog post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="10"
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.featuredImage.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredImage: {
                        ...formData.featuredImage,
                        url: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Text *
                </label>
                <input
                  type="text"
                  required
                  value={formData.featuredImage.alt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredImage: {
                        ...formData.featuredImage,
                        alt: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description of the image"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="technology, ai, ecommerce"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
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
                  Mark as Featured
                </label>
              </div>
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
                {editingBlog ? "Update Blog" : "Create Blog"}
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl">
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                Blog Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create, manage, and publish engaging blog content
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <FontAwesomeIcon icon={faPlus} />
              Create New Blog
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Posts",
                value: blogs.length,
                icon: faEdit,
                gradient: "from-blue-500 to-blue-600",
                change: "+5%",
              },
              {
                title: "Published",
                value: blogs.filter((b) => b.status === "published").length,
                icon: faCheck,
                gradient: "from-emerald-500 to-emerald-600",
                change: "+12%",
              },
              {
                title: "Draft Posts",
                value: blogs.filter((b) => b.status === "draft").length,
                icon: faEdit,
                gradient: "from-amber-500 to-amber-600",
                change: "+8%",
              },
              {
                title: "Featured",
                value: blogs.filter((b) => b.featured).length,
                icon: faHeart,
                gradient: "from-purple-500 to-purple-600",
                change: "+3%",
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

          {/* Filters and Search */}
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
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 dark:text-white transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 dark:text-white transition-all duration-200"
              >
                <option value="-publishedAt">Latest First</option>
                <option value="publishedAt">Oldest First</option>
                <option value="-views">Most Viewed</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>

          {/* Blog List */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-4xl text-blue-500 animate-spin"
                />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-16">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-6xl text-gray-400 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No blogs found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first blog post to get started"}
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Create Your First Blog
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blog
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stats
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogs.map((blog) => (
                        <tr key={blog._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16">
                                <img
                                  className="h-16 w-16 rounded-lg object-cover"
                                  src={
                                    blog.featuredImage?.url ||
                                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=100"
                                  }
                                  alt={blog.featuredImage?.alt || blog.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                  {blog.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  <FontAwesomeIcon
                                    icon={faTag}
                                    className="mr-1"
                                  />
                                  {blog.category}
                                </div>
                                {blog.featured && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                blog.status
                              )}`}
                            >
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-1"
                                />
                                {blog.views || 0}
                              </div>
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faComment}
                                  className="mr-1"
                                />
                                {blog.commentCount || 0}
                              </div>
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="mr-1"
                                />
                                {blog.likeCount || 0}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faCalendar}
                                className="mr-1"
                              />
                              {blog.publishedAt
                                ? formatDate(blog.publishedAt)
                                : "Not published"}
                            </div>
                            <div className="flex items-center mt-1">
                              <FontAwesomeIcon icon={faUser} className="mr-1" />
                              {blog.author?.name || "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleEditClick(blog)}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                                title="Edit"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing page{" "}
                            <span className="font-medium">{currentPage}</span>{" "}
                            of <span className="font-medium">{totalPages}</span>
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                              onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                              }
                              disabled={currentPage === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Previous
                            </button>
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === page
                                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(totalPages, currentPage + 1)
                                )
                              }
                              disabled={currentPage === totalPages}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Next
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Modals */}
        <BlogFormModal
          show={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            resetForm();
          }}
          onSubmit={handleCreateBlog}
          title="Create New Blog Post"
        />

        <BlogFormModal
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingBlog(null);
            resetForm();
          }}
          onSubmit={handleUpdateBlog}
          title="Edit Blog Post"
        />
      </div>
    </div>
  );
};

export default AdminBlogs;
