// File: src/App.jsx
import React, { useState, useRef } from 'react';

import ThreeScene from './components/ThreeScene';
import Loader from './components/Loader';
import MenuToggle from './components/MenuToggle';
import MenusAndTitles from './components/MenusAndTitles';

import InfoContainer from './components/InfoContainer';

import Titles from './components/Titles';
import Advertise from './components/Advertise';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentModel, setCurrentModel] = useState(1);
  const [currentScreen, setCurrentScreen] = useState('lobes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const sceneRef = useRef();

  const changeMenuAndTitle = (direction) => {
    let newCurrent = current;
    if (direction === 'left') {
      newCurrent = current === 1 ? 3 : current - 1;
    } else if (direction === 'right') {
      newCurrent = current === 3 ? 1 : current + 1;
    }
    setCurrent(newCurrent);
    if (newCurrent === 1) setCurrentScreen('lobes');
    else if (newCurrent === 2) setCurrentScreen('sections');
    else if (newCurrent === 3) setCurrentScreen('anumb');
  };

  const handleModelChange = (newModel) => {
    setCurrentModel(newModel);
  };

  const cleanLayout = () => {
    if (sceneRef.current && typeof sceneRef.current.cleanLayout === 'function') {
      sceneRef.current.cleanLayout(currentScreen);
    }
  };

  return (
    // outer container può restare h-screen se vuoi occupare tutta la viewport
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {isLoading && <Loader isLoading={isLoading} />}

      {/* Advertise - left as overlay */}
      <Advertise />

      {/* Layout: column on mobile, row on md+.
          h-full per far sì che i figli usino lo spazio disponibile.
      */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Desktop sidebar: hidden on mobile */}
        <div className="hidden md:block">
          <MenusAndTitles
            current={current}
            currentModel={currentModel}
            currentScreen={currentScreen}
            sceneRef={sceneRef}
            setSelectedNumber={setSelectedNumber}
          />
        </div>

        {/* MAIN - Three.js scene container */}
        {/* NOTE: non usare h-screen qui: lascia che il wrapper figlio decida l'altezza.
                 min-h-0 è importante per far funzionare correttamente l'overflow dei figli in flex containers */}
        <main className="w-full flex-1 flex items-center justify-center p-0 min-h-0">
          {/* Wrapper della scena:
              - w-full per aderire al contenitore (evitiamo w-screen)
              - h-[60vh] su mobile (regolabile), md:h-screen su desktop
              - overflow-hidden così il canvas non scrolla fuori
          */}
          <div className="w-full md:w-full max-w-none h-[60vh] md:h-screen rounded-none md:rounded-xl overflow-hidden shadow-sm bg-white">
            {/* ThreeScene deve adattarsi al parent (canvas style width/height 100%).
                Se ThreeScene usa window.innerWidth/depth cambialo con ResizeObserver. */}
            <ThreeScene
              ref={sceneRef}
              currentModel={currentModel}
              setCurrentModel={setCurrentModel}
              setIsLoading={setIsLoading}
              currentScreen={currentScreen}
            />
          </div>
        </main>

        {/* Desktop info panel: hidden on mobile */}
        <div className="hidden md:block">
          <InfoContainer selectedNumber={selectedNumber} />
        </div>

      </div>

      {/* Mobile: menu slide-over (full width) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40">
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-lg p-4">
            <MenusAndTitles
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              current={current}
              currentModel={currentModel}
              currentScreen={currentScreen}
              sceneRef={sceneRef}
              setSelectedNumber={setSelectedNumber}
            />
          </div>
        </div>
      )}

      {/* Mobile: centered info card at bottom (visible only on small screens) */}
      {/* usa w-full per coerenza e px per margine interno */}
      <div className="md:hidden fixed left-0 right-0 bottom-0 w-full px-4">
        <InfoContainer selectedNumber={selectedNumber} />
      </div>

      {/* Optional menu toggle (mobile) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <MenuToggle open={isMenuOpen} setOpen={setIsMenuOpen} />
      </div>
    </div>
  );
}

export default App;