const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone_no: String,
  location: String,
  dob: Date,
  gender: String,
  role: {
    type: String,
    enum: ["Viewer", "Creator", "Verifier", "Moderator", "Admin"],
    default: "Viewer",
  },
  password: String,
  verified: { type: Boolean, default: false },
});
module.exports = mongoose.model("User", UserSchema);
