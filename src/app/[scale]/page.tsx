"use client";
import { useParams } from "next/navigation";
import PianoKeyboard from "../components/PianoKeyboard";
import { note, theory } from "../lib";

export default function Index() {
    const { scale: scaleRoot  } = useParams();
    const scale = theory.getScale(scaleRoot as note);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-6xl font-bold">{scale.name} Scale Overview</h1>
        <div className="flex justify-center">
          <PianoKeyboard scaleHighlightedNotes={scale.notes} pentatonicHighlightedNotes={scale.pentatonicNotes} />
        </div>
        <div className="flex justify-center p-8">
          <ol className="list-decimal">
            {theory.getMajorScaleChords(scale.rootNote).map((chord) => (
              <li key={chord.chordName}>
              {chord.chordName}
              </li>
          ))}
          </ol>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
