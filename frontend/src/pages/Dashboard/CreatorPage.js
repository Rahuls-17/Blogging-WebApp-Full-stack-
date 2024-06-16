import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatorPage.css"; // Import CSS file for CreatorPage styling

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: function () {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
              const response = await axios.post(
                "http://localhost:5000/api/blogs/upload-file",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const fileUrl = response.data.fileUrl;
              const quill = this.quill;
              const range = quill.getSelection();
              quill.insertEmbed(range.index, "image", fileUrl);
            } catch (error) {
              console.error("Error uploading image:", error);
              alert("Error uploading image");
            }
          }
        };
      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

const CreatorPage = () => {
  const [content, setContent] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // Use thumbnail URL
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const reactQuillRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = async (status) => {
    try {
      const blogData = {
        content,
        topic_title: topicTitle,
        title,
        short_description: shortDescription,
        thumbnail: thumbnailUrl, // Use the thumbnail URL
        state: status,
      };

      const response = await axios.post(
        `http://localhost:5000/api/blogs/create`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Blog submitted successfully");
      // Clear form
      setContent("");
      setTopicTitle("");
      setTitle("");
      setShortDescription("");
      setThumbnailUrl(""); // Clear thumbnail URL
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Error submitting blog");
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/blogs/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Append base URL to the thumbnail URL
        const baseUrl = "http://localhost:5000";
        const thumbnailUrl = baseUrl + response.data.fileUrl;
        setThumbnailUrl(thumbnailUrl); // Set thumbnail URL
      } catch (error) {
        console.error("Error uploading thumbnail:", error);
        alert("Error uploading thumbnail");
      }
    }
  };

  return (
    <div className="creator-page">
      <div className="header">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="blog-form">
        <h2>Create Blog</h2>
        <input
          type="text"
          placeholder="Topic Title"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        <ReactQuill
          ref={reactQuillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
        />
        <div className="buttons">
          <button onClick={() => handleSubmit("draft")}>Save Draft</button>
          <button onClick={() => handleSubmit("In Review")}>
            Push for Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
