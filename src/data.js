export const categories = [
  { id: 'philosophical', name: 'Philosophical &', subName: 'Theoretical Foundations', bgColor: '#f1f5fb', borderColor: '#cad5ec' },
  { id: 'aesthetic', name: 'Aesthetic &', subName: 'Artistic Practice', bgColor: '#fdf1f2', borderColor: '#f9c5cd' },
  { id: 'architectural', name: 'Architectural &', subName: 'Design Practice', bgColor: '#fdf7e8', borderColor: '#f8d298' },
  { id: 'empirical', name: 'Empirical &', subName: 'Field Methods', bgColor: '#f0eef9', borderColor: '#cfc4ed' },
  { id: 'computational', name: 'Computational &', subName: 'Data-Driven Methods', bgColor: '#f1f8f1', borderColor: '#c4e0c4' }
];

export const yearSpots = [
  { year: 1927, label: '27', pos: 5 },
  { year: 1934, label: '34', pos: 10 },
  { year: 1945, label: '45', pos: 15 },
  { year: 1959, label: '59', pos: 20 },
  { year: 1969, label: '69', pos: 25 },
  { year: 1977, label: '77', pos: 35 },
  { year: 1995, label: '95', pos: 45 },
  { year: 2004, label: '04', pos: 55 },
  { year: 2009, label: '09', pos: 65 },
  { year: 2014, label: '14', pos: 75 },
  { year: 2018, label: '18', pos: 85 },
  { year: 2025, label: '25', pos: 96 }
];

// Mapping legends
const zoneToNotePrimary = {
  'Pre-Disciplinary Roots': 'P',
  'Phenomenological Turn': 'Ph',
  'Field Formation': 'F',
  'Methodological Diversification': 'M',
  'Computational Frontier': 'C'
};

const tagPrimaryToNum = {
  'theoretical': '1',
  'artistic': '2',
  'practice': '3',
  'empirical': '4',
  'methodological': '5',
  'computational': '6'
};

