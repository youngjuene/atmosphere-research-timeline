export const categories = [
  { id: 'phenomenological', name: 'Phenomenological &', subName: 'Theoretical Discourse', bgColor: '#f1f5fb', borderColor: '#cad5ec' },
  { id: 'aesthetic', name: 'Aesthetic &', subName: 'Artistic Inquiry', bgColor: '#fdf1f2', borderColor: '#f9c5cd' },
  { id: 'architectural', name: 'Architectural &', subName: 'Spatial Practice', bgColor: '#fdf7e8', borderColor: '#f8d298' },
  { id: 'empirical', name: 'Empirical &', subName: 'Computational Methodologies', bgColor: '#f0eef9', borderColor: '#cfc4ed' }
];

export const yearSpots = [
  { year: 1927, label: '27', pos: 5 },
  { year: 1945, label: '45', pos: 15 },
  { year: 1969, label: '69', pos: 25 },
  { year: 1977, label: '77', pos: 35 },
  { year: 1979, label: '79', pos: 45 },
  { year: 1995, label: '95', pos: 55 },
  { year: 1996, label: '96', pos: 60 },
  { year: 2002, label: '02', pos: 68 },
  { year: 2006, label: '06', pos: 76 },
  { year: 2014, label: '14', pos: 85 },
  { year: 2018, label: '18', pos: 90 },
  { year: 2024, label: '24', pos: 96 }
];

// Mapping legends
const zoneToNotePrimary = {
  'pre-disciplinary': 'P',
  'phenomenological': 'Ph',
  'field-formation': 'F',
  'diversification': 'D',
  'frontier': 'Fr'
};

const tagPrimaryToNum = {
  'theoretical': '1',
  'artistic': '2',
  'empirical': '3',
  'design-practice': '4',
  'computational': '5'
};

export const papers = [
  // Phenomenological & Theoretical Discourse
  { id: 'HEIDEGGER1927', title: 'Being and Time', fullTitle: 'Sein und Zeit', authors: 'Heidegger, Martin', venue: 'Niemeyer', venueType: 'book', url: '', citations: 10000, respondsTo: 'Addresses lack of ontological analysis of everyday being-in-the-world.', category: 'phenomenological', year: 1927, position: 'above', note1: 'P', note2: '1' },
  { id: 'MERLEAUPONTY1945', title: 'Phenomenology of Perception', fullTitle: 'Phénoménologie de la perception', authors: 'Merleau-Ponty, Maurice', venue: 'Gallimard', venueType: 'book', url: '', citations: 5000, respondsTo: 'Introduces embodied perception beyond pure sensation.', category: 'phenomenological', year: 1945, position: 'below', note1: 'P', note2: '1' },
  { id: 'SCHMITZ1969', title: 'Der Gefühlsraum', fullTitle: 'System der Philosophie, Band 3: Der Gefühlsraum', authors: 'Schmitz, Hermann', venue: 'Bouvier', venueType: 'book', url: '', citations: 50, respondsTo: 'Introduces atmosphere as spatial emotion.', category: 'phenomenological', year: 1969, position: 'above', note1: 'Ph', note2: '1' },
  { id: 'BOHME1995', title: 'Atmosphere Concept', fullTitle: 'Atmosphere as the fundamental concept of a new aesthetics', authors: 'Böhme, Gernot', venue: 'Thesis Eleven', venueType: 'journal', url: '', citations: 300, respondsTo: 'Reframes atmosphere as aesthetic category.', category: 'phenomenological', year: 1995, position: 'below', note1: 'F', note2: '1' },

  // Aesthetic & Artistic Inquiry
  { id: 'SCHAFER1977', title: 'The Soundscape', fullTitle: 'The Soundscape: Our Sonic Environment and the Tuning of the World', authors: 'Schafer, R. Murray', venue: 'Knopf', venueType: 'book', url: '', citations: 500, respondsTo: 'Addresses absence of awareness of acoustic environment.', category: 'aesthetic', year: 1977, position: 'above', note1: 'Ph', note2: '2' },

  // Architectural & Spatial Practice
  { id: 'PALLASMAA1996', title: 'Eyes of the Skin', fullTitle: 'The Eyes of the Skin: Architecture and the Senses', authors: 'Pallasmaa, Juhani', venue: 'Wiley', venueType: 'book', url: '', citations: 300, respondsTo: 'Critiques visual dominance.', category: 'architectural', year: 1996, position: 'above', note1: 'F', note2: '4' },
  { id: 'ZUMTHOR2006', title: 'Atmospheres', fullTitle: 'Atmospheres: Architectural Environments – Surrounding Objects', authors: 'Zumthor, Peter', venue: 'Birkhäuser', venueType: 'book', url: '', citations: 200, respondsTo: 'Explores sensory architecture.', category: 'architectural', year: 2006, position: 'below', note1: 'F', note2: '4' },

  // Empirical & Computational Methodologies
  { id: 'GIBSON1979', title: 'Ecological Approach', fullTitle: 'The Ecological Approach to Visual Perception', authors: 'Gibson, James J.', venue: 'Houghton Mifflin', venueType: 'book', url: '', citations: 1000, respondsTo: 'Introduces affordance theory.', category: 'empirical', year: 1979, position: 'above', note1: 'Ph', note2: '3' },
  { id: 'THIBAUD2002', title: 'Urban Ambiances', fullTitle: 'L\'horizon des ambiances urbaines', authors: 'Thibaud, Jean-Paul', venue: 'Communications', venueType: 'journal', url: 'https://doi.org/10.3406/comm.2002.2119', citations: 55, respondsTo: 'Defines urban ambiance research.', category: 'empirical', year: 2002, position: 'below', note1: 'F', note2: '3' },
  { id: 'ISO12913_1', title: 'ISO 12913-1', fullTitle: 'Acoustics — Soundscape — Part 1', authors: 'ISO', venue: 'ISO', venueType: 'standard', url: 'https://www.iso.org/standard/61478.html', citations: 0, respondsTo: 'Standardizes soundscape definition.', category: 'empirical', year: 2014, position: 'above', note1: 'D', note2: '3' },
  { id: 'ISO12913_2', title: 'ISO 12913-2', fullTitle: 'Acoustics — Soundscape — Part 2', authors: 'ISO', venue: 'ISO', venueType: 'standard', url: 'https://www.iso.org/standard/75267.html', citations: 0, respondsTo: 'Defines soundscape data collection.', category: 'empirical', year: 2018, position: 'above', note1: 'D', note2: '3' },
  { id: 'ISO12913_3', title: 'ISO 12913-3', fullTitle: 'Acoustics — Soundscape — Part 3', authors: 'ISO', venue: 'ISO', venueType: 'standard', url: 'https://www.iso.org/standard/69864.html', citations: 0, respondsTo: 'Defines soundscape analysis.', category: 'empirical', year: 2019, position: 'below', note1: 'D', note2: '3' },
  { id: 'EMVOLIADIS2024', title: 'Multimodal Sensing', fullTitle: 'Multimodal Environmental Sensing Using AI', authors: 'Emvoliadis, A. et al.', venue: 'Sensors', venueType: 'journal', url: 'https://doi.org/10.3390/s24092755', citations: 0, respondsTo: 'Applies AI to environmental sensing.', category: 'empirical', year: 2024, position: 'above', note1: 'Fr', note2: '5' }
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
