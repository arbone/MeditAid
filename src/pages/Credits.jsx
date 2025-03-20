// Credits.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaGlobe } from "react-icons/fa";
import "../styles/Credits.css";

const Credits = () => {
  const navigate = useNavigate();

  return (
    <div className="credits-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg fill="#000000" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" className="back-icon">
          <polygon fillRule="evenodd" points="27.066,1 7,21.068 26.568,40.637 31.502,35.704 16.865,21.068 32,5.933" />
        </svg>
      </button>

      <div className="credits-content">
        <div className="credits-container">
          <h1>Credits</h1>
          
          <div className="credits-section">
            <h2>Sviluppato da</h2>
            <h3>ARBI SHEHU</h3>
            <p>Blockchain Developer</p>
            
            <div className="social-links">
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
          </div>

          <div className="credits-section">
            <h2>Tecnologie</h2>
            <div className="tech-grid">
              <div className="tech-item">React.js</div>
              <div className="tech-item">Vite</div>
              <div className="tech-item">CSS3</div>
              <div className="tech-item">AI Sound Generation</div>
            </div>
          </div>

          <p className="copyright">© 2025 ARBI SHEHU PROTOCOLS</p>
        </div>
      </div>
    </div>
  );
};

export default Credits;
