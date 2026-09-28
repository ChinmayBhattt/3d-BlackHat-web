'use client';

import { useState, useRef, useEffect } from 'react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    window.isSoundActive = isPlaying;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src="/assets/ambient.mp3" />

      <button
        className={`sound-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label="Toggle cinematic audio"
        title="Toggle atmospheric sound"
      >
        <div className="sound-bars">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
        <span className="sound-text">SOUND: <span>{isPlaying ? 'ON' : 'OFF'}</span></span>
      </button>
    </>
  );
}
