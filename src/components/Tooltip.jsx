import React from 'react';
import './Tooltip.css';

const Tooltip = ({ paper }) => {
    if (!paper) return null;

    return (
        <div className="tooltip-container">
            <div className="tooltip-title">{paper.title}</div>
            <div className="tooltip-authors">{paper.authors}</div>
            <div className="tooltip-meta">
                {Math.floor(paper.year)} &middot; {paper.venue}
            </div>
        </div>
    );
};

export default Tooltip;
