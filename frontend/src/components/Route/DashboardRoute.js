import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const DashboardRoute = () => {
  const { user } = useAuth();

  if (user.role === "Creator") {
    return <Navigate to="/creator" />;
  } else if (user.role === "Moderator") {
    return <Navigate to="/moderator" />;
  } else if (user.role === "Admin") {
    return <Navigate to="/admin" />;
  }

  return <div>Welcome to the Dashboard</div>;
};

export default DashboardRoute;
