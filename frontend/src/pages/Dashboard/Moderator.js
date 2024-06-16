import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import BlogCard from "../../components/Card/BlogCard";

const ModeratorPage = () => {
  const [blogs, setBlogs] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogsInReview();
  }, []);

  const fetchBlogsInReview = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blogs/moderator/in-review",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs in review:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePutOnHold = async (id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/blogs/moderator/update-state",
        { blogId: id, newState: "On Hold" }, // Pass the blog ID in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchBlogsInReview();
    } catch (error) {
      console.error("Error putting blog on hold:", error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/blogs/moderator/update-state",
        { blogId: id, newState: "Published" }, // Pass the blog ID in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchBlogsInReview();
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>Moderator Page</h1>
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          _id={blog._id}
          thumbnail={blog.thumbnail}
          topic={blog.topic_title}
          title={blog.title}
          description={blog.short_description}
          impressionsCount={7} // Sample number
          uploadTime={blog.createdAt}
          onPutOnHold={() => handlePutOnHold(blog._id)}
          onPublish={() => handlePublish(blog._id)}
          isModerator={true}
        />
      ))}
    </div>
  );
};

export default ModeratorPage;
