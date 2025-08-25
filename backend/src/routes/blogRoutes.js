import express from "express";
import {
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
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.route("/").get(getBlogs);
router.route("/categories").get(getCategories);
router.route("/tags").get(getTags);
router.route("/featured").get(getFeaturedBlogs);
router.route("/:slug").get(getBlogBySlug);
router.route("/:id/related").get(getRelatedBlogs);

// Protected routes
router.route("/").post(protect, admin, createBlog);
router.route("/:id").put(protect, admin, updateBlog);
router.route("/:id").delete(protect, admin, deleteBlog);
router.route("/:id/comments").post(protect, addComment);
router.route("/:id/comments/:commentId/replies").post(protect, addReply);
router.route("/:id/like").post(protect, toggleLike);

export default router;
