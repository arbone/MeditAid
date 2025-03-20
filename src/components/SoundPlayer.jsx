// SoundPlayer.jsx
import React, { useState, useEffect } from "react";

import Gratitudine from "../sounds/Gratitudine.mp3";
import Respiro from "../sounds/Respiro.mp3";
import RilassamentoProfondo from "../sounds/Rilassamento_Profondo.mp3";

const tracks = [
  { title: "Gratitudine", src: Gratitudine },
  { title: "Respiro", src: Respiro },
  { title: "Rilassamento Profondo", src: RilassamentoProfondo },
];

const SoundPlayer = ({ onPlayStateChange, onResetTrack }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  const playTrack = (track) => {
    if (currentTrack === track.src) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      audio.src = track.src;
      audio.play();
      setCurrentTrack(track.src);
      setIsPlaying(true);
    }
  };

  const resetTrack = (track) => {
    if (currentTrack === track.src) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      // Chiamata alla funzione di reset del timer
      if (onResetTrack) {
        onResetTrack();
      }
    }
  };

  return (
    <div className="main">
      <div className="currentplaying">
        <p className="heading">Scegli la tua traccia...</p>
      </div>
      {tracks.map((track, index) => (
        <div key={index} className={`loader ${currentTrack === track.src ? "playing" : ""}`}>
          <div className="song">
            <p className="name">{track.title}</p>
            <p className="artist">MeditAid</p>
          </div>

          <button className="control-button" onClick={() => playTrack(track)}>
            {currentTrack === track.src && isPlaying ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" fill="#000000" />
                <rect x="14" y="4" width="4" height="16" fill="#000000" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="5 3 19 12 5 21 5 3" fill="#000000" />
              </svg>
            )}
          </button>

          <button className="control-button" onClick={() => resetTrack(track)}>
            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path>
              <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SoundPlayer;

