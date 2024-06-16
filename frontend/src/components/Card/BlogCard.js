import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({
  _id,
  thumbnail,
  topic,
  title,
  description,
  impressionsCount,
  uploadTime,
  blogState,
  isAdmin,
  isModerator,
  onPutOnHold,
  onPublish,
  onPutOnReview,
}) => {
  const navigate = useNavigate();

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleCardClick = () => {
    navigate(`/blog/${_id}`);
  };

  return (
    <div className="blog-card" onClick={handleCardClick}>
      {thumbnail && (
        <img src={thumbnail} alt={title} className="blog-card-thumbnail" />
      )}
      <div className="blog-card-content">
        <div className="blog-card-topic">
          {topic}{" "}
          {isAdmin && <span className="blog-card-state">{blogState}</span>}
        </div>
        <h2 className="blog-card-title">{title}</h2>
        <p className="blog-card-description">{truncateText(description, 20)}</p>
        <div className="blog-card-footer">
          <span className="impressions">{impressionsCount} Impressions</span>
          <span className="upload-time">
            {new Date(uploadTime).toLocaleDateString()}
          </span>
        </div>
        {(isAdmin || isModerator) && (
          <div
            className="blog-card-actions"
            onClick={(e) => e.stopPropagation()}
          >
            {blogState === "Published" && isAdmin && (
              <button onClick={onPutOnReview}>Put on Review</button>
            )}
            {blogState !== "Published" && (
              <>
                {isAdmin && <button onClick={onPutOnHold}>Put on Hold</button>}
                {isAdmin && <button onClick={onPublish}>Publish</button>}
                {isModerator && (
                  <button onClick={onPutOnHold}>Put on Hold</button>
                )}
                {isModerator && <button onClick={onPublish}>Publish</button>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
