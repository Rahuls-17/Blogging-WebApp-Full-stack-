import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import { useAuth } from "../../Context/AuthContext";

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // Logic to handle logout, like clearing tokens and redirecting to login page
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-page-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="admin-page-title">Admin Dashboard</h1>
      <div className="admin-options">
        <Link to="/admin/users" className="admin-option">
          <button className="admin-option-button">Users List</button>
        </Link>
        <Link to="/admin/blogs" className="admin-option">
          <button className="admin-option-button">Blogs</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
