import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import meditationImage from "../assets/meditation-illustration.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MeditAid</h1>
        <p className="subtitle">La tua oasi di pace interiore.</p>
      </header>

      <div className="home-content">
        <img src={meditationImage} alt="Meditazione" className="home-image" />
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
