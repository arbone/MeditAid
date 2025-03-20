import React from "react";
import "../styles/TimerPage.css"; // Importiamo il CSS per lo stile

const Timer = ({ time }) => {
  // Convertiamo secondi in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <div className="timer">{formatTime(time)}</div>;
};

export default Timer;