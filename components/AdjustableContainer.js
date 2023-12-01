import React, { useState } from 'react';

export default function AdjustableContainer() {
    const [containerWidth, setContainerWidth] = useState(300);
    const [containerHeight, setContainerHeight] = useState(300);

    const handleWidthChange = (e) => {
        setContainerWidth(e.target.value);
    }

    const handleHeightChange = (e) => {
        setContainerHeight(e.target.value);
    }

    return (
        <div
            style={{ width: `${containerWidth}px`, height: `${containerHeight}px`,border: '1px solid black' }}
        >
            <input
                type="range"
                min="100"
                max="1000"
                value={containerWidth}
                onChange={handleWidthChange}
            />
            <input
                type="range"
                min="100"
                max="1000"
                value={containerHeight}
                onChange={handleHeightChange}
            />
        </div>
    );
};