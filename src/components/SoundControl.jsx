import React, { useState, useRef } from "react";
import styled from "styled-components";

const tracks = [
  { name: "Gratitudine", artist: "Meditation", src: "/sounds/Gratitudine.mp3" },
  { name: "Respiro", artist: "Meditation", src: "/sounds/Respiro.mp3" },
  { name: "Rilassamento Profondo", artist: "Meditation", src: "/sounds/Rilassamento_Profondo.mp3" },
];

const SoundControl = () => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Cambia traccia e ferma la riproduzione attuale
  const changeTrack = (track) => {
    setSelectedTrack(track);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
    }
  };

  // Play/Pausa
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <StyledWrapper>
      {/* Titolo e icona SoundCloud */}
      <div className="currentplaying">
        <svg viewBox="0 0 640 512" height="1em" xmlns="http://www.w3.org/2000/svg" fill="#ff8800" className="soundcloud">
          <path d="M111.4 256.3l5.8 65-5.8 68.3c-.3 2.5-2.2 4.4-4.4 4.4s-4.2-1.9-4.2-4.4l-5.6-68.3 5.6-65c0-2.2 1.9-4.2 4.2-4.2 2.2 0 4.1 2 4.4 4.2z" />
        </svg>
        <p className="heading">Currently Playing</p>
      </div>

      {/* Traccia in esecuzione */}
      <div className={`loader playing`}>
        <div className="song">
          <p className="name">{selectedTrack.name}</p>
          <p className="artist">{selectedTrack.artist}</p>
        </div>
        <button class="control-button" onclick="togglePlayPause()">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" 
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
      </div>

      {/* Lista delle tracce */}
      {tracks.map((track) => (
        <div key={track.name} className="loader" onClick={() => changeTrack(track)}>
          <div className="song">
            <p className="name">{track.name}</p>
            <p className="artist">{track.artist}</p>
          </div>
          <div className="play" />
        </div>
      ))}

      <audio ref={audioRef} src={selectedTrack.src} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: white;
  padding: 1em;
  border-radius: 15px;
  margin: 1em auto;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .currentplaying {
    display: flex;
    align-items: center;
    margin: 1em;
  }

  .soundcloud {
    width: 50px;
    height: 50px;
    margin-right: 0.6em;
  }

  .heading {
    color: black;
    font-size: 1.1em;
    font-weight: bold;
    align-self: center;
  }

  .loader {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4em;
    padding: 1em;
    border-radius: 10px;
    transition: .4s ease-in-out;
  }

  .loader:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }

  .playing {
    background-color: #ff8800;
    color: white;
  }

  .song {
    margin-right: auto;
    color: black;
  }

  .name {
    font-weight: bold;
  }

  .artist {
    font-size: 0.8rem;
    color: gray;
  }

  .albumcover {
    height: 40px;
    width: 40px;
    background-color: rgb(233, 232, 232);
    border-radius: 5px;
    margin-right: 10px;
  }

  .play-button {
    background-color: #ff8800;
    color: white;
    border: none;
    padding: 0.5em;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2em;
  }
`;

export default SoundControl;