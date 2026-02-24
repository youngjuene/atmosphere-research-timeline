import jsonRaw from '../atmosphere_timeline_dataset.json';

export const BROAD_TRACKS = [
  { id: 'Philosophy',    label: 'Philosophy',    subTracks: ['Aesthetics', 'Phenomenology', 'Spatial Theory'] },
  { id: 'Urban Studies', label: 'Urban Studies', subTracks: ['Spatial Theory', 'Sensory Studies', 'Environmental Psychology', 'Cultural Studies'] },
  { id: 'Architecture',  label: 'Architecture',  subTracks: ['Architectural Theory', 'Spatial Theory', 'Cultural Studies'] },
  { id: 'Computation',   label: 'Computation',   subTracks: ['Urban Systems'] },
];

export const SUB_TRACK_COLORS = {
  'Aesthetics':               { bg: '#ede0f8', line: '#a880d8', dot: '#7848c0' },
  'Phenomenology':            { bg: '#dce8f8', line: '#70a8e0', dot: '#3878c0' },
  'Spatial Theory':           { bg: '#d4f0ea', line: '#50b8a0', dot: '#1a8870' },
  'Sensory Studies':          { bg: '#fde0d0', line: '#e89870', dot: '#c85830' },
  'Environmental Psychology': { bg: '#d8f0d4', line: '#68c068', dot: '#288038' },
  'Cultural Studies':         { bg: '#f8f0c8', line: '#d8b030', dot: '#a07800' },
  'Architectural Theory':     { bg: '#fad8e8', line: '#e080b0', dot: '#b83870' },
  'Urban Systems':            { bg: '#e4d8f8', line: '#9068d0', dot: '#5828b0' },
};

export const yearSpots = [
  { year: 1849, label: '1849', pos: 1 },
  { year: 1927, label: '1927', pos: 4 },
  { year: 1945, label: '1945', pos: 10 },
  { year: 1959, label: '1959', pos: 15 },
  { year: 1969, label: '1969', pos: 19 },
  { year: 1977, label: '1977', pos: 27 },
  { year: 1995, label: '1995', pos: 38 },
  { year: 2004, label: '2004', pos: 48 },
  { year: 2009, label: '2009', pos: 56 },
  { year: 2014, label: '2014', pos: 68 },
  { year: 2018, label: '2018', pos: 84 },
  { year: 2025, label: '2025', pos: 96 },
];

export const getPercentageForYear = (year) => {
  if (year <= yearSpots[0].year) return yearSpots[0].pos;
  if (year >= yearSpots[yearSpots.length - 1].year) return yearSpots[yearSpots.length - 1].pos;
  for (let i = 0; i < yearSpots.length - 1; i++) {
    const min = yearSpots[i];
    const max = yearSpots[i + 1];
    if (year >= min.year && year <= max.year) {
      const ratio = (year - min.year) / (max.year - min.year);
      return min.pos + ratio * (max.pos - min.pos);
    }
  }
  return 0;
};

// Add small decimal offsets to papers sharing the same year within the same
// sub-track band so their dots don't render on identical pixel positions.
function computeYearOffsets(records) {
  const groups = {};
  records.forEach(p => {
    const key = `${p.broad_track}::${p.sub_track}::${p.year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p.work_id);
  });
  const offsets = {};
  Object.values(groups).forEach(ids => {
    ids.forEach((id, i) => { offsets[id] = i * 0.3; });
  });
  return offsets;
}

const yearOffsets = computeYearOffsets(jsonRaw);

export const papers = jsonRaw.map(p => ({
  id:          p.work_id,
  broad_track: p.broad_track,
  sub_track:   p.sub_track,
  title:       p.short_title,
  fullTitle:   p.full_title,
  authors:     p.authors,
  venue:       p.venue,
  venueType:   p.venue_type,
  url:         p.doi_or_url,
  citations:   0,
  respondsTo:  p.responds_to,
  year:        p.year + (yearOffsets[p.work_id] ?? 0),
}));
