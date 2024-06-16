const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  topic_title: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  state: {
    type: String,
    enum: ["Draft", "Pending", "Published", "In Review", "On Hold"],
    default: "Draft",
  },
  title: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, // Store thumbnail URL instead of Buffer
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
