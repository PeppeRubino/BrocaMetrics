// File: src/components/BroadmannInput.jsx
// Input for Broadmann numbers.
// Place in src/components/BroadmannInput.jsx.

import React, { useState } from 'react';

const BroadmannInput = ({ sceneRef }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === '' || isNaN(input) || parseInt(input) > 52) {
      setError(true);
    } else {
      setError(false);
      const selectedNumber = parseInt(input);
      if (sceneRef.current) {
        sceneRef.current.showPoint(selectedNumber);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-20 flex items-center space-x-2 md:bottom-8 lg:left-8">
      <input
        id="numberBroadmann"
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded md:p-3"
      />
      <button id="sendNumb" onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded md:px-6">
        Send
      </button>
      <span id="error" className={`${error ? 'block' : 'hidden'} text-red-500 md:text-lg`}>
        Invalid
      </span>
    </div>
  );
};

export default BroadmannInput;