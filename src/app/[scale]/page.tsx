'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import PianoKeyboard from '../components/PianoKeyboard';
import ScaleCard from '../components/ScaleCard';
import { useTitle } from '../contexts/TitleContext';
import { theory } from '../lib';

export default function Index() {
  const { scale: scaleName } = useParams();
  const scale = theory.getScale(scaleName as string);
  const chords = theory.getScaleChords(scaleName as string);
  const chordsSeventh = theory.getScaleChords(scaleName as string, true);
  const relativeScale = theory.getRelativeScale(scaleName as string);
  const relativeChords = theory.getScaleChords(relativeScale.name);
  const relativeChordsSeventh = theory.getScaleChords(relativeScale.name, true);
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(`${scale.name} Scale Overview`);
  }, [scale.name, setTitle]);

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 md:gap-8 lg:gap-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          {scale.name} Scale Overview
        </h1>
        <div className="w-full overflow-x-auto md:overflow-x-visible flex justify-center">
          <div className="max-w-full">
            <PianoKeyboard
              HighlightedNotesYellow={scale.notes}
              HighlightedNotesGreen={scale.pentatonicNotes}
              enableOnClick={true}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 max-w-screen-md mx-auto">
          <div className="w-full">
            <ScaleCard title="Chords" chords={chords} />
          </div>
          <div className="w-full">
            <ScaleCard title="7th Chords" chords={chordsSeventh} showPrevailing={false} />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 max-w-screen-md mx-auto">
          <div className="w-full">
            <ScaleCard title="Relative Scale Chords" chords={relativeChords} />
          </div>
          <div className="w-full">
            <ScaleCard title="Relative Scale 7th Chords" chords={relativeChordsSeventh} showPrevailing={false} />
          </div>
        </div>
      </main>
    </div>
  );
}
