import { useState } from 'react';
import { motion } from 'framer-motion';

const ComparisonSlider = ({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging && e.type !== 'click') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onClick={handleMove}
    >
      {/* Before Image (Right side) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100">
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="text-4xl mb-4">😰</div>
          <div className="text-2xl font-bold text-red-700 mb-2">{beforeLabel}</div>
          {beforeImage}
        </div>
      </div>

      {/* After Image (Left side) - clips based on slider position */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="text-4xl mb-4">🎉</div>
          <div className="text-2xl font-bold text-gator-green-dark mb-2">{afterLabel}</div>
          {afterImage}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-4 border-gator-green-dark flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 19l7-7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {afterLabel}
      </div>
      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {beforeLabel}
      </div>
    </div>
  );
};

export default ComparisonSlider;
