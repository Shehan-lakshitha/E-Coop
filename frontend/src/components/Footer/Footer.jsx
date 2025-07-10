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
Welcome to E-COOP. We are more than a marketplace; we are a digital cooperative born from the belief that the best food comes from our own community. Our mission is to shorten the distance between the hands that grow and the homes that gather, creating a direct bridge from our dedicated local farmers and artisans to you.            
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
         
          <h2>Easy Connect</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li><a href="tel:+94112334400">+94 11 23 34 400</a></li>
            <li><a href="mailto:newcoop@gmail.com">newecoop@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <hr />
      {/* UPDATED: Copyright text changed and centered */}
      <p className="footer-copyright">
        Copyright &copy; 2025 E-COOP PAMBAHINNA - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;