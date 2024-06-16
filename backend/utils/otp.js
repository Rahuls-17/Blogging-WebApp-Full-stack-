const crypto = require("crypto");

// Function to generate OTP
exports.generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  return otp.toString();
};

// Function to verify OTP
exports.verifyOtp = (otpAttempt, otp) => {
  // Compare the provided OTP attempt with the actual OTP
  return otpAttempt === otp;
};
