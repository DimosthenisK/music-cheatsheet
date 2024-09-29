"use client";
import { useParams } from "next/navigation";
import PianoKeyboard from "../components/PianoKeyboard";
import { theory } from "../lib";

export default function Index() {
    const { scale: scaleRoot  } = useParams();
    const scale = theory.getScale(scaleRoot as string);
    const relativeScale = theory.getRelativeScale(scaleRoot as string);
    const chords = theory.getScaleChords(scaleRoot as string);
    const relativeChords = theory.getScaleChords(relativeScale.name);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <h1 className="text-6xl font-bold text-center">{scale.name} Scale Overview</h1>
        <div className="w-full flex justify-center items-center">
          <PianoKeyboard scaleHighlightedNotes={scale.notes} pentatonicHighlightedNotes={scale.pentatonicNotes} />
        </div>
        <div className="w-2/3 flex flex-col gap-8 justify-center items-center">
          <div className="w-2/3">
            <h2 className="text-4xl font-bold mb-4">Chords</h2>
            <ol className="list-decimal pl-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {chords.map((chord) => (
                <li key={chord.chordName}>
                  <span className={`${chord.isDominant ? 'text-red-500 font-semibold' : ''}`}>{chord.chordName}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="w-2/3">
            <h2 className="text-4xl font-bold mb-4">Relative Chords</h2>
            <ol className="list-decimal pl-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {relativeChords.map((chord) => (
                <li key={chord.chordName}>
                  <span className={`${chord.isDominant ? 'text-red-500 font-semibold' : ''}`}>{chord.chordName}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
