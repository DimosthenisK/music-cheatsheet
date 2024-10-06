import React from 'react';
import { note } from '../lib';
import PianoKeyboard from './PianoKeyboard';

interface ScaleCardProps {
    title: string;
    chords: Array<{chordName: string, isDominant: boolean, chordNotes: note[]}>;
}

const ScaleCard: React.FC<ScaleCardProps> = ({title, chords}) => {

    return (
        <div className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-2 dark:bg-gray-600 dark:border-gray-700">
            <div className="flex items-center justify-between p-6">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
           </div>
           <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {chords.map((chord) => (
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center mx-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {chord.chordName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {chord.isDominant ? "Dominant" : "Not Dominant"}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white max-w-36">
                                    <PianoKeyboard HighlightedNotesYellow={chord.chordNotes} drawNoteNames={false} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
           </div>
        </div>
    )
}

export default ScaleCard;