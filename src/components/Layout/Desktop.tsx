import { Outlet } from 'react-router-dom';
import HappinessMeter from './HappinessMeter';
import Taskbar from './Taskbar';
import { useRef } from 'react';

function FloatingHearts() {
  const hearts = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: ['\u{1F495}', '\u2764\uFE0F', '\u{1F496}', '\u{1F497}', '\u{1F493}', '\u{1F498}', '\u{1F49D}', '\u{1FA77}', '\u2665\uFE0F', '\u{1F60D}'][i % 10],
      left: seededRandom(i * 17) * 100,
      delay: seededRandom(i * 31) * 15,
      duration: 8 + seededRandom(i * 47) * 12,
      size: 14 + seededRandom(i * 61) * 24,
    }))
  ).current;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(h => (
        <span
          key={h.id}
          className="absolute animate-float-up"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
            bottom: '-50px',
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function Desktop() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF69B4 0%, #B026FF 50%, #FF1493 100%)',
        backgroundImage: 'url(/images/desktop-wallpaper.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FloatingHearts />

      <HappinessMeter />

      {/* Main content area */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pb-8">
        <Outlet />
      </div>

      <Taskbar />
    </div>
  );
}
