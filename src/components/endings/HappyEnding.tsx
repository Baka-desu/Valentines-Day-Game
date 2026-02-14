import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../../context/useGame';
import ValentinePopup from './ValentinePopup';

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const floatingEmojis = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  emoji: ['\u{1F495}', '\u{1F98A}', '\u2764\uFE0F', '\u{1F496}', '\u2728', '\u{1F497}', '\u{1F60D}', '\u{1F498}', '\u{1F389}', '\u{1F49D}'][i % 10],
  startX: seededRandom(i * 13) * 100,
  endX: seededRandom(i * 29) * 100,
  duration: 3 + seededRandom(i * 43) * 4,
  delay: seededRandom(i * 59) * 3,
}));

export default function HappyEnding() {
  const { state, dispatch } = useGame();
  const [phase, setPhase] = useState<'confetti' | 'popup' | 'victory'>('confetti');
  const [showStats, setShowStats] = useState(false);
  const completedRef = useRef(false);

  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF69B4', '#B026FF', '#FFD700', '#FF1493', '#FF6B6B'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF69B4', '#B026FF', '#FFD700', '#FF1493', '#FF6B6B'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Complete game once
  if (state.happinessMeter >= 100 && !state.gameCompleted && !completedRef.current) {
    completedRef.current = true;
    queueMicrotask(() => dispatch({ type: 'COMPLETE_GAME' }));
  }

  useEffect(() => {
    fireConfetti();
    const timer = setTimeout(() => setPhase('popup'), 4000);
    return () => clearTimeout(timer);
  }, [fireConfetti]);

  const handleYes = () => {
    setPhase('victory');
    setShowStats(true);
    fireConfetti();
  };

  const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const h = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #FF69B4 0%, #B026FF 30%, #FF1493 60%, #FFD700 100%)' }}
    >
      {/* Floating emojis background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingEmojis.map((item) => (
          <motion.span
            key={item.id}
            className="absolute text-3xl"
            initial={{
              x: (item.startX / 100) * w,
              y: h + 50,
            }}
            animate={{
              y: -50,
              x: (item.endX / 100) * w,
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'linear',
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'confetti' && (
          <motion.div
            key="confetti"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-center z-10"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white text-shadow-glow mb-4"
              style={{ fontFamily: '"Lobster", cursive' }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              CONGRATULATIONS!
            </motion.h1>
            <motion.p
              className="text-2xl text-warning-yellow font-bold"
              style={{ fontFamily: '"Comic Sans MS", cursive' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Maximum cringe has been achieved! 🎉💕
            </motion.p>
          </motion.div>
        )}

        {phase === 'popup' && (
          <ValentinePopup key="popup" onYes={handleYes} />
        )}

        {phase === 'victory' && showStats && (
          <motion.div
            key="victory"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center relative overflow-hidden"
            style={{ border: '4px solid #FF69B4' }}
          >
            {/* Victory background */}
            <div
              className="absolute inset-0 opacity-15"
              style={{ backgroundImage: 'url(/images/victory-card-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <motion.div
              className="text-5xl mb-3 relative z-10"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🦊💕👑
            </motion.div>
            <h2
              className="text-3xl font-bold text-hot-pink-dark mb-4 relative z-10"
              style={{ fontFamily: '"Lobster", cursive' }}
            >
              You're My Valentine!
            </h2>

            <div className="grid grid-cols-2 gap-3 text-left bg-pink-50 rounded-xl p-4 mb-4 relative z-10">
              <div className="text-center">
                <p className="text-2xl font-bold text-hot-pink">{state.meganFoxesFound}</p>
                <p className="text-xs text-gray-500">Megans Found 🦊</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neon-purple">{state.rizzLinesGenerated}</p>
                <p className="text-xs text-gray-500">Rizz Lines 😏</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-hot-pink">{state.chatMessagesSent}</p>
                <p className="text-xs text-gray-500">Messages 💬</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neon-purple">{state.datesGenerated}</p>
                <p className="text-xs text-gray-500">Dates 🌹</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 relative z-10" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              You've conquered maximum cringe and found love along the way. You absolute legend. 💕
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                localStorage.removeItem('valentine-game-state');
                window.location.href = '/';
              }}
              className="px-6 py-2 bg-gradient-to-r from-hot-pink to-neon-purple text-white rounded-full font-bold cursor-pointer relative z-10"
            >
              🔄 Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
