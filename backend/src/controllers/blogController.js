import asyncHandler from "express-async-handler";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Get all blogs with filtering, sorting, and pagination
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    tags,
    author,
    featured,
    status = "published",
    sort = "-publishedAt",
    search,
  } = req.query;

  const query = { status };

  // Add filters
  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  if (author) {
    query.author = author;
  }

  if (featured) {
    query.featured = featured === "true";
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(query)
    .populate("author", "name avatar")
    .populate("relatedProducts", "name slug images price")
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const total = await Blog.countDocuments(query);

  res.json({
    blogs,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
    totalBlogs: total,
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  });
});

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    status: "published",
  })
    .populate("author", "name avatar bio")
    .populate("relatedProducts", "name slug images price discountPrice")
    .populate("comments.user", "name avatar")
    .populate("comments.replies.user", "name avatar");

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Increment views
  blog.views += 1;
  await blog.save();

  res.json(blog);
});

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    content,
    category,
    tags,
    featuredImage,
    images,
    status,
    featured,
    relatedProducts,
    seo,
  } = req.body;

  // Create slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100);

  // Check if slug already exists
  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    res.status(400);
    throw new Error("A blog with similar title already exists");
  }

  const blog = new Blog({
    title,
    slug,
    excerpt,
    content,
    author: req.user._id,
    category,
    tags,
    featuredImage,
    images,
    status: status || "draft",
    featured: featured || false,
    relatedProducts,
    seo,
  });

  // Calculate read time
  blog.calculateReadTime();

  const createdBlog = await blog.save();
  const populatedBlog = await Blog.findById(createdBlog._id).populate(
    "author",
    "name avatar"
  );

  res.status(201).json(populatedBlog);
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Check if user is the author or admin
  if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized to update this blog");
  }

  const {
    title,
    excerpt,
    content,
    category,
    tags,
    featuredImage,
    images,
    status,
    featured,
    relatedProducts,
    seo,
  } = req.body;

  // Update fields
  blog.title = title || blog.title;
  blog.excerpt = excerpt || blog.excerpt;
  blog.content = content || blog.content;
  blog.category = category || blog.category;
  blog.tags = tags || blog.tags;
  blog.featuredImage = featuredImage || blog.featuredImage;
  blog.images = images || blog.images;
  blog.status = status || blog.status;
  blog.featured = featured !== undefined ? featured : blog.featured;
  blog.relatedProducts = relatedProducts || blog.relatedProducts;
  blog.seo = seo || blog.seo;

  // Update slug if title changed
  if (title && title !== blog.title) {
    const newSlug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100);

    const existingBlog = await Blog.findOne({
      slug: newSlug,
      _id: { $ne: blog._id },
    });
    if (existingBlog) {
      res.status(400);
      throw new Error("A blog with similar title already exists");
    }
    blog.slug = newSlug;
  }

  // Recalculate read time if content changed
  if (content) {
    blog.calculateReadTime();
  }

  const updatedBlog = await blog.save();
  const populatedBlog = await Blog.findById(updatedBlog._id).populate(
    "author",
    "name avatar"
  );

  res.json(populatedBlog);
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Check if user is the author or admin
  if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized to delete this blog");
  }

  await blog.deleteOne();
  res.json({ message: "Blog removed successfully" });
});

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.status !== "published") {
    res.status(404);
    throw new Error("Blog not found");
  }

  const comment = {
    user: req.user._id,
    content,
  };

  blog.comments.push(comment);
  await blog.save();

  const updatedBlog = await Blog.findById(blog._id)
    .populate("comments.user", "name avatar")
    .populate("comments.replies.user", "name avatar");

  const addedComment = updatedBlog.comments[updatedBlog.comments.length - 1];

  res.status(201).json(addedComment);
});

// @desc    Add reply to comment
// @route   POST /api/blogs/:id/comments/:commentId/replies
// @access  Private
const addReply = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.status !== "published") {
    res.status(404);
    throw new Error("Blog not found");
  }

  const comment = blog.comments.id(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  const reply = {
    user: req.user._id,
    content,
  };

  comment.replies.push(reply);
  await blog.save();

  const updatedBlog = await Blog.findById(blog._id)
    .populate("comments.user", "name avatar")
    .populate("comments.replies.user", "name avatar");

  const updatedComment = updatedBlog.comments.id(req.params.commentId);

  res.status(201).json(updatedComment);
});

// @desc    Toggle blog like
// @route   POST /api/blogs/:id/like
// @access  Private
const toggleLike = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.status !== "published") {
    res.status(404);
    throw new Error("Blog not found");
  }

  const likeIndex = blog.likes.indexOf(req.user._id);

  if (likeIndex > -1) {
    // Unlike
    blog.likes.splice(likeIndex, 1);
  } else {
    // Like
    blog.likes.push(req.user._id);
  }

  await blog.save();

  res.json({
    liked: likeIndex === -1,
    likeCount: blog.likes.length,
  });
});

// @desc    Get blog categories
// @route   GET /api/blogs/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Blog.distinct("category", { status: "published" });

  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const count = await Blog.countDocuments({
        category,
        status: "published",
      });
      return { name: category, count };
    })
  );

  res.json(categoriesWithCount);
});

// @desc    Get popular tags
// @route   GET /api/blogs/tags
// @access  Public
const getTags = asyncHandler(async (req, res) => {
  const tags = await Blog.aggregate([
    { $match: { status: "published" } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
    { $project: { _id: 0, name: "$_id", count: 1 } },
  ]);

  res.json(tags);
});

// @desc    Get featured blogs
// @route   GET /api/blogs/featured
// @access  Public
const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const blogs = await Blog.find({ status: "published", featured: true })
    .populate("author", "name avatar")
    .sort("-publishedAt")
    .limit(Number(limit));

  res.json(blogs);
});

// @desc    Get related blogs
// @route   GET /api/blogs/:id/related
// @access  Public
const getRelatedBlogs = asyncHandler(async (req, res) => {
  const { limit = 3 } = req.query;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const relatedBlogs = await Blog.find({
    _id: { $ne: blog._id },
    status: "published",
    $or: [{ category: blog.category }, { tags: { $in: blog.tags } }],
  })
    .populate("author", "name avatar")
    .sort("-publishedAt")
    .limit(Number(limit));

  res.json(relatedBlogs);
});

export {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  addReply,
  toggleLike,
  getCategories,
  getTags,
  getFeaturedBlogs,
  getRelatedBlogs,
};
