import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-nav">
        {/* Logo and Join Waitlist Button Section */}
        <div className="foot-logo">
          <img src="/logo_2.png" alt="EJY Health Logo" />
          <div className="slogan">
            <p>Unlock the full potential</p>
            <p>of your health</p>
          </div>
          <div className="slogan2">
            <p>Get the exclusive early access of the EJY Health</p>
            <p>by joining the waitlist.</p>
          </div>
          {/* Join Waitlist Button */}
          <button className="join-waitlist">Join Waitlist</button>
        </div>

        {/* Navigation Links Section */}
        <div className="foot-links">
          <div className="Links">
            <p>LINKS</p>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#Blog">Blog</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="About">
            <p>ABOUT</p>
            <ul>
              <li>
                <a href="#home">Resources</a>
              </li>
              <li>
                <a href="#Blog">EJY Careers</a>
              </li>
              <li>
                <a href="#events">Community</a>
              </li>
              <li>
                <a href="#contact">About Us</a>
              </li>
            </ul>
          </div>
          <div className="Get_App">
            <p>GET APP</p>
            <ul>
              <li>
                <a href="#home">Playstore</a>
              </li>
              <li>
                <a href="#Blog">Appstore</a>
              </li>
            </ul>
          </div>
          <div className="Features">
            <p>FEATURES</p>
            <ul>
              <li>
                <a href="#home">Our Services</a>
              </li>
              <li>
                <a href="#Blog">Job Portal</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
