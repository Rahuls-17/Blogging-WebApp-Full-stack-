const express = require("express");
const Blog = require("../models/Blog");
const Log = require("../models/Log");
const { sendNotification } = require("../utils/notification");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for storing uploaded files
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadFile = [
  upload.single("file"), // Middleware to handle single file uploads with field name "file"
  (req, res) => {
    if (!req.file) {
      // If no file is uploaded
      return res.status(400).json({ message: "No file uploaded" });
    }
    // If file is uploaded successfully, send back the file URL
    res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
  },
];

// Create a new blog
exports.createBlog = async (req, res) => {
  const { content, topic_title, state, title, short_description, thumbnail } =
    req.body;
  const author_id = req.user.id;

  try {
    const blog = new Blog({
      content,
      topic_title,
      author_id,
      state,
      title,
      short_description,
      thumbnail,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Verify a blog
exports.verifyBlog = async (req, res) => {
  const { blogId, verifierComments } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.error("Blog not found:", blogId);
      return res.status(404).json({ error: "Blog not found" });
    }
    blog.state = "In Review";
    blog.verifier_comments = verifierComments;
    blog.verifier_id = req.user.id;
    await blog.save();
    await Log.create({
      action: "Pushed In Review",
      user_id: req.user.id,
      blog_id: blogId,
    });
    await sendNotification(
      blog.author_id,
      "Your blog is under review.",
      "Your blog is under review."
    );
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error verifying blog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Publish a blog
exports.publishBlog = async (req, res) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.error("Blog not found:", blogId);
      return res.status(404).json({ error: "Blog not found" });
    }
    blog.state = "Published";
    blog.publisher_id = req.user.id;
    await blog.save();
    await Log.create({
      action: "Published",
      user_id: req.user.id,
      blog_id: blogId,
    });
    await sendNotification(
      blog.author_id,
      "Your blog has been published.",
      "Your blog has been published."
    );
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error publishing blog:", error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch blogs in review
exports.getBlogsInReview = async (req, res) => {
  try {
    const blogsInReview = await Blog.find({ state: "In Review" });
    res.status(200).json(blogsInReview);
  } catch (error) {
    console.error("Error fetching blogs in review:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update the state of a blog
exports.updateBlogState = async (req, res) => {
  const { blogId, newState } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.error("Blog not found:", blogId);
      return res.status(404).json({ error: "Blog not found" });
    }
    blog.state = newState;
    await blog.save();
    await Log.create({
      action: `Changed state to ${newState}`,
      user_id: req.user.id,
      blog_id: blogId,
    });
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog state:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get published blogs without requiring authentication
exports.getPublishedBlogs = async (req, res) => {
  try {
    const publishedBlogs = await Blog.find({ state: "Published" });
    res.status(200).json(publishedBlogs);
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blogs for moderator
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    res.status(500).json({ error: error.message });
  }
};
