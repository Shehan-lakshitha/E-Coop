// src/components/Footer/Footer.jsx

import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <a href="/">
            <img src={assets.logo} alt="e coop Logo" className="footer-logo" />
          </a>
          <p className="footer-description">
            Welcome to e coop, your digital gateway to fresh, local produce. We connect you directly with our network of dedicated farmers and artisans, ensuring quality and supporting our community.{" "}
            <a href="/about">Learn more about our mission.</a>
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          {/* UPDATED: Renamed to FEATURES */}
          <h2>FEATURES</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="tel:+94112334400">+94 11 23 34 400</a></li>
            <li><a href="mailto:newcoop@gmail.com">newcoop@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <hr />
      {/* UPDATED: Copyright text changed and centered */}
      <p className="footer-copyright">
        Copyright 2025&copy; e coop - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;