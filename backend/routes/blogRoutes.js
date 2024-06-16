const express = require("express");
const {
  createBlog,
  verifyBlog,
  publishBlog,
  uploadFile,
  getBlogsInReview,
  updateBlogState,
  getPublishedBlogs,
  getBlogById,
  getAllBlogs,
} = require("../controllers/blogController");
const { authMiddleware, roleMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware(["Creator"]), createBlog);
router.post(
  "/verify",
  authMiddleware,
  roleMiddleware(["Verifier"]),
  verifyBlog
);
router.post(
  "/publish",
  authMiddleware,
  roleMiddleware(["Publisher"]),
  publishBlog
);
router.post(
  "/upload-file",
  authMiddleware,
  roleMiddleware(["Creator"]),
  uploadFile
);

// Moderator routes
router.get(
  "/moderator/in-review",
  authMiddleware,
  roleMiddleware(["Moderator"]),
  getBlogsInReview
);
router.put(
  "/moderator/update-state",
  authMiddleware,
  roleMiddleware(["Moderator"]),
  updateBlogState
);

//get published blogs
router.get("/published", getPublishedBlogs);

router.get(
  "/all-blogs",
  authMiddleware,
  roleMiddleware(["Admin"]),
  getAllBlogs
);

// Route to get a blog post by ID
router.get("/:id", getBlogById);

module.exports = router;
