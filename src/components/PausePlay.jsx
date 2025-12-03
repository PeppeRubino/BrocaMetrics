// src/components/PausePlay.jsx
import React, { useEffect, useState } from 'react';

const PausePlay = ({ sceneRef, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Try to read initial state from sceneRef if available
  useEffect(() => {
    try {
      const s = sceneRef?.current;
      if (!s) return;

      if (typeof s.isPlaying === 'function') {
        setIsPlaying(!!s.isPlaying());
        return;
      }

      if (typeof s.isPlaying !== 'undefined') {
        setIsPlaying(!!s.isPlaying);
        return;
      }

      // if there's a isPaused flag instead
      if (typeof s.isPaused === 'function') {
        setIsPlaying(!s.isPaused());
        return;
      }

      if (typeof s.isPaused !== 'undefined') {
        setIsPlaying(!s.isPaused);
        return;
      }

      // fallback: assume playing unless a "paused" method exists
      if (typeof s.pause === 'function' || typeof s.stopAnimation === 'function' || typeof s.pauseAnimation === 'function') {
        setIsPlaying(true);
      }
    } catch (err) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneRef?.current]);

  const toggle = () => {
    try {
      const s = sceneRef?.current;

      // 1) prefer a dedicated toggle if present
      if (s && typeof s.togglePlay === 'function') {
        s.togglePlay();
        setIsPlaying((p) => !p);
        return;
      }

      // 2) if currently playing -> try to pause/stop
      if (isPlaying) {
        if (s) {
          if (typeof s.pause === 'function') { s.pause(); }
          else if (typeof s.stop === 'function') { s.stop(); }
          else if (typeof s.stopAnimation === 'function') { s.stopAnimation(); }
          else if (typeof s.pauseAnimation === 'function') { s.pauseAnimation(); }
        }
        setIsPlaying(false);
        return;
      }

      // 3) if currently paused -> try to play/resume
      if (!isPlaying) {
        if (s) {
          if (typeof s.play === 'function') { s.play(); }
          else if (typeof s.start === 'function') { s.start(); }
          else if (typeof s.resumeAnimation === 'function') { s.resumeAnimation(); }
          else if (typeof s.startAnimation === 'function') { s.startAnimation(); }
        }
        setIsPlaying(true);
        return;
      }
    } catch (err) {
      console.error('PausePlay toggle error', err);
      // invert local state as fallback so UI remains responsive
      setIsPlaying((p) => !p);
    }
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <button
        type="button"
        aria-pressed={isPlaying === false}
        aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
        onClick={toggle}
        className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 bg-white/90 hover:bg-white/95 transition select-none"
      >
        {isPlaying ? (
          // Pause icon (two bars)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        ) : (
          // Play icon (triangle)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PausePlay;