import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../styles/Home.css"; // Percorso corretto
import meditationImage from "../assets/meditation-illustration.png"; // Importa l'immagine

const Home = () => {
  const navigate = useNavigate(); // Hook per la navigazione

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MeditAid</h1>
        <p className="subtitle">La tua oasi di pace interiore.</p>
      </header>

      <div className="home-content">
        <img
          src={meditationImage} // Usa l'import
          alt="Meditazione"
          className="home-image"
        />
        <p className="description">
          Immergiti nella mindfulness e trasforma il tuo benessere mentale. <br />
          Prova subito il nostro MediTimer!<br /> 
          Seguici per scoprire nuove funzionalità!
        </p>
        <button className="cta-button" onClick={() => navigate("/timer")}>
          Inizia il tuo viaggio
        </button>
      </div>
    </div>
  );
};

export default Home;