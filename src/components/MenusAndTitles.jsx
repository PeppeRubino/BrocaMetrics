import React, { useState, useEffect, useRef } from 'react';
import PausePlay from './PausePlay';
import { LOBES_MODEL_1, LOBES_MODEL_2, LOBES_MODEL_3, SECTION_PLANES, SECTION_TO_PART_MAP } from './Variables.jsx';

const MenusAndTitles = ({ isMenuOpen, current, currentModel, currentScreen, sceneRef, setSelectedNumber, setCurrentModel, setIsMenuOpen }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [localModel, setLocalModel] = useState(typeof currentModel === 'number' ? currentModel : 1);
  const [visibleMode, setVisibleMode] = useState(typeof current === 'number' ? current : 1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startClient, setStartClient] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const divRef = useRef(null);
  const [activeLobe, setActiveLobe] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  // Detect if this component is used as a controlled drawer by parent
  const isDrawer = typeof setIsMenuOpen === 'function' && typeof isMenuOpen !== 'undefined';

  useEffect(() => {
    if (typeof current === 'number' && current !== visibleMode) setVisibleMode(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    if (typeof currentModel === 'number' && currentModel !== localModel) {
      setLocalModel(currentModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModel]);

  const handleStart = (e) => {
    if (isDrawer) return; // disable dragging when used as drawer/mobile
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
    if (!hasDragged && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) setHasDragged(true);
    setPosition({ x: clientX - offset.x, y: clientY - offset.y });
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
  }, [isDragging]);

  const modelItems = (typeof currentModel === 'number' ? currentModel : localModel) === 1
    ? LOBES_MODEL_1
    : (typeof currentModel === 'number' ? currentModel : localModel) === 2
      ? LOBES_MODEL_2
      : LOBES_MODEL_3;

  const displayedModel = typeof currentModel === 'number' ? currentModel : localModel;

  const change = (next) => {
    const clamped = Math.max(1, Math.min(3, Number(next) || 1));
    if (typeof setCurrentModel === 'function') {
      try { setCurrentModel(clamped); } catch (err) { console.warn('setCurrentModel threw an error:', err); }
    } else setLocalModel(clamped);

    try {
      const s = sceneRef?.current;
      if (!s) return;
      if (typeof s.changeModel === 'function') { s.changeModel(clamped); return; }
      if (typeof s.loadModel === 'function') { s.loadModel(clamped); return; }
      if (typeof s.switchModel === 'function') { s.switchModel(clamped); return; }
      if (typeof s.setModelIndex === 'function') { s.setModelIndex(clamped); return; }
      console.debug('No changeModel/loadModel/switchModel on sceneRef; model state updated locally/parent-only.');
    } catch (err) {
      console.error('Error while notifying sceneRef about model change:', err);
    }
  };

  const handleSectionClick = (item) => {
    const id = item.id;
    try {
      if (activeLobe === id) {
        if (typeof sceneRef?.current?.resetColor === 'function') sceneRef.current.resetColor();
        setActiveLobe(null);
      } else {
        if (typeof sceneRef?.current?.resetColor === 'function') sceneRef.current.resetColor();
        const fallbackPartName = item.partName || id;
        const mappedName = SECTION_TO_PART_MAP[id] ?? fallbackPartName;
        const color = item.color ?? 0xff0000;
        if (mappedName && typeof sceneRef?.current?.colorObjectByName === 'function') {
          sceneRef.current.colorObjectByName(mappedName, color);
          if (typeof sceneRef.current.focusOn === 'function') sceneRef.current.focusOn(mappedName);
        } else if (fallbackPartName && typeof sceneRef?.current?.colorObjectByName === 'function') {
          sceneRef.current.colorObjectByName(fallbackPartName, color);
          if (typeof sceneRef.current.focusOn === 'function') sceneRef.current.focusOn(fallbackPartName);
        } else if (typeof sceneRef?.current?.colorObjectById === 'function' && item.uuid) {
          sceneRef.current.colorObjectById(item.uuid, color);
        } else {
          console.warn('No suitable color method found on sceneRef for', mappedName, fallbackPartName);
        }
        setActiveLobe(id);
      }
    } catch (err) { console.error('Error in handleSectionClick:', err); }
  };

  const handleSectionPlaneClick = (planeId) => {
    try {
      sceneRef?.current?.showSections?.(planeId);
      setActiveSection(prev => prev === planeId ? null : planeId);
    } catch (err) { console.error('Error calling showSections:', err); }
  };

  const handleSubmit = () => {
    const value = input.trim();
    const n = parseInt(value, 10);
    if (!value || Number.isNaN(n) || n < 1 || n > 52) { setError('Inserisci un numero valido (1–52)'); return; }
    setError('');
    setSelectedNumber?.(n);
    try { sceneRef?.current?.showPoint?.(n); } catch (err) { console.error('Error calling showPoint:', err); }
  };

  const isLobesVisible = visibleMode === 1;
  const isSectionsVisible = visibleMode === 2;
  const isANumbVisible = visibleMode === 3;

  // wrapper style: fixed/draggable when standalone, relative/full when used as drawer
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
    width: isMinimized ? 'auto' : '320px',
    touchAction: 'none'
  };

  if (isDrawer && !isMenuOpen) return null;

  return (
    <div ref={divRef} className="select-none bg-white shadow-xl rounded-lg overflow-hidden" style={wrapperStyle}>
      {!isMinimized ? (
        <>
          <div
            className={`flex justify-between items-center px-3 py-2 bg-gray-100 ${isDrawer ? '' : 'cursor-move'}`}
            {...(!isDrawer ? { onMouseDown: handleStart, onTouchStart: handleStart } : {})}
          >
            <h4 className="text-sm font-semibold text-gray-700">Menu</h4>
            {!isDrawer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="text-gray-700 hover:text-gray-900"
                aria-label="Minimizza"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="p-2">
            <div className="flex gap-1 items-center mt-3">
              <button
                onClick={() => setVisibleMode(1)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className={`px-2 py-1 rounded-md text-xs ${visibleMode === 1 ? 'bg-gray-800 text-white' : 'bg-white/80 text-gray-700'} hover:opacity-95 transition`}
                aria-pressed={visibleMode === 1}
                type="button"
              >
                Lobes
              </button>
              <button
                onClick={() => setVisibleMode(2)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className={`px-2 py-1 rounded-md text-xs ${visibleMode === 2 ? 'bg-gray-800 text-white' : 'bg-white/80 text-gray-700'} hover:opacity-95 transition`}
                aria-pressed={visibleMode === 2}
                type="button"
              >
                Sections
              </button>
              <button
                onClick={() => setVisibleMode(3)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className={`px-2 py-1 rounded-md text-xs ${visibleMode === 3 ? 'bg-gray-800 text-white' : 'bg-white/80 text-gray-700'} hover:opacity-95 transition`}
                aria-pressed={visibleMode === 3}
                type="button"
              >
                Brodmann
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous model"
                  onClick={() => change(displayedModel - 1)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 bg-white/90 hover:bg-gray-100 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="px-2 py-1 text-xs rounded-md border border-gray-200 bg-white/90 text-gray-700 h-8 flex items-center">
                  Modello {displayedModel}
                </div>
                <button
                  type="button"
                  aria-label="Next model"
                  onClick={() => change(displayedModel + 1)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 bg-white/90 hover:bg-gray-100 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center">
                <PausePlay sceneRef={sceneRef} />
              </div>
            </div>
          </div>

          {isLobesVisible && (
            <div className="grid grid-cols-1 gap-2 px-2">
              {modelItems.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 bg-white/80 rounded-md border border-dashed border-gray-200">
                  Nessun elemento disponibile per questo modello (currentModel: {String(displayedModel)})
                </div>
              ) : (
                modelItems.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => handleSectionClick(it)}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className={`text-left w-full px-3 py-2 rounded-md ${activeLobe === it.id ? 'bg-blue-100' : 'bg-white/90'} hover:bg-gray-100 transition text-sm text-gray-800 shadow-sm border border-gray-100`}
                    type="button"
                  >
                    {it.label}
                  </button>
                ))
              )}
            </div>
          )}

          {isSectionsVisible && (
            <div className="grid grid-cols-2 gap-2 px-2">
              {SECTION_PLANES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSectionPlaneClick(p.id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className={`px-3 py-2 rounded-md ${activeSection === p.id ? 'bg-blue-100' : 'bg-white/90'} hover:bg-gray-100 transition text-sm text-gray-800 shadow-sm border border-gray-100`}
                  type="button"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {isANumbVisible && (
            <div className="mt-3 px-2">
              <label htmlFor="numberBroadmann" className="text-sm text-gray-600">Quale area vuoi visualizzare?</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="numberBroadmann"
                  name="numberBroadmann"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-24 px-3 py-2 rounded-md border border-gray-200 text-center text-sm"
                  placeholder="1–52"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                />
                <button
                  onClick={handleSubmit}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="px-3 py-2 rounded-md bg-gray-800 text-white text-sm hover:opacity-95 transition"
                  type="button"
                >
                  Submit
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 mb-2">Se non vedi il punto, prova "Change Model".</p>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </div>
          )}
        </>
      ) : (
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:opacity-95 transition"
          onClick={(e) => {
            e.stopPropagation();
            if (isDrawer) {
              setIsMenuOpen(true);
            } else {
              handleStart(e);
            }
          }}
        >
          Menu
        </button>
      )}
    </div>
  );
};
export default MenusAndTitles;