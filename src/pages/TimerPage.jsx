// TimerPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TimerPage.css";
import Timer from "../components/Timer";
import SoundPlayer from "../components/SoundPlayer";

const TimerPage = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(300); // 5 minuti in secondi
  const [isRunning, setIsRunning] = useState(false);
  const timerInterval = useRef(null);

  // Gestione del timer
  useEffect(() => {
    if (isRunning) {
      timerInterval.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
    }
    
    return () => clearInterval(timerInterval.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(300); // Resetta a 5 minuti
  };

  const addFiveMinutes = () => {
    setTime((prevTime) => prevTime + 300);
  };

  // Funzione passata a SoundPlayer per sincronizzare lo stato di riproduzione
  const handleSoundPlayerStateChange = (isPlaying) => {
    setIsRunning(isPlaying);
  };

  // Funzione che gestisce il reset dal SoundPlayer
  const handleResetTrack = () => {
    resetTimer(); // Resetta il timer quando viene resettata una traccia
  };

  return (
    <div className="timer-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg fill="#000000" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" className="back-icon">
          <polygon fillRule="evenodd" points="27.066,1 7,21.068 26.568,40.637 31.502,35.704 16.865,21.068 32,5.933" />
        </svg>
      </button>

      <div className="timer-wrapper">
        <SoundPlayer 
          onPlayStateChange={handleSoundPlayerStateChange} 
          onResetTrack={handleResetTrack} 
        />
        <Timer time={time} />

        <div className="controls-and-quotes">
          <div className="timer-controls">
            {/* Play/Pausa */}
            <button className="control-button" onClick={toggleTimer}>
              {isRunning ? (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" fill="#000000" />
                  <rect x="14" y="4" width="4" height="16" fill="#000000" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            {/* Reset */}
            <button className="control-button" onClick={resetTimer}>
              <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path>
                <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path>
              </svg>
            </button>

            {/* Rimuovi 5 minuti */}
            <button className="control-button" onClick={() => setTime((prevTime) => Math.max(prevTime - 300, 0))}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4.5L12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.7288 22 5.82446 20.4293 4 18.001M8 2.83209C6.87754 3.32251 5.86251 4.01303 5 4.85857C3.14864 6.67349 2 9.20261 2 12C2 12.6849 2.06886 13.3538 2.20004 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M14 8.5H11.3604C11.1452 8.5 10.9541 8.63772 10.886 8.84189L10.2194 10.8419C10.1114 11.1657 10.3524 11.5 10.6937 11.5H12C13.1046 11.5 14 12.3954 14 13.5C14 14.6046 13.1046 15.5 12 15.5H10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
              </svg>
            </button>

            {/* Aggiungi 5 minuti */}
            <button className="control-button" onClick={addFiveMinutes}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.5L12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 7.89936 19.5318 4.3752 16 2.83209" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M14 8.5H11.3604C11.1452 8.5 10.9541 8.63772 10.886 8.84189L10.2194 10.8419C10.1114 11.1657 10.3524 11.5 10.6937 11.5H12C13.1046 11.5 14 12.3954 14 13.5C14 14.6046 13.1046 15.5 12 15.5H10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
