// File: src/components/InfoContainer.jsx
import React, { useState, useEffect, useRef } from 'react';
import BROADMANN_POINTS from './Variables.jsx';

const STORAGE_KEY = 'InfoContainer.position';

const InfoContainer = ({
  selectedNumber,
  isDrawer = false,     // se true: comportamento da drawer/mobile (disable drag)
  isOpen = true,        // se usato come drawer, controlla visibilità
  persistPosition = true // salva posizione su localStorage
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startClient, setStartClient] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const divRef = useRef(null);

  // inizializza posizione: top-right preferita; se saved in localStorage, la riprende
  useEffect(() => {
    const updateInitial = () => {
      const width = window.innerWidth;
      const initialX = Math.max(12, width - 340); // leave some margin
      const initialY = 20;
      let initial = { x: initialX, y: initialY };

      if (persistPosition) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
              initial = parsed;
            }
          }
        } catch (e) { /* ignore */ }
      }

      setPosition(initial);
    };

    updateInitial();
    window.addEventListener('resize', updateInitial);
    return () => window.removeEventListener('resize', updateInitial);
  }, [persistPosition]);

  // apri automaticamente se viene selezionato un numero
  useEffect(() => {
    if (selectedNumber) setIsMinimized(false);
  }, [selectedNumber]);

  // persist position on change
  useEffect(() => {
    if (!persistPosition) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    } catch (e) { /* ignore */ }
  }, [position, persistPosition]);

  const handleStart = (e) => {
    if (isDrawer) return; // no dragging if used as drawer
    let clientX, clientY;
    if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setOffset({ x: clientX - position.x, y: clientY - position.y });
    setStartClient({ x: clientX, y: clientY });
    setHasDragged(false);
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    let clientX, clientY;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const dx = clientX - startClient.x;
    const dy = clientY - startClient.y;
    if (!hasDragged && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      setHasDragged(true);
    }
    setPosition({ x: Math.max(8, clientX - offset.x), y: Math.max(8, clientY - offset.y) });
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!hasDragged && isMinimized) setIsMinimized(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]); // rimosso handleMove dalle deps per evitare warning

  // SAFE: recupera l'array dei punti indipendentemente da come è esportato Variables.jsx
  const pointsArray = React.useMemo(() => {
    if (!BROADMANN_POINTS) return [];
    // caso 1: import diretto dell'array
    if (Array.isArray(BROADMANN_POINTS)) return BROADMANN_POINTS;
    // caso 2: default export oggetto con chiave BROADMANN_POINTS
    if (Array.isArray(BROADMANN_POINTS.BROADMANN_POINTS)) return BROADMANN_POINTS.BROADMANN_POINTS;
    // fallback: se dev'essere named export ma importato come undefined, return []
    return [];
  }, []);

  const brodmannInfo = React.useMemo(() => {
    if (!selectedNumber) return null;
    return pointsArray.find(p => Number(p.id) === Number(selectedNumber)) || null;
  }, [selectedNumber, pointsArray]);

  if (isDrawer && !isOpen) return null;
  if (!selectedNumber) return null;

  const wrapperStyle = isDrawer ? {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
    touchAction: 'auto'
  } : {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 1000,
    width: isMinimized ? 'auto' : '20rem', // ~320px
    touchAction: 'none'
  };

  return (
    <section id="broadmannTexts" aria-live="polite">
      <div
        id="containerTexts"
        ref={divRef}
        className="select-none bg-white text-gray-800 rounded-lg overflow-hidden shadow-xl"
        style={wrapperStyle}
      >
        {!isMinimized ? (
          <>
            <div
              className={`flex justify-between items-center px-3 py-2 ${isDrawer ? 'bg-gray-100' : 'bg-gray-100 cursor-move'}`}
              {...(!isDrawer ? { onMouseDown: handleStart, onTouchStart: handleStart } : {})}
            >
              <h4 className="text-sm font-semibold">Info</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="text-gray-700 hover:text-gray-900"
                  aria-label="Minimizza"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-2 overflow-y-auto max-h-[80vh]">
              {brodmannInfo ? (
                <div id={`numberSectionInfo${brodmannInfo.id}`} className="space-y-2">
                  <h2 className="text-base font-bold">{brodmannInfo.label}</h2>
                  <p className="text-sm mt-1 text-gray-700">{brodmannInfo.description}</p>

                </div>
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 bg-white/80 rounded-md border border-dashed border-gray-200">
                  Nessuna descrizione disponibile per l'area {String(selectedNumber)}.
                </div>
              )}

              <div className="mt-3 text-xs text-gray-500">Se non vedi il punto, prova a cambiare modello o chiudere/riaprire il pannello.</div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-move hover:opacity-95 transition"
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              aria-label="Apri Info"
            >
              Apri Info
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfoContainer;
