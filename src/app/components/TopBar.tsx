'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTitle } from '../contexts/TitleContext';

export default function TopBar() {
  const router = useRouter();
  const { title } = useTitle();

  return (
    <div className="bg-background text-foreground p-4 sm:p-6 md:p-8 flex items-center justify-between font-[family-name:var(--font-geist-sans)] shadow-md">
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="mr-4 text-green-500 hover:text-green-600 transition duration-300 ease-in-out"
        >
          ← Back
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
      <Link
        href="/"
        className="text-yellow-400 hover:text-yellow-500 font-bold transition duration-300 ease-in-out"
      >
        Home
      </Link>
    </div>
  );
}