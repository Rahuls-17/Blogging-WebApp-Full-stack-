import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.js"; // Adjust the import path as necessary
import Footer from "../../components/Footer/Footer.js"; // Adjust the import path as necessary
import "./BlogDetails.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlogDetail();
  }, []);

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog detail:", error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="blog-detail-container">
        <div className="blog-detail">
          <div className="blog-detail-header">
            <h1 className="blog-detail-title">{blog.title}</h1>
            <p className="blog-detail-upload-time">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="blog-detail-content">
            <p className="blog-detail-description">{blog.description}</p>
            <div
              className="blog-detail-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
