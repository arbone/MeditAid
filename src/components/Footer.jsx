import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/arbishehu/" target="_blank" rel="noopener noreferrer">
            <span className="social-icon"><FaLinkedin /></span>
          </a>
          <a href="https://github.com/arbone" target="_blank" rel="noopener noreferrer">
            <span className="social-icon"><FaGithub /></span>
          </a>
          <a href="mailto:arbishehu.business@gmail.com">
            <span className="social-icon"><FaEnvelope /></span>
          </a>
          <a href="https://arbone.github.io/arbi-shehu-protocols/index.html" target="_blank" rel="noopener noreferrer">
            <span className="social-icon"><FaGlobe /></span>
          </a>
        </div>
        <p className="copyright">© 2025 ARBI SHEHU PROTOCOLS</p>
        <p className="copyright">Tutti i diritti riservati</p>
      </div>
    </footer>
  );
};

export default Footer;
