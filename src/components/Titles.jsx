// File: src/components/Titles.jsx
// New component for titles.

import React from 'react';

const Titles = ({ current }) => {
  return (
    <div id="titles">
      <div id="lobesTitle" className={`titles ${current === 1 ? 'block' : 'hidden'}`}>Lobi</div>
      <div id="sectionPlaneTitle" className={`titles ${current === 2 ? 'block' : 'hidden'} text-l`}>Sezioni</div>
      <div id="aNumbTitle" className={`titles ${current === 3 ? 'block' : 'hidden'} text-l`}>Aree di Broadmann</div>
    </div>
  );
};

export default Titles;