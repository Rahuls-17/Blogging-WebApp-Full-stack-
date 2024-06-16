import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login";
import Admin from "./pages/Dashboard/Admin";
import CreatorPage from "./pages/Dashboard/CreatorPage";
import Moderator from "./pages/Dashboard/Moderator";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import DashboardRoute from "./components/Route/DashboardRoute";
import Register from "./pages/Auth/Register";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import AdminUsers from "./pages/Dashboard/AdminUsers";
import AdminBlogs from "./pages/Dashboard/AdminBlogs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="/creator" element={<CreatorPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/moderator" element={<Moderator />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
