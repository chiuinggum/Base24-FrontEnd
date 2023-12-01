// can resize and move the container
// the value it moves is weird
// and i can't move the container back if it's moved too far
import Test4 from './Test4';
import React, { useState } from 'react';

export default function AdjustableContainer() {
    const [containerWidth, setContainerWidth] = useState(300);
    const [containerHeight, setContainerHeight] = useState(300);
    const [containerLeft, setContainerLeft] = useState(10);
    const [containerTop, setContainerTop] = useState(10);

    const sensitivityFactor = 0.1;
    // resize
    const handleMouseDown = (e) => {
        e.preventDefault();
        const { offsetX, offsetY } = e.nativeEvent;

        const handleMouseMove = (e) => {
            const deltaX = e.pageX - offsetX;
            const deltaY = e.pageY - offsetY;

            setContainerWidth(Math.max(100, deltaX));
            setContainerHeight(Math.max(100, deltaY));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    // move
    const handleMove = (e) => {
        e.preventDefault();
        const { pageX, pageY } = e;

        const handleMouseMove = (e) => {
            const deltaX = (e.clientX - pageX) * sensitivityFactor;
            const deltaY = (e.clientY - pageY) * sensitivityFactor;

            setContainerLeft((prevLeft) => prevLeft + deltaX);
            setContainerTop((prevTop) => prevTop + deltaY);
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
        position: 'absolute',
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        border: '1px solid black',
        left: containerLeft,
        top: containerTop,
      }}
    >
        {/* resize */}
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
            onMouseDown={handleMouseDown}
        />
        {/* move */}
        <div
            style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: 'red',
            cursor: 'move',
            left: 0,
            top: 0,
            }}
            onMouseDown={handleMove}
        />
        <Test4 />
    </div>
  );
}
