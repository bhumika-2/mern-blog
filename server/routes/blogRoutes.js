import express from "express";
import { createBlog, getAllBlogs, getMyBlogs, getSingleBlog, updateBlog, deleteBlog, likeBlog, addComment, deleteComment} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getAllBlogs);
router.get("/myblogs", protect, getMyBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.put("/like/:id", protect, likeBlog);
router.post("/comment/:id", protect, addComment);
router.delete(
    "/comment/:blogId/:commentId",
    protect,
    deleteComment
);
// Protected route
router.post("/", protect, createBlog);

export default router;