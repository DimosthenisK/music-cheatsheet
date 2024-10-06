import tailwindConfig from '@/../tailwind.config';
import { Piano } from '@tonejs/piano';
import React, { useEffect, useRef } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
const fullConfig = resolveConfig(tailwindConfig);

interface PianoKeyboardProps {
  HighlightedNotesYellow?: string[]; // Notes to mark in yellow
  HighlightedNotesGreen?: string[]; // Notes to mark in green
  width?: number; // Width of the canvas
  height?: number; // Height of the canvas
  enableOnClick?: boolean;
  drawNoteNames?: boolean;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  HighlightedNotesYellow = [],
  HighlightedNotesGreen = [],
  width = 600,
  height = 200,
  enableOnClick = false,
  drawNoteNames = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pianoRef = useRef<Piano>(null);

  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

  const playNote = (note: string) => {
    pianoRef.current?.keyDown({ note: `${note}4` });
    setTimeout(() => {
      pianoRef.current?.keyUp({ note: `${note}4` });
    }, 500); // Adjust this value for the desired note duration in milliseconds
  };

  const drawKeyboard = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const whiteKeyWidth = width / whiteKeys.length;
    const blackKeyWidth = whiteKeyWidth * 0.4;
    const blackKeyHeight = height * 0.6;

    ctx.clearRect(0, 0, width, height); // Clear the canvas before redrawing

    // Draw white keys
    whiteKeys.forEach((note, i) => {
      const x = i * whiteKeyWidth;
      ctx.fillStyle = HighlightedNotesGreen.includes(note)
        ? fullConfig.theme.colors.green[500]
        : HighlightedNotesYellow.includes(note)
          ? fullConfig.theme.colors.yellow[400]
          : 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.fillRect(x, 0, whiteKeyWidth, height);
      ctx.strokeRect(x, 0, whiteKeyWidth, height);

      // Draw note label
      if (drawNoteNames) {
        ctx.fillStyle = 'black';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(note, x + whiteKeyWidth / 2, height - 10);
      }

      // Add click event listener for white keys
      canvasRef.current?.addEventListener('click', (e) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const clickX = e.clientX - rect.left;
          if (clickX >= x && clickX <= x + whiteKeyWidth) {
            playNote(note);
          }
        }
      });
    });

    // Draw black keys
    blackKeys.forEach((note, i) => {
      if (note === '') return; // Skip where there is no black key
      const x = (i + 1) * whiteKeyWidth - blackKeyWidth / 2;
      ctx.fillStyle = HighlightedNotesGreen.includes(note)
        ? fullConfig.theme.colors.green[500]
        : HighlightedNotesYellow.includes(note)
          ? fullConfig.theme.colors.yellow[400]
          : 'black';
      ctx.fillRect(x, 0, blackKeyWidth, blackKeyHeight);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x, 0, blackKeyWidth, blackKeyHeight);

      // Draw note label
      if (drawNoteNames) {
        ctx.fillStyle =
          HighlightedNotesGreen.includes(note) ||
          HighlightedNotesYellow.includes(note)
            ? 'black'
            : 'white';
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(note, x + blackKeyWidth / 2, blackKeyHeight - 10);
      }

      // Add click event listener for black keys
      canvasRef.current?.addEventListener('click', (e) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          if (
            clickX >= x &&
            clickX <= x + blackKeyWidth &&
            clickY >= 0 &&
            clickY <= blackKeyHeight
          ) {
            playNote(note);
          }
        }
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution to make it resizable
    canvas.width = width;
    canvas.height = height;

    drawKeyboard(ctx, canvas.width, canvas.height);
    if (enableOnClick) {
      pianoRef.current = new Piano({
        velocities: 5,
      }).toDestination();
      pianoRef.current.load().then(() => {
        console.log("Piano loaded")
      });
    }
  }, [HighlightedNotesYellow, HighlightedNotesGreen, width, height]);

  return (
    <div className="w-full h-auto">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default PianoKeyboard;
