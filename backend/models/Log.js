const mongoose = require("mongoose");
const LogSchema = new mongoose.Schema({
  action: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Log", LogSchema);
