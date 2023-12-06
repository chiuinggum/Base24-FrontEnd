import React, { useState } from 'react';

export default function AdjustableContainer() {
  const [containerWidth, setContainerWidth] = useState(300);
  const [containerHeight, setContainerHeight] = useState(300);

  const sensitivityFactor = 0.1; // Adjust this value to control sensitivity

  const handleMouseDown = (e) => {
    e.preventDefault();
    const { pageX, pageY } = e;

    const handleMouseMove = (e) => {
      const deltaX = (e.pageX - pageX) * sensitivityFactor;
      const deltaY = (e.pageY - pageY) * sensitivityFactor;

      setContainerWidth((prevWidth) => Math.max(100, prevWidth + deltaX));
      setContainerHeight((prevHeight) => Math.max(100, prevHeight + deltaY));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        border: '1px solid black',
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* <input
        type="range"
        min="100"
        max="1000"
        value={containerWidth}
        onChange={(e) => setContainerWidth(e.target.value)}
        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
      />
      <input
        type="range"
        min="100"
        max="1000"
        value={containerHeight}
        onChange={(e) => setContainerHeight(e.target.value)}
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%) rotate(90deg)' }}
      /> */}
    </div>
  );
}
