import React, { useState } from 'react';
import { categories, papers, yearSpots, getPercentageForYear } from './data';
import { computeLayout } from './layoutEngine';
import Tooltip from './components/Tooltip';
import './index.css';

/** Vertical pixel distance from dot center to the near edge of each label slot */
const SLOT_GAP = {
  'above': 12, 'above-high': 46, 'above-highest': 80,
  'below': 12, 'below-low': 46, 'below-lowest': 80,
};

const formatAPA = (authors, year) => {
  const list = authors.split('; ');
  const lastNames = list.map(a => a.split(', ')[0]);
  const authorStr =
    lastNames.length === 1 ? lastNames[0] :
    lastNames.length === 2 ? `${lastNames[0]} & ${lastNames[1]}` :
    `${lastNames[0]} et al.`;
  return `${authorStr}, ${Math.floor(year)}`;
};

// Compute collision-free layouts for every category once (data is static)
const categoryLayouts = Object.fromEntries(
  categories.map(cat => [
    cat.id,
    computeLayout(papers.filter(p => p.category === cat.id), getPercentageForYear),
  ])
);

function App() {
  const [activePaper, setActivePaper] = useState(null);

  const handleCircleClick = (e, paper) => {
    e.stopPropagation();
    setActivePaper(prev => prev?.id === paper.id ? null : paper);
  };

  return (
    <div className="app" onClick={() => setActivePaper(null)}>
      <nav className="navbar">
        <div className="brand">Atmosphere</div>
        <div className="nav-links">
          <a href="#" className="active">Timeline</a>
          <a href="#">Papers</a>
          <a href="#">About</a>
        </div>
      </nav>


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

        {/* Categories (Tracks) */}
        <div className="class-group">
          <div className="class-rows">
            {categories.map((cat) => {
              const categoryPapers = papers.filter(p => p.category === cat.id);
              const { placements, rowHeight, centerOffset } = categoryLayouts[cat.id];

              return (
                <div
                  key={cat.id}
                  className="timeline-row"
                  style={{ backgroundColor: cat.bgColor, minHeight: rowHeight, '--row-center': `${centerOffset}px` }}
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

                    {yearSpots.map(spot => (
                      <div
                        key={`grid-${spot.year}`}
                        className="grid-line"
                        style={{ left: `${spot.pos}%` }}
                      ></div>
                    ))}

                    {categoryPapers.map((paper) => {
                      const leftPos = getPercentageForYear(paper.year);
                      const { position, labelOffset } = placements[paper.id] ?? { position: 'above', labelOffset: 0 };

                      return (
                        <div
                          key={paper.id}
                          className={`paper-node${activePaper?.id === paper.id ? ' active' : ''}`}
                          style={{ left: `${leftPos}%` }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div
                            className={`node-label ${position}`}
                            style={{ '--label-offset': `${labelOffset}px` }}
                          >
                            <div className="paper-title">
                              {paper.title}
                            </div>
                            <div className="paper-venue">{formatAPA(paper.authors, paper.year)}</div>
                          </div>
                          {Math.abs(labelOffset) > 20 && (
                            <svg className="label-connector">
                              <line
                                x1={0} y1={0}
                                x2={labelOffset}
                                y2={position.startsWith('above')
                                  ? -(SLOT_GAP[position] ?? 12)
                                  : (SLOT_GAP[position] ?? 12)}
                              />
                            </svg>
                          )}
                          {activePaper?.id === paper.id && (
                            <Tooltip paper={paper} direction="below" />
                          )}
                          <div
                            className="node-circle"
                            onClick={(e) => handleCircleClick(e, paper)}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
