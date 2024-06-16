const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  getAllUsers,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/fetch-users", authMiddleware, getAllUsers);

module.exports = router;
