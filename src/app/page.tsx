import Link from "next/link";
import { notes } from "./lib";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-6xl font-bold">Music Theory Cheatsheet</h1>
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-2xl font-bold">Major Scales</div>
            <div className="grid grid-cols-3 gap-2">
              {notes.map((note) => (
                <Link
                  key={`major-${note}`}
                  href={`/${note.replace('#', 'sharp')}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center transition duration-300 ease-in-out"
                >
                  {note}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-2xl font-bold">Minor Scales</div>
            <div className="grid grid-cols-3 gap-2">
              {notes.map((note) => (
                <Link
                  key={`minor-${note}`}
                  href={`/${note.replace('#', 'sharp')}m`}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded text-center transition duration-300 ease-in-out"
                >
                  {note}m
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-600">
          Made by Dimosthenis Kalaitzis, see{" "}
          <a
            href="https://github.com/DimosthenisK/music-cheatsheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            source
          </a> ♥
        </p>
      </footer>
    </div>
  );
}
