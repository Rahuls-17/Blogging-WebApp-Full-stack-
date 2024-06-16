import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css"; // Importing the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { login } = useAuth(); // Access the login function from the AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="logo-container">
          {/* Replace with your actual logo */}
          <img src="logo.png" alt="EJY Healthcare Logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
          <div className="options">
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
            <a href="/register" className="register-link">
              New User?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
