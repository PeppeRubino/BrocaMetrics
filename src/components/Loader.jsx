// File: src/components/Loader.jsx
import React from 'react';

/**
 * Loader professionale e accessibile.
 * Props:
 * - isLoading (boolean): mostra/nasconde il loader
 * - progress (number|null): 0..100 se vuoi mostrare una barra di progresso determinata (opzionale)
 * - label (string): testo da mostrare (default "Loading")
 */
const Loader = ({ isLoading = false, progress = null, label = 'Loading' }) => {
  const show = Boolean(isLoading);

  return (
    <section
      id="loader"
      role="status"
      aria-live="polite"
      aria-hidden={!show}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm transition-opacity duration-300 ${
        show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* Inline styles per animazioni (safe e self-contained) */}
      <style>{`
        /* rotazione lenta e piacevole */
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        /* dash animation for SVG stroke */
        @keyframes dash {
          0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
          100% { stroke-dasharray: 1, 200; stroke-dashoffset: -125px; }
        }
        .loader__svg { animation: spin-slow 2.2s linear infinite; }
        .loader__circle { animation: dash 1.6s ease-in-out infinite; transform-origin: 50% 50%; }
        .loader__pulse { animation: pulse 1.2s ease-in-out infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.08); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        /* small, subtle shadow for the panel */
        .loader__panel { box-shadow: 0 8px 30px rgba(15,23,42,0.12); border-radius: 14px; }
      `}</style>

      <div className="loader__panel bg-white p-5 flex flex-col items-center gap-3 max-w-xs w-full"
           style={{ borderRadius: 12 }}>
        {/* SVG spinner */}
        <svg className="loader__svg" width="88" height="88" viewBox="0 0 66 66" aria-hidden>
          {/* background ring */}
          <circle cx="33" cy="33" r="28" fill="none" stroke="#eef2f7" strokeWidth="6" />
          {/* animated stroke (uses currentColor) */}
          <circle
            className="loader__circle"
            cx="33"
            cy="33"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ color: '#0f172a' }} /* default brand color: slate-900; cambia se vuoi */
            strokeDasharray="1,200"
          />
        </svg>

        {/* Message and optional progress */}
        <div className="flex flex-col items-center w-full text-center px-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-slate-900">{label}</span>
            {typeof progress === 'number' && (
              <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
            )}
          </div>

          {/* determinate progress bar (if progress provided) else subtle indeterminate bar */}
          <div className="mt-3 w-full">
            {typeof progress === 'number' ? (
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden" aria-hidden>
                <div
                  style={{
                    width: `${Math.max(0, Math.min(100, progress))}%`,
                    height: '100%',
                    transition: 'width 300ms ease',
                    background: 'linear-gradient(90deg,#0f172a,#0b83ff)'
                  }}
                />
              </div>
            ) : (
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden" aria-hidden>
                <div
                  style={{
                    width: '30%',
                    height: '100%',
                    transform: 'translateX(-25%)',
                    background: 'linear-gradient(90deg,#0f172a,#0b83ff)',
                    borderRadius: 999,
                    animation: 'indeterminate 1.4s linear infinite'
                  }}
                />
                <style>{`
                  @keyframes indeterminate {
                    0% { transform: translateX(-40%); width: 30%; }
                    50% { transform: translateX(30%); width: 60%; }
                    100% { transform: translateX(120%); width: 30%; }
                  }
                `}</style>
              </div>
            )}
          </div>

          {/* accessible text only for screen readers */}
          <span className="sr-only" aria-hidden={false}>
            {label} {typeof progress === 'number' ? `${Math.round(progress)} percent complete` : ''}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Loader;
