export const categories = [
  { id: 'dataset', name: 'Dataset', subName: '', bgColor: '#f1f5fb', borderColor: '#cad5ec' },
  { id: 'hand_data', name: 'Hand Synth', subName: '(Data-Driven)', bgColor: '#fdf1f2', borderColor: '#f9c5cd' },
  { id: 'hand_phys', name: 'Hand Synth', subName: '(Physics-Based)', bgColor: '#fdf7e8', borderColor: '#f8d298' },
  { id: 'body', name: 'Body Synth', subName: '', bgColor: '#f0eef9', borderColor: '#cfc4ed' },
  { id: 'preprocess', name: 'Pre-processing', subName: '', bgColor: '#e8fbef', borderColor: '#aee4c5' },
  { id: 'foundations', name: 'Related Foundations', subName: '', bgColor: '#f1f5fb', borderColor: '#cad5ec' }
];

export const yearSpots = [
  { year: 2009, label: '09', pos: 5 },
  { year: 2010, label: '10', pos: 7 },
  { year: 2013, label: '13', pos: 10 },
  { year: 2017, label: '17', pos: 17 },
  { year: 2018, label: '18', pos: 19 },
  { year: 2019, label: '19', pos: 23 },
  { year: 2020, label: '20', pos: 27 },
  { year: 2021, label: '21', pos: 32 },
  { year: 2022, label: '22', pos: 37 },
  { year: 2023, label: '23', pos: 48 },
  { year: 2024, label: '24', pos: 68 },
  { year: 2025, label: '25', pos: 84 },
  { year: 2026, label: '26', pos: 96 },
];

