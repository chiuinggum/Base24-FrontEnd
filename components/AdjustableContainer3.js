// have a red square that is supposed to move the container but fail

import React, { useState } from 'react';

export default function AdjustableContainer() {
  const [containerWidth, setContainerWidth] = useState(300);
  const [containerHeight, setContainerHeight] = useState(300);
  const [dragStart, setDragStart] = useState(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setContainerWidth((prevWidth) => Math.max(100, prevWidth + deltaX));
    setContainerHeight((prevHeight) => Math.max(100, prevHeight + deltaY));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragStart(null);
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
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          background: 'blue',
          cursor: 'nwse-resize',
          right: 0,
          bottom: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          background: 'red',
          cursor: 'move',
          right: 0,
          top: 0,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
