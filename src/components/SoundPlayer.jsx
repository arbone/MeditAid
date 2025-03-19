import React, { useState } from "react";
import "../styles/SoundPlayer.css"; // Assicurati di creare anche il file CSS

const tracks = [
  { title: "Gratitudine", src: "/sounds/Gratitudine.mp3" },
  { title: "Respiro", src: "/sounds/Respiro.mp3" },
  { title: "Rilassamento Profondo", src: "/sounds/Rilassamento_Profondo.mp3" },
];

const SoundPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio] = useState(new Audio());

  const playTrack = (track) => {
    if (currentTrack === track.src) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      audio.src = track.src;
      audio.play();
      setCurrentTrack(track.src);
    }
  };

  return (
    <div className="main">
      <div className="currentplaying">
        <p className="heading">Scegli la tua traccia...</p>
      </div>
      {tracks.map((track, index) => (
        <div key={index} className={`loader ${currentTrack === track.src ? "playing" : ""}`} onClick={() => playTrack(track)}>
          <div className="song">
            <p className="name">{track.title}</p>
            <p className="artist">MeditAid</p>
          </div>
          <div className="play"></div>
        </div>
      ))}
    </div>
  );
};

export default SoundPlayer;