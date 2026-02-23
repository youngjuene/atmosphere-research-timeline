import React from 'react';
import './Tooltip.css';

const Tooltip = ({ paper, direction = 'above' }) => {
    if (!paper) return null;

    return (
        <div className={`tooltip-container${direction === 'below' ? ' below' : ''}`}>
            <div className="tooltip-title">{paper.fullTitle || paper.title}</div>
            <div className="tooltip-authors">{paper.authors}</div>
            <div className="tooltip-meta">
                <span>{Math.floor(paper.year)} &middot; {paper.venue} ({paper.venueType})</span>
                <span className="tooltip-citations">{paper.citations > 0 ? `${paper.citations.toLocaleString()} citations` : ''}</span>
            </div>
            {paper.respondsTo && (
                <div className="tooltip-responds-to">
                    <strong>Key Theme:</strong> {paper.respondsTo}
                </div>
            )}
            {paper.url && (
                <div className="tooltip-url">
                    <a href={paper.url} target="_blank" rel="noreferrer" style={{ color: '#90c2ff', textDecoration: 'none' }}>View Source</a>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
