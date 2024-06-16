import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.js";
import Footer from "../../components/Footer/Footer.js";
import FAQsection from "../../components/FAQsection/FAQsection.js";
import BlogCard from "../../components/Card/BlogCard.js";
import "./Homepage.css";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

  const fetchPublishedBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blogs/published"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching published blogs:", error);
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="homepage-content">
        <div className="content-container">
          <h1 className="page-title">Explore some health gyan</h1>
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
              />
            ))}
          </div>
        </div>
        <FAQsection />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
