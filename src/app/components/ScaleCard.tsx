import React from 'react';
import { note, toRoman } from '../lib';
import PianoKeyboard from './PianoKeyboard';

interface ScaleCardProps {
  title: string;
  chords: Array<{ chordName: string; isDominant: boolean; chordNotes: note[] }>;
}

const ScaleCard: React.FC<ScaleCardProps> = ({ title, chords }) => {
  return (
    <div className="w-full p-2 bg-background border border-gray-600 rounded-lg shadow sm:p-2 ">
      <div className="flex items-center justify-between p-6">
        <h5 className="text-xl font-bold leading-none  text-white">
          {title}
        </h5>
      </div>
      <div className="flow-root">
        <ol
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {chords.map((chord, index) => (
            <li key={chord.chordName} className="py-3 sm:py-4">
              <div className="flex items-center mx-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    <span className="text-sm text-gray-500">{toRoman(index + 1)}.</span> {chord.chordName}
                  </p>
                  <p className="text-sm truncate text-gray-400">
                    {chord.isDominant ? 'Dominant' : 'Non-Dominant'}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white max-w-36">
                  <PianoKeyboard
                    HighlightedNotesYellow={chord.chordNotes}
                    drawNoteNames={false}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ScaleCard;
