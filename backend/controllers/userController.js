const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");
const { generateOtp, verifyOtp } = require("../utils/otp");

// Signup
exports.signup = async (req, res) => {
  const { name, email, phone_no, location, dob, gender, role, password } =
    req.body;

  // Input validation
  if (
    !name ||
    !email ||
    !phone_no ||
    !location ||
    !dob ||
    !gender ||
    !role ||
    !password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      phone_no,
      location,
      dob,
      gender,
      role,
      password: hashedPassword,
    });
    await user.save();

    // Send OTP for verification
    const otp = generateOtp();
    await sendEmail(email, "Verify your email", `Your OTP is ${otp}`);

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOtpValid = verifyOtp(otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
