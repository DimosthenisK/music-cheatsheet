export type note =
  | 'A'
  | 'A#'
  | 'B'
  | 'C'
  | 'C#'
  | 'D'
  | 'D#'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#';
export type chordType =
  | 'major'
  | 'minor'
  | 'diminished'
  | 'augmented'
  | 'major seventh'
  | 'minor seventh'
  | 'dominant seventh'
  | 'half-diminished seventh';
export const notes: note[] = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];

const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
const majorScaleComposition: Array<chordType> = [
  'major',
  'minor',
  'minor',
  'major',
  'major',
  'minor',
  'diminished',
];
const majorScale7thComposition: Array<chordType> = [
  'major seventh',
  'minor seventh',
  'minor seventh',
  'major seventh',
  'dominant seventh',
  'minor seventh',
  'half-diminished seventh',
];
const minorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];
const minorScaleComposition: Array<chordType> = [
  'minor',
  'diminished',
  'major',
  'minor',
  'minor',
  'major',
  'major',
];
const minorScale7thComposition: Array<chordType> = [
  'minor seventh',
  'half-diminished seventh',
  'major seventh',
  'minor seventh',
  'minor seventh',
  'major seventh',
  'dominant seventh',
];
const majorPentatonicScaleIntervals = [0, 1, 2, 4, 5];
const minorPentatonicScaleIntervals = [0, 2, 3, 4, 6];

const dominantScaleChordIntervals = [0, 3, 4, 5];

const chordCompositions = {
  major: {
    intervals: [0, 4, 7],
    symbol: '',
  },
  minor: {
    intervals: [0, 3, 7],
    symbol: 'm',
  },
  diminished: {
    intervals: [0, 3, 6],
    symbol: 'dim',
  },
  augmented: {
    intervals: [0, 4, 8],
    symbol: 'aug',
  },
  'major seventh': {
    intervals: [0, 4, 7, 11],
    symbol: 'maj7',
  },
  'minor seventh': {
    intervals: [0, 3, 7, 10],
    symbol: 'm7',
  },
  'dominant seventh': {
    intervals: [0, 4, 7, 10],
    symbol: '7',
  },
  'half-diminished seventh': {
    intervals: [0, 3, 6, 10],
    symbol: 'm7b5',
  },
};

const getScale = (scaleName: string) => {
  const scaleNameSafe = scaleName.replace('sharp', '#').replace('flat', 'b');
  if (scaleNameSafe.endsWith('m')) {
    return getMinorScale(scaleNameSafe.slice(0, -1) as note);
  }
  return getMajorScale(scaleNameSafe as note);
};

const getMajorScale = (root: note) => {
  const rootIndex = notes.indexOf(root);
  const scaleNotes = majorScaleIntervals.map((interval) =>
    notes.at((rootIndex + interval) % notes.length)
  );
  const pentatonicScaleNotes = scaleNotes.filter((note, index) =>
    majorPentatonicScaleIntervals.includes(index)
  );

  return {
    type: 'major',
    name: `${root}`,
    rootNote: root,
    notes: scaleNotes,
    pentatonicNotes: pentatonicScaleNotes,
  };
};

const getMinorScale = (root: note) => {
  const rootIndex = notes.indexOf(root);
  const scaleNotes = minorScaleIntervals.map((interval) =>
    notes.at((rootIndex + interval) % notes.length)
  );
  const pentatonicScaleNotes = scaleNotes.filter((note, index) =>
    minorPentatonicScaleIntervals.includes(index)
  );

  return {
    type: 'minor',
    name: `${root}m`,
    rootNote: root,
    notes: scaleNotes,
    pentatonicNotes: pentatonicScaleNotes,
  };
};

const getRelativeScale = (scaleName: string) => {
  const scaleNameSafe = scaleName.replace('sharp', '#').replace('flat', 'b');
  if (scaleNameSafe.endsWith('m')) {
    return getRelativeMajorScale(scaleNameSafe.slice(0, -1) as note);
  }
  return getRelativeMinorScale(scaleNameSafe as note);
};

const getRelativeMinorScale = (majorScaleRoot: note) => {
  const rootIndex = notes.indexOf(majorScaleRoot);
  const minorScaleRoot = notes.at((rootIndex - 3) % notes.length);
  if (!minorScaleRoot) {
    throw new Error('Invalid root note');
  }
  return getMinorScale(minorScaleRoot);
};

const getRelativeMajorScale = (minorScaleRoot: note) => {
  const rootIndex = notes.indexOf(minorScaleRoot);
  const majorScaleRoot = notes.at((rootIndex + 3) % notes.length);
  if (!majorScaleRoot) {
    throw new Error('Invalid root note');
  }
  return getMajorScale(majorScaleRoot);
};

const getChord = (root: note, type: chordType) => {
  const rootIndex = notes.indexOf(root);
  const chordNotes = chordCompositions[type].intervals.map((interval) =>
    notes.at((rootIndex + interval) % notes.length)
  );
  return {
    chordName: `${root}${chordCompositions[type].symbol}`,
    chordNotes,
  };
};

const getScaleChords = (scaleName: string, seventh: boolean = false) => {
  const scaleNameSafe = scaleName.replace('sharp', '#').replace('flat', 'b');
  let scaleChords = [];
  if (scaleNameSafe.endsWith('m')) {
    scaleChords = getMinorScaleChords(scaleNameSafe.slice(0, -1) as note, seventh);
  } else {
    scaleChords = getMajorScaleChords(scaleNameSafe as note, seventh);
  }

  return scaleChords.map((chord, index) => {
    return {
      ...chord,
      isPrevailing: dominantScaleChordIntervals.includes(index),
    };
  });
};

const getMajorScaleChords = (majorScaleRootNote: note, seventh: boolean = false) => {
  const majorScale = getMajorScale(majorScaleRootNote);
  const chordComposition = seventh ? majorScale7thComposition : majorScaleComposition;
  return majorScale.notes.map((note, index) => {
    const chordType = chordComposition[index];
    if (!note) {
      throw new Error('Invalid root note');
    }
    return getChord(note, chordType);
  });
};

const getMinorScaleChords = (minorScaleRootNote: note, seventh: boolean = false) => {
  const minorScale = getMinorScale(minorScaleRootNote);
  const chordComposition = seventh ? minorScale7thComposition : minorScaleComposition;
  return minorScale.notes.map((note, index) => {
    const chordType = chordComposition[index];
    if (!note) {
      throw new Error('Invalid root note');
    }
    return getChord(note, chordType);
  });
};

export const theory = {
  getScale,
  getScaleChords,
  getRelativeScale,
};
