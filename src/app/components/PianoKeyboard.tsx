import React from 'react';

interface PianoKeyProps {
  note: string;
  isBlack: boolean;
  scaleHighlighted: boolean;
  pentatonicHighlighted: boolean;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, isBlack, scaleHighlighted, pentatonicHighlighted }) => {
  let bgClass = '';

  if (pentatonicHighlighted) {
    bgClass = 'bg-green-500';
  }
  else if (scaleHighlighted) {
    bgClass = 'bg-yellow-400';
  } else {
    bgClass = isBlack ? 'bg-black' : 'bg-white';
  }

  return (
    <div
      className={`relative flex items-center justify-center text-xs font-semibold rounded ${
        isBlack
          ? `${bgClass} text-white w-10 h-44 shadow-lg z-20`
          : `${bgClass} text-black w-20 h-60 border border-gray-500 shadow-md`
      }`}
    >
      <span className={`absolute ${isBlack ? 'text-xs bottom-2' : 'text-sm bottom-3'}`}>
        {note}
      </span>
    </div>
  );
};

interface PianoKeyboardProps {
  scaleHighlightedNotes?: string[];
  pentatonicHighlightedNotes?: string[];
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  scaleHighlightedNotes = [],
  pentatonicHighlightedNotes = [],
}) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = [
    { note: 'C#', position: 'left-[3.8rem]' },
    { note: 'D#', position: 'left-[8.9rem]' },
    { note: 'F#', position: 'left-[18.8rem]' },
    { note: 'G#', position: 'left-[23.68rem]' },
    { note: 'A#', position: 'left-[28.75rem]' },
  ];

  return (
    <div className="relative flex">
      {/* White keys */}
      <div className="flex">
        {whiteKeys.map((note) => (
          <PianoKey
            key={note}
            note={note}
            isBlack={false}
            scaleHighlighted={scaleHighlightedNotes.includes(note)}
            pentatonicHighlighted={pentatonicHighlightedNotes.includes(note)}
          />
        ))}
      </div>
      {/* Black keys */}
      <div className="absolute w-full h-0 top-0">
        {blackKeys.map(({ note, position }) => (
          <div key={note} className={`absolute ${position}`}>
            <PianoKey
              note={note}
              isBlack={true}
              scaleHighlighted={scaleHighlightedNotes.includes(note)}
              pentatonicHighlighted={pentatonicHighlightedNotes.includes(note)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PianoKeyboard;