export const papers = [
  // Dataset
  { id: 'PiaMot10M_A', title: 'PiaMot10M', authors: 'Unknown Authors', venue: 'ICLR 2024', category: 'dataset', year: 2024.1, position: 'above', note: 'A' },
  { id: 'FurElise_A', title: 'FürElise: Capturing and Physically Synthesizing Hand Motions of Piano Performance', authors: 'Wang, Xu, Shi, Schumann & Liu', venue: 'ACM SIGGRAPH Asia 2024', category: 'dataset', year: 2024.5, position: 'above', note: 'A' },
  { id: 'MOSA_B', title: 'MOSA', authors: 'Unknown Authors', venue: 'IEEE TASLP 2024', category: 'dataset', year: 2023.8, position: 'below', note: 'B' },
  { id: 'RP1M_A', title: 'RP1M: A Large-Scale Motion Dataset for Piano Playing with Bi-Manual Dexterous Robot Hands', authors: 'Wang et al.', venue: 'Conference on Robot Learning (CoRL) 2024', category: 'dataset', year: 2024.8, position: 'below', note: 'A' },
  { id: 'Pianopus_C', title: 'Pianopus', authors: 'Unknown Authors', venue: 'Submitted ISMIR 2026', category: 'dataset', year: 2026.2, position: 'above', note: 'C' },


  // Hand Synth (Data-Driven)
  { id: 'PianoCG_3', title: 'PianoCG', authors: 'Unknown Authors', venue: 'FCV 2009', category: 'hand_data', year: 2009, position: 'above', note: '3' },
  { id: 'PianoAnim_2', title: 'PianoAnim', authors: 'Unknown Authors', venue: 'CAVW 2013', category: 'hand_data', year: 2013, position: 'below', note: '2' },
  { id: 'PiaMot10M_1', title: 'PiaMot10M', authors: 'Unknown Authors', venue: 'ICLR 2024', category: 'hand_data', year: 2024.1, position: 'above', note: '1' },
  { id: 'FurElise_2', title: 'FürElise: Capturing and Physically Synthesizing Hand Motions of Piano Performance', authors: 'Wang, Xu, Shi, Schumann & Liu', venue: 'ACM SIGGRAPH Asia 2024', category: 'hand_data', year: 2024.5, position: 'above', note: '2' },
  { id: 'Sep2Collab_1', title: 'Sep2Collab', authors: 'Unknown Authors', venue: 'ACM MM 2024', category: 'hand_data', year: 2024.3, position: 'below', note: '1' },
  { id: 'BACH_2', title: 'BACH', authors: 'Unknown Authors', venue: 'CAVW 2025', category: 'hand_data', year: 2025.2, position: 'below', note: '2' },
  { id: 'Tipiano_2', title: 'Tipiano', authors: 'Unknown Authors', venue: 'Submitted Siggraph 2026', category: 'hand_data', year: 2026.8, position: 'above', note: '2' },

  // Hand Synth (Physics-Based)
  { id: 'HandMotion_5', title: 'Generating Natural Hand Motion in Playing Piano', authors: 'Hori et al.', venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) 2010', category: 'hand_phys', year: 2010.5, position: 'above', note: '5' },
  { id: 'RoboPianist_5', title: 'RoboPianist', authors: 'Unknown Authors', venue: 'CoRL 2023', category: 'hand_phys', year: 2023.5, position: 'below', note: '5' },
  { id: 'PianoMime_4', title: 'PianoMime', authors: 'Unknown Authors', venue: 'CoRL 2024', category: 'hand_phys', year: 2024.6, position: 'above', note: '4' },
  { id: 'RP1M_2_phys', title: 'RP1M: A Large-Scale Motion Dataset for Piano Playing with Bi-Manual Dexterous Robot Hands', authors: 'Wang et al.', venue: 'Conference on Robot Learning (CoRL) 2024', category: 'hand_phys', year: 2024.9, position: 'below', note: '2' },
  { id: 'OmniPianist_2', title: 'OmniPianist', authors: 'Unknown Authors', venue: 'Submitted TPAMI', category: 'hand_phys', year: 2025.5, position: 'above', note: '2' },
  { id: 'PANDORA_4', title: 'PANDORA', authors: 'Unknown Authors', venue: 'NeurIPS 2025', category: 'hand_phys', year: 2025.8, position: 'below', note: '4' },

  // Body Synth
  { id: 'Audio2Body', title: 'Audio2Body', authors: 'Unknown Authors', venue: 'CVPR 2018', category: 'body', year: 2018.5, position: 'above' },
  { id: 'SkelPiano', title: 'SkelPiano', authors: 'Unknown Authors', venue: 'ISMIR 2018', category: 'body', year: 2018.5, position: 'below' },
  { id: 'Pianoid', title: 'Pianoid', authors: 'Unknown Authors', venue: 'Submitted ISMIR 2026', category: 'body', year: 2026.5, position: 'below' },

  // Pre-processing
  { id: 'PianoHand', title: 'PianoHand', authors: 'Unknown Authors', venue: 'WACV 2023', category: 'preprocess', year: 2022.8, position: 'above' },
  { id: 'HandMotionImputation', title: 'Hand Motion Imputation', authors: 'Unknown Authors', venue: 'ISB 2023', category: 'preprocess', year: 2023.6, position: 'below' },
  { id: 'DLHandMotionImputation', title: 'DL based Hand Motion Imputation', authors: 'Unknown Authors', venue: 'Submitted EAAI 2026', category: 'preprocess', year: 2026.3, position: 'above' },

  // Related Foundations
  { id: 'MANO', title: 'MANO', authors: 'Unknown Authors', venue: 'SIG Asia 2017', category: 'foundations', year: 2017.5, position: 'below' },
  { id: 'SMPLX', title: 'SMPL-X', authors: 'Unknown Authors', venue: 'CVPR 2019', category: 'foundations', year: 2019.2, position: 'above' },
  { id: 'MediaPipe', title: 'MediaPipe', authors: 'Unknown Authors', venue: 'CVPR 2020', category: 'foundations', year: 2020.2, position: 'below' },
  { id: 'AIST', title: 'AIST++', authors: 'Unknown Authors', venue: 'ICCV 2021', category: 'foundations', year: 2021.5, position: 'above' },
  { id: 'Bailando', title: 'Bailando', authors: 'Unknown Authors', venue: 'CVPR 2022', category: 'foundations', year: 2022.5, position: 'below' },
  { id: 'MDM', title: 'MDM', authors: 'Unknown Authors', venue: 'ICLR 2023', category: 'foundations', year: 2023.2, position: 'above' },
  { id: 'ARCTIC', title: 'ARCTIC', authors: 'Unknown Authors', venue: 'CVPR 2023', category: 'foundations', year: 2023.5, position: 'below' },
  { id: 'EDGE', title: 'EDGE', authors: 'Unknown Authors', venue: 'CVPR 2023', category: 'foundations', year: 2023.8, position: 'above' },
  { id: 'FineDance', title: 'FineDance', authors: 'Unknown Authors', venue: 'ICCV 2023', category: 'foundations', year: 2024.2, position: 'above' },
  { id: 'HaMeR', title: 'HaMeR', authors: 'Unknown Authors', venue: 'CVPR 2024', category: 'foundations', year: 2024.5, position: 'below' },
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
