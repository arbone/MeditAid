import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const tracks = [
  { name: "Gratitudine", artist: "MeditAid Music", src: "/sounds/Gratitudine.mp3" },
  { name: "Respiro", artist: "MeditAid Music", src: "/sounds/Respiro.mp3" },
  { name: "Rilassamento Profondo", artist: "MeditAid Music", src: "/sounds/Rilassamento_Profondo.mp3" },
];

const SoundControl = () => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const changeTrack = (track) => {
    setSelectedTrack(track);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
    }
  };

  const toggleTimer = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const otherTracks = tracks.filter(track => track.name !== selectedTrack.name);

  return (
    <StyledWrapper isPlaying={isPlaying}>
      <div className="currentplaying">
        <p className="heading">In riproduzione ora, per te:</p>
      </div>

      {/* Player principale */}
      <div className="main-player">
        <div className="track-info">
          <h2 className="track-name">{selectedTrack.name}</h2>
          <p className="track-artist">{selectedTrack.artist}</p>
        </div>
        
        <div className="controls">
          <button className="control-button" onClick={resetTrack}>
            <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path>
              <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path>
            </svg>
          </button>

          <button className="control-button" onClick={toggleTimer}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="currentplaying">
        <p className="heading">Altre tracce per te:</p>
      </div>

      {otherTracks.map((track) => (
        <div key={track.name} className="loader" onClick={() => changeTrack(track)}>
          <div className="song">
            <p className="name">{track.name}</p>
            <p className="artist black">{track.artist}</p>
          </div>
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
  margin-top:50px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .currentplaying {
    display: flex;
    align-items: center;
    margin: 1em;
  }

  .heading {
    color: black;
    font-size: 1.1em;
    font-weight: bold;
    align-self: center;
  }

  /* Stili per il player principale */
  .main-player {
    background-color: #ff8800;
    padding: 1.5em;
    border-radius: 10px;
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .track-info {
    color: white;
  }

  .track-name {
    font-size: 1.2em;
    font-weight: bold;
    margin: 0;
    color: black;
  }

  .track-artist {
    font-size: 0.9em;
    margin: 0.3em 0 0 0;
    color: black;
  }

  .controls {
    display: flex;
    gap: 0.5em;
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

  .song {
    margin-right: auto;
    color: black;
  }

  .name {
    font-weight: bold;
    margin: 0;
  }

  .artist {
    font-size: 0.8rem;
    color: gray;
    margin: 0.3em 0 0 0;
  }

  .artist.black {
    color: black;
  }

  .control-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control-button svg {
    width: 24px;
    height: 24px;
    fill: #000000;
  }
`;

export default SoundControl;
