import React, { useState } from 'react';
import { BROAD_TRACKS, SUB_TRACK_COLORS, papers, yearSpots, getPercentageForYear } from './data';
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

// Compute collision-free layouts for every (broad_track × sub_track) pair
const subTrackLayouts = {};
BROAD_TRACKS.forEach(bt => {
  bt.subTracks.forEach(st => {
    const key = `${bt.id}::${st}`;
    const stPapers = papers.filter(p => p.broad_track === bt.id && p.sub_track === st);
    if (stPapers.length > 0) {
      subTrackLayouts[key] = computeLayout(stPapers, getPercentageForYear);
    }
  });
});

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

        {/* Broad Track Groups */}
        {BROAD_TRACKS.map((broadTrack) => (
          <div key={broadTrack.id} className="class-group">
            <div className="class-label">{broadTrack.label}</div>
            <div className="class-rows">
              {broadTrack.subTracks.map((subTrackName) => {
                const key = `${broadTrack.id}::${subTrackName}`;
                const layout = subTrackLayouts[key];
                if (!layout) return null;

                const { placements, rowHeight, centerOffset } = layout;
                const colors = SUB_TRACK_COLORS[subTrackName];
                const subPapers = papers.filter(
                  p => p.broad_track === broadTrack.id && p.sub_track === subTrackName
                );

                return (
                  <div
                    key={subTrackName}
                    className="timeline-row"
                    style={{
                      backgroundColor: colors.bg,
                      minHeight: rowHeight,
                      '--row-center': `${centerOffset}px`,
                      '--dot-color': colors.dot,
                      '--line-color': colors.line,
                    }}
                  >
                    <div
                      className="category-label"
                      style={{ borderLeft: `5px solid ${colors.line}`, backgroundColor: 'white' }}
                    >
                      <div className="category-name">{subTrackName}</div>
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

                      {subPapers.map((paper) => {
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
                              <div className="paper-title">{paper.title}</div>
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
        ))}
      </div>
    </div>
  );
}

export default App;
