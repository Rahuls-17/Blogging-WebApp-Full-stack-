import React, { useState } from "react";
import "./FAQsection.css";

const FAQsection = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQs</h2>
      <div className="faq-boxes">
        <div className="button-box">
          <button
            className={`faq-button ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            Why EJY Health?
          </button>
          <button
            className={`faq-button ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            Benefits of joining the waitlist?
          </button>
          <button
            className={`faq-button ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => handleTabClick("tab3")}
          >
            How do I connect?
          </button>
          <button
            className={`faq-button ${activeTab === "tab4" ? "active" : ""}`}
            onClick={() => handleTabClick("tab4")}
          >
            Is it a paid platform?
          </button>
        </div>
        <div className="content-box">
          {activeTab === "tab1" && (
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          )}
          {activeTab === "tab2" && (
            <div>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          )}
          {activeTab === "tab3" && (
            <div>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </div>
          )}
          {activeTab === "tab4" && (
            <div>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQsection;