export const papers = [
  // Philosophical & Theoretical Foundations
  { id: 'HEIDEGGER1927', title: 'Being and Time', fullTitle: 'Sein und Zeit', authors: 'Heidegger, Martin', venue: 'Niemeyer', venueType: 'book', url: '', citations: 10000, respondsTo: 'Addresses lack of ontological analysis of everyday being-in-the-world.', category: 'philosophical', year: 1927, position: 'above', note1: 'P', note2: '1' },
  { id: 'MEAD1934', title: 'Mind, Self & Society', fullTitle: 'Mind, Self and Society from the Standpoint of a Social Behaviorist', authors: 'Mead, George Herbert', venue: 'Chicago Press', venueType: 'book', url: 'https://doi.org/10.7208/chicago/9780226112879.001.0001', citations: 5000, respondsTo: 'Articulates the social and intersubjective basis of subjective experience including atmospheric mood.', category: 'philosophical', year: 1934, position: 'below', note1: 'P', note2: '1' },
  { id: 'MERLEAUPONTY1945', title: 'Phenomenology of Perception', fullTitle: 'Phénoménologie de la perception', authors: 'Merleau-Ponty, Maurice', venue: 'Gallimard', venueType: 'book', url: '', citations: 5000, respondsTo: 'Introduces embodied perception beyond pure sensation.', category: 'philosophical', year: 1945, position: 'above-high', note1: 'P', note2: '1' },
  { id: 'JASPERS1959', title: 'General Psychopathology', fullTitle: 'General Psychopathology', authors: 'Jaspers, Karl', venue: 'Springer', venueType: 'book', url: '', citations: 500, respondsTo: 'Documents Binswanger\'s concept of affectively-colored space (Stimmungsraum) as a clinical phenomenon.', category: 'philosophical', year: 1959, position: 'below-low', note1: 'P', note2: '1' },
  { id: 'BAUDRILLARD1968', title: 'System of Objects', fullTitle: 'Le Système des Objets', authors: 'Baudrillard, Jean', venue: 'Gallimard', venueType: 'book', url: '', citations: 3000, respondsTo: 'Theorizes interior atmosphere as a function of object-signs and consumer culture rather than pure sensory perception.', category: 'philosophical', year: 1968, position: 'above', note1: 'Ph', note2: '1' },
  { id: 'SCHMITZ1969', title: 'Der Gefühlsraum', fullTitle: 'System der Philosophie, Band 3: Der Gefühlsraum', authors: 'Schmitz, Hermann', venue: 'Bouvier', venueType: 'book', url: '', citations: 50, respondsTo: 'Introduces atmosphere as spatial emotion.', category: 'philosophical', year: 1969, position: 'below', note1: 'Ph', note2: '1' },
  { id: 'BOHME1995', title: 'Atmosphere Concept', fullTitle: 'Atmosphere as the fundamental concept of a new aesthetics', authors: 'Böhme, Gernot', venue: 'Thesis Eleven', venueType: 'journal', url: '', citations: 300, respondsTo: 'Reframes atmosphere as aesthetic category.', category: 'philosophical', year: 1995, position: 'above', note1: 'F', note2: '1' },
  { id: 'CONNOR2004', title: 'Building Breathing Space', fullTitle: 'Building Breathing Space', authors: 'Connor, Steven', venue: 'Going Ariel', venueType: 'book-chapter', url: 'http://www.bbk.ac.uk/english/skc/bbs/', citations: 50, respondsTo: 'Frames air, sound, heat, and odour as primary agitators of architectural atmosphere.', category: 'philosophical', year: 2004, position: 'below-lowest', note1: 'F', note2: '1' },
  { id: 'BOHME2005', title: 'Subject Matter', fullTitle: 'Atmosphere as the Subject Matter of Architecture', authors: 'Böhme, Gernot', venue: 'Herzog & de Meuron', venueType: 'book-chapter', url: '', citations: 100, respondsTo: 'Applies new aesthetics framework directly to architecture.', category: 'philosophical', year: 2005, position: 'above-high', note1: 'F', note2: '1' },
  { id: 'MCCORMACK2008', title: 'Engineering Atm.', fullTitle: 'Engineering affective atmospheres on the moving geographies', authors: 'McCormack, Derek P.', venue: 'Cultural Geographies', venueType: 'journal', url: 'https://doi.org/10.1177/1474474008094314', citations: 273, respondsTo: 'Addresses gap between meteorological and affective senses of atmosphere.', category: 'philosophical', year: 2008, position: 'below-low', note1: 'F', note2: '1' },
  { id: 'ANDERSON2009', title: 'Affective Atm.', fullTitle: 'Affective atmospheres', authors: 'Anderson, Ben', venue: 'Emotion, Space & Society', venueType: 'journal', url: 'https://doi.org/10.1016/j.emospa.2009.08.005', citations: 1237, respondsTo: 'Bridges Böhme\'s aesthetic atmosphere with Anglo-American affect theory.', category: 'philosophical', year: 2009, position: 'above-highest', note1: 'F', note2: '1' },
  { id: 'GRIFFERO2014', title: 'Atmo Aesthetics', fullTitle: 'Atmospheres: Aesthetics of Emotional Spaces', authors: 'Griffero, Tonino', venue: 'Ashgate', venueType: 'book', url: '', citations: 150, respondsTo: 'Provides systematic ontological and phenomenological account.', category: 'philosophical', year: 2014, position: 'below', note1: 'M', note2: '1' },
  { id: 'SCHMITZ2016', title: 'Atmospheric Spaces', fullTitle: 'Atmospheric Spaces', authors: 'Schmitz, Hermann', venue: 'Ambiances', venueType: 'journal', url: 'https://journals.openedition.org/ambiances/711', citations: 80, respondsTo: 'Provides first accessible English-language articulation of Schmitz\'s core theory.', category: 'philosophical', year: 2015.8, position: 'above', note1: 'M', note2: '1' },
  { id: 'GRIFFERO2016', title: 'Quasi-Things', fullTitle: 'Quasi-Things: The Paradigm of Atmospheres', authors: 'Griffero, Tonino', venue: 'SUNY Press', venueType: 'book', url: '', citations: 36, respondsTo: 'Introduces quasi-things to account for non-object atmospheric phenomena.', category: 'philosophical', year: 2016.2, position: 'below-lowest', note1: 'M', note2: '1' },
  { id: 'GANDY2017', title: 'Urban Atmospheres', fullTitle: 'Urban atmospheres', authors: 'Gandy, Matthew', venue: 'Cultural Geographies', venueType: 'journal', url: 'https://doi.org/10.1177/1474474017712995', citations: 114, respondsTo: 'Addresses absence of political and materialist critique.', category: 'philosophical', year: 2016.8, position: 'above-high', note1: 'M', note2: '1' },
  { id: 'BOHME2017', title: 'Atmo Architectures', fullTitle: 'Atmospheric Architectures: The Aesthetics of Felt Spaces', authors: 'Böhme, Gernot', venue: 'Bloomsbury', venueType: 'book', url: '', citations: 200, respondsTo: 'Synthesizes decades of work into comprehensive English volume.', category: 'philosophical', year: 2017.2, position: 'below-low', note1: 'M', note2: '1' },
  { id: 'TRIGG2021', title: 'Shared Emotions', fullTitle: 'Atmospheres and Shared Emotions', authors: 'Trigg, Dylan', venue: 'Routledge', venueType: 'book', url: '', citations: 55, respondsTo: 'Addresses collective and intersubjective emotional experience.', category: 'philosophical', year: 2021, position: 'above-highest', note1: 'C', note2: '1' },
  { id: 'GARCIA2023', title: 'Enactive-Ecological', fullTitle: 'Affective Atmospheres and the Enactive-ecological Framework', authors: 'García, Enara', venue: 'Philosophical Psychology', venueType: 'journal', url: 'https://doi.org/10.1080/09515089.2023.2229350', citations: 20, respondsTo: 'Integrates enactivist cognitive science with ecological psychology.', category: 'philosophical', year: 2023, position: 'below', note1: 'C', note2: '1' },
  { id: 'FERNANDEZVELASCO2025', title: 'What are atm?', fullTitle: 'What are atmospheres?', authors: 'Fernandez Velasco, Pablo; Niikawa, Takuya', venue: 'Philosophical Q.', venueType: 'journal', url: 'https://doi.org/10.1093/pq/pqaf024', citations: 0, respondsTo: 'Challenges affordance-based atmosphere theories.', category: 'philosophical', year: 2025, position: 'above', note1: 'C', note2: '1' },

  // Aesthetic & Artistic Practice
  { id: 'TANIZAKI1933', title: 'In Praise of Shadows', fullTitle: 'In\'ei Raisan (In Praise of Shadows)', authors: 'Tanizaki, Junichiro', venue: 'Leete\'s Island Books', venueType: 'book', url: '', citations: 300, respondsTo: 'Addresses absence of poetic-aesthetic language for shadow and spatial mood.', category: 'aesthetic', year: 1933, position: 'above', note1: 'P', note2: '2' },
  { id: 'SCHAFER1977', title: 'The Soundscape', fullTitle: 'The Soundscape: Our Sonic Environment and the Tuning of the World', authors: 'Schafer, R. Murray', venue: 'Knopf', venueType: 'book', url: '', citations: 500, respondsTo: 'Addresses absence of awareness of acoustic environment.', category: 'aesthetic', year: 1977, position: 'below', note1: 'Ph', note2: '2' },

  // Architectural & Design Practice
  { id: 'PALLASMAA1996', title: 'Eyes of the Skin', fullTitle: 'The Eyes of the Skin: Architecture and the Senses', authors: 'Pallasmaa, Juhani', venue: 'Wiley', venueType: 'book', url: '', citations: 300, respondsTo: 'Critiques visual dominance.', category: 'architectural', year: 1996, position: 'above', note1: 'F', note2: '3' },
  { id: 'ZUMTHOR2006', title: 'Atmospheres', fullTitle: 'Atmospheres: Architectural Environments – Surrounding Objects', authors: 'Zumthor, Peter', venue: 'Birkhäuser', venueType: 'book', url: '', citations: 200, respondsTo: 'Explores sensory architecture.', category: 'architectural', year: 2006, position: 'below', note1: 'F', note2: '3' },

  // Empirical & Field Methods
  { id: 'GIBSON1979', title: 'Ecological Approach', fullTitle: 'The Ecological Approach to Visual Perception', authors: 'Gibson, James J.', venue: 'Houghton Mifflin', venueType: 'book', url: '', citations: 1000, respondsTo: 'Introduces affordance theory.', category: 'empirical', year: 1979, position: 'above', note1: 'Ph', note2: '4' },
  { id: 'THIBAUD2002', title: 'Urban Ambiances', fullTitle: 'L\'horizon des ambiances urbaines', authors: 'Thibaud, Jean-Paul', venue: 'Communications', venueType: 'journal', url: 'https://doi.org/10.3406/comm.2002.2119', citations: 55, respondsTo: 'Defines urban ambiance research.', category: 'empirical', year: 2002, position: 'below', note1: 'F', note2: '4' },
  { id: 'PINK2009', title: 'Sensory Ethnography', fullTitle: 'Doing Sensory Ethnography', authors: 'Pink, Sarah', venue: 'SAGE', venueType: 'book', url: 'https://doi.org/10.4135/9781446249383', citations: 3500, respondsTo: 'Establishes emplaced, multisensory ethnographic methodology.', category: 'empirical', year: 2009, position: 'above', note1: 'F', note2: '5' },
  { id: 'PETTY2012', title: 'Curtains & Soft Arch', fullTitle: 'Curtains and the Soft Architecture of the American Postwar Domestic Environment', authors: 'Petty, Margaret Maile', venue: 'Home Cultures', venueType: 'journal', url: 'https://doi.org/10.2752/175174212X13202276383779', citations: 30, respondsTo: 'Addresses neglect of soft, textile-based material elements.', category: 'empirical', year: 2012, position: 'below', note1: 'M', note2: '4' },
  { id: 'ISO12913_1', title: 'ISO 12913-1', fullTitle: 'Acoustics — Soundscape — Part 1', authors: 'ISO', venue: 'ISO', venueType: 'standard', url: 'https://www.iso.org/standard/61478.html', citations: 0, respondsTo: 'Standardizes soundscape definition.', category: 'empirical', year: 2014, position: 'above', note1: 'M', note2: '5' },
  { id: 'THIBAUD2015', title: 'Backstage Ambiances', fullTitle: 'The Backstage of Urban Ambiances', authors: 'Thibaud, Jean-Paul', venue: 'Emotion, Space & Society', venueType: 'journal', url: 'https://doi.org/10.1016/j.emospa.2015.01.009', citations: 95, respondsTo: 'Extends ambiance methodology to the mundane, everyday flow.', category: 'empirical', year: 2014.8, position: 'below-low', note1: 'M', note2: '4' },
  { id: 'PINK2015b', title: 'Researching in Atm.', fullTitle: 'Researching in atmospheres: video and the \'feel\' of the mundane', authors: 'Pink, Sarah; Leder Mackley, Kerstin; Moroşanu, Roxana', venue: 'Visual Communication', venueType: 'journal', url: 'https://doi.org/10.1177/1470357215579580', citations: 130, respondsTo: 'Advances atmosphere theory empirically via video ethnography.', category: 'empirical', year: 2015.2, position: 'above-high', note1: 'M', note2: '5' },
  { id: 'ISO12913_2', title: 'ISO 12913-2', fullTitle: 'Acoustics — Soundscape — Part 2', authors: 'ISO', venue: 'ISO', venueType: 'standard', url: 'https://www.iso.org/standard/75267.html', citations: 0, respondsTo: 'Defines soundscape data collection.', category: 'empirical', year: 2018, position: 'below', note1: 'M', note2: '5' },
  { id: 'ISO12913_3', title: 'ISO 12913-3', fullTitle: 'Acoustics — Soundscape — Part 3', authors: 'ISO', venue: 'ISO', venueType: 'standard', url: 'https://www.iso.org/standard/69864.html', citations: 0, respondsTo: 'Defines soundscape analysis.', category: 'empirical', year: 2019, position: 'above', note1: 'M', note2: '5' },
  { id: 'SUMARTOJOPINK2019', title: 'Experiential World', fullTitle: 'Atmospheres and the Experiential World: Theory and Methods', authors: 'Sumartojo, Shanti; Pink, Sarah', venue: 'Routledge', venueType: 'book', url: 'https://doi.org/10.4324/9781315281254', citations: 95, respondsTo: 'First book-length framework treating atmosphere as dynamic research object.', category: 'empirical', year: 2019, position: 'below-lowest', note1: 'C', note2: '5' },

  // Computational & Data-Driven Methods
  { id: 'EMVOLIADIS2024', title: 'Multimodal Sensing', fullTitle: 'Multimodal Environmental Sensing Using AI', authors: 'Emvoliadis, A. et al.', venue: 'Sensors', venueType: 'journal', url: 'https://doi.org/10.3390/s24092755', citations: 0, respondsTo: 'Applies AI to environmental sensing.', category: 'computational', year: 2024, position: 'above', note1: 'C', note2: '6' }
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
