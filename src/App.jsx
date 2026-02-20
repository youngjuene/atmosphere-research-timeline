import React, { useState } from 'react';
import { categories, papers, yearSpots, getPercentageForYear } from './data';
import Tooltip from './components/Tooltip';
import './index.css';

function App() {
  const [hoveredPaper, setHoveredPaper] = useState(null);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">Atmosphere</div>
        <div className="nav-links">
          <a href="#" className="active">Timeline</a>
          <a href="#">Papers</a>
          <a href="#">About</a>
        </div>
      </nav>

      <div className="legend-bar">
        <div className="legend-section">
          <div className="legend-title">Timeline Zone</div>
          <div className="legend-items">
            <span><strong>P</strong> Pre-Disciplinary Roots</span>
            <span><strong>Ph</strong> Phenomenological Turn</span>
            <span><strong>F</strong> Field Formation</span>
            <span><strong>M</strong> Methodological Diversification</span>
            <span><strong>C</strong> Computational Frontier</span>
          </div>
        </div>
        <div className="separator" style={{ width: '1px', backgroundColor: '#e2e8f0' }}></div>
        <div className="legend-section">
          <div className="legend-title">Primary Tag</div>
          <div className="legend-items">
            <span><strong>1</strong> Theoretical</span>
            <span><strong>2</strong> Artistic</span>
            <span><strong>3</strong> Practice</span>
            <span><strong>4</strong> Empirical</span>
            <span><strong>5</strong> Methodological</span>
            <span><strong>6</strong> Computational</span>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        {/* Year Headers */}
        <div className="year-header">
          {yearSpots.map((spot) => (
            <div
              key={spot.year}
              className="year-marker"
              style={{ left: `${spot.pos}%` }}
            >
              {spot.label}
            </div>
          ))}
        </div>

        {/* Categories Rows */}
        {categories.map((cat) => {
          const categoryPapers = papers.filter(p => p.category === cat.id);

          return (
            <div
              key={cat.id}
              className="timeline-row"
              style={{ backgroundColor: cat.bgColor }}
            >
              <div
                className="category-label"
                style={{ borderLeft: `6px solid ${cat.borderColor}`, backgroundColor: 'white' }}
              >
                <div className="category-name">{cat.name}</div>
                {cat.subName && <div className="category-subname">{cat.subName}</div>}
              </div>

              <div className="row-content">
                <div className="row-line"></div>

                {/* Vertical grid lines extending down from years */}
                {yearSpots.map(spot => (
                  <div
                    key={`grid-${spot.year}`}
                    className="grid-line"
                    style={{ left: `${spot.pos}%` }}
                  ></div>
                ))}

                {/* Papers */}
                {categoryPapers.map((paper) => {
                  const leftPos = getPercentageForYear(paper.year);
                  return (
                    <div
                      key={paper.id}
                      className="paper-node"
                      style={{ left: `${leftPos}%` }}
                      onMouseEnter={() => setHoveredPaper(paper)}
                      onMouseLeave={() => setHoveredPaper(null)}
                    >
                      <div className={`node-label ${paper.position}`}>
                        <div className="paper-title">
                          {paper.title}
                          {paper.note1 && <span className="paper-note">{paper.note1}</span>}
                          {paper.note2 && <span className="paper-note">{paper.note2}</span>}
                        </div>
                        <div className="paper-venue">{paper.venue}</div>
                      </div>
                      {hoveredPaper?.id === paper.id && <Tooltip paper={paper} />}
                      <div className="node-circle"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
