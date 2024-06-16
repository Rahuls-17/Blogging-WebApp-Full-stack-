const mongoose = require("mongoose");
const TopicSchema = new mongoose.Schema({
  name: String,
  parent_topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});
module.exports = mongoose.model("Topic", TopicSchema);
