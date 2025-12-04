// File: src/components/Advertise.jsx
// New component for advertise.

import React from 'react';

const Advertise = () => {
  return (
    <section id="advertise">
      <div className="advertiseOne z-55 w-full p-4 hidden md:flex justify-center absolute bottom-10 select-none">
        <p className="text-gray-400">The 3D viewer is not 100% accurate and needs to be accompanied by a neuroscience book to be understood.</p>
      </div>
    </section>
  );
};

export default Advertise;