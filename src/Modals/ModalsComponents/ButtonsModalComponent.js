import React from 'react';

// Depth is used to know if there are sub-buttons
export const setButtons = (title, arrayLength, selectedTab, handler) => {
    return (
        <button
            key={title + 'HowToUse'}
            className={`col-${Math.round(12 / arrayLength)} btn btn-outline-warning mb-1 mt-1 px-0 ${selectedTab === title ? 'btn-success' : ''}`}
            onClick={handler}>
            {title}
        </button>

    )
}