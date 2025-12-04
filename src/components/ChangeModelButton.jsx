import React from 'react';

const ChangeModelButton = ({ currentModel, setCurrentModel, onModelChange }) => {
  const handleChange = () => {
  const base = Number.isFinite(Number(currentModel)) ? Number(currentModel) : 1;
  const nextModel = ((base % 3) + 1); // 1->2, 2->3, 3->1, 4->2 etc. (wrap every 3)
  if (typeof setCurrentModel === 'function') setCurrentModel(nextModel);
  if (typeof onModelChange === 'function') onModelChange(nextModel);
};


  return (
    <div className="relative flex justify-center items-center">
      <button
        onClick={handleChange}
        title="Change Model"
        aria-label="Change Model"
        className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center hover:bg-white/90 transition"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6a6 6 0 0 1-6-6H4a8 8 0 0 0 8 8c4.42 0 8-3.58 8-8s-3.58-8-8-8z" />
        </svg>
      </button>
    </div>
  );
};

export default ChangeModelButton;
