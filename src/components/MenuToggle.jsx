import React from 'react';

const MenuToggle = (props) => {
  // supporta entrambi i formati: isMenuOpen/setIsMenuOpen oppure open/setOpen
  const isMenuOpen = typeof props.isMenuOpen !== 'undefined' ? props.isMenuOpen : props.open;
  const setIsMenuOpen = props.setIsMenuOpen || props.setOpen;

  return (
    <button
      id="toggleMenu"
      type="button"
      aria-pressed={!!isMenuOpen}
      aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
      onClick={() => {
        if (typeof setIsMenuOpen === 'function') setIsMenuOpen(v => !v);
        else console.warn('MenuToggle: setIsMenuOpen / setOpen non fornito');
      }}
      className="fixed top-4 right-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 md:top-6 lg:top-8 lg:right-8"
    >
      <svg
        className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {isMenuOpen ? (
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6L18 18" />
            <path d="M6 18L18 6" />
          </g>
        ) : (
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7h18" />
            <path d="M3 12h18" />
            <path d="M3 17h18" />
          </g>
        )}
      </svg>
    </button>
  );
};

export default MenuToggle;
