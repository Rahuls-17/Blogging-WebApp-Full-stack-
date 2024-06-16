import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../components/Card/BlogCard";
import "./AdminBlogs.css";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blogs/all-blogs"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handlePutOnHold = async (id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/blogs/moderator/update-state",
        { blogId: id, newState: "On Hold" }
        // Assuming you have authentication headers as needed
      );
      fetchBlogs();
    } catch (error) {
      console.error("Error putting blog on hold:", error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/blogs/moderator/update-state",
        { blogId: id, newState: "Published" }
        // Assuming you have authentication headers as needed
      );
      fetchBlogs();
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  const handlePutOnReview = async (id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/blogs/moderator/update-state",
        { blogId: id, newState: "In Review" }
        // Assuming you have authentication headers as needed
      );
      fetchBlogs();
    } catch (error) {
      console.error("Error putting blog on review:", error);
    }
  };

  return (
    <div>
      <div className="admin-blogs-container">
        <h1>Blogs</h1>
        <div className="blog-cards-container">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              _id={blog._id}
              thumbnail={blog.thumbnail}
              topic={blog.topic_title}
              title={blog.title}
              description={blog.short_description}
              impressionsCount={blog.impressionsCount}
              uploadTime={blog.createdAt}
              blogState={blog.state}
              isAdmin={true}
              isModerator={false}
              onPutOnHold={() => handlePutOnHold(blog._id)}
              onPublish={() => handlePublish(blog._id)}
              onPutOnReview={() => handlePutOnReview(blog._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
