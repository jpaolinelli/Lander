import React, { useEffect, useState } from 'react';
import audioManager, { SoundEffect } from '../utils/audioManager';

const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize audio manager
    audioManager.init();
    
    // Start playing background music
    audioManager.playMusic();
    
    // Clean up on unmount
    return () => {
      audioManager.stopMusic();
    };
  }, []);

  const handleMuteToggle = () => {
    const newMuteState = audioManager.toggleMute();
    setIsMuted(newMuteState);
  };

  return (
    <div className="audio-controls">
      <button 
        onClick={handleMuteToggle}
        className="mute-button"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
      <style jsx>{`
        .audio-controls {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .mute-button {
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid #fff;
          color: #fff;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .mute-button:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default AudioControls; 