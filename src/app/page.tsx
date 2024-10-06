"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useTitle } from './contexts/TitleContext';
import { notes } from './lib';

export default function Home() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(`Music Cheatsheet`);
  }, [setTitle]);
  
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
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
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded text-center transition duration-300 ease-in-out"
                >
                  {note}m
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
