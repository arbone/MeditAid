import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TimerPage from "./pages/TimerPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/Footer.css";
import "./styles/Navbar.css"; // Importiamo anche lo stile della Navbar

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />  {/* ✅ Adesso la Navbar viene renderizzata correttamente */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<TimerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;