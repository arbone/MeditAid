import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TimerPage from "./pages/TimerPage";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<TimerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;