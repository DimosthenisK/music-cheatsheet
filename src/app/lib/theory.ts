export type note = "A" | "A#" | "B" | "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#";
export type chordType = "major" | "minor" | "diminished" | "augmented";
export const notes: note[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
const majorScaleComposition: Array<chordType> = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished'];
const minorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];
const pentatonicScaleIntervals = [1, 2, 3, 5, 6];

const dominantScaleChordIntervals = [0, 3, 4, 5];

const chordCompositions = {
    major: {
        intervals: [0, 4, 7],
        symbol: "",
    },
    minor: {
        intervals: [0, 3, 7],
        symbol: "m",
    },
    diminished: {
        intervals: [0, 3, 6],
        symbol: "dim",
    },
    augmented: {
        intervals: [0, 4, 8],
        symbol: "aug",
    },
}

const getScale = (scaleName: string) => {
    const scaleNameSafe = scaleName.replace("sharp", "#").replace("flat", "b");
    if (scaleNameSafe.endsWith("m")) {
        return getMinorScale(scaleNameSafe.slice(0, -1) as note);
    }
    return getMajorScale(scaleNameSafe as note);
}

const getMajorScale = (root: note) => {
    const rootIndex = notes.indexOf(root);
    const scaleNotes = majorScaleIntervals.map((interval) => notes.at((rootIndex + interval) % notes.length));
    const pentatonicScaleNotes = scaleNotes.filter((note, index) => pentatonicScaleIntervals.includes(index));

    return {
        type: 'major',
        name: `${root}`,
        rootNote: root,
        notes: scaleNotes,
        pentatonicNotes: pentatonicScaleNotes,
    }
}

const getMinorScale = (root: note) => {
    const rootIndex = notes.indexOf(root);
    const scaleNotes = minorScaleIntervals.map((interval) => notes.at((rootIndex + interval) % notes.length));
    const pentatonicScaleNotes = scaleNotes.filter((note, index) => pentatonicScaleIntervals.includes(index));

    return {
        type: 'minor',
        name: `${root}m`,
        rootNote: root,
        notes: scaleNotes,
        pentatonicNotes: pentatonicScaleNotes,
    }
}

const getRelativeScale = (scaleName: string) => {
    const scaleNameSafe = scaleName.replace("sharp", "#").replace("flat", "b");
    if (scaleNameSafe.endsWith("m")) {
        return getRelativeMajorScale(scaleNameSafe.slice(0, -1) as note);
    }
    return getRelativeMinorScale(scaleNameSafe as note);
}

const getRelativeMinorScale = (majorScaleRoot: note) => {
    const rootIndex = notes.indexOf(majorScaleRoot);
    const minorScaleRoot = notes.at((rootIndex - 3) % notes.length);
    if (!minorScaleRoot) {
        throw new Error("Invalid root note");
    }
    return getMinorScale(minorScaleRoot);
}

const getRelativeMajorScale = (minorScaleRoot: note) => {
    const rootIndex = notes.indexOf(minorScaleRoot);
    const majorScaleRoot = notes.at((rootIndex + 3) % notes.length);
    if (!majorScaleRoot) {
        throw new Error("Invalid root note");
    }
    return getMajorScale(majorScaleRoot);
}

const getChord = (root: note, type: chordType) => {
    const rootIndex = notes.indexOf(root);
    const chordNotes = chordCompositions[type].intervals.map((interval) => notes.at((rootIndex + interval) % notes.length));
    return {
        chordName: `${root}${chordCompositions[type].symbol}`,
        chordNotes,
    }
}

const getScaleChords = (scaleName: string) => {
    const scaleNameSafe = scaleName.replace("sharp", "#").replace("flat", "b");
    let scaleChords = [];
    if (scaleNameSafe.endsWith("m")) {
        scaleChords = getMinorScaleChords(scaleNameSafe.slice(0, -1) as note);
    }
    scaleChords = getMajorScaleChords(scaleNameSafe as note);

    return scaleChords.map((chord, index) => {
        return {
            ...chord,
            isDominant: dominantScaleChordIntervals.includes(index),
        }
    });
}

const getMajorScaleChords = (majorScaleRootNote: note) => {
    const majorScale = getMajorScale(majorScaleRootNote);
    return majorScale.notes.map((note, index) => {
        const chordType = majorScaleComposition[index];
        if (!note) {
            throw new Error("Invalid root note");
        }
        return getChord(note, chordType);
    });
}

const getMinorScaleChords = (minorScaleRootNote: note) => {
    const relativeMajorScale = getRelativeMajorScale(minorScaleRootNote);
    const chords = getMajorScaleChords(relativeMajorScale.rootNote);

    chords.unshift(chords.pop());
    chords.unshift(chords.pop());

    return chords;
}

export const theory = {
    getScale,
    getScaleChords,
    getRelativeScale,
}