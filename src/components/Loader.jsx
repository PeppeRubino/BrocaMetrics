// File: src/components/Loader.jsx
// Updated with ringCircle and span.

import React from 'react';

const Loader = ({ isLoading }) => {
  return (
    <section
      id="loader"
      className={`loader w-full h-full fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 transition-opacity duration-300 ${
        isLoading ? 'opacity-100 flex' : 'opacity-0 hidden'
      } md:flex lg:flex`}
      style={{ opacity: isLoading ? 0.99 : 0 }}
    >
      <div className="ringCircle"></div>
      <span>loading...</span>
    </section>
  );
};

export default Loader;