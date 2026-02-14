import { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Window from '../components/Layout/Window';
import CringeButton from '../components/shared/CringeButton';
import { useGame } from '../context/useGame';
import { gameLevels } from '../data/gameConfig';
import confetti from 'canvas-confetti';

export default function WheresMegan() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [shaking, setShaking] = useState(false);
  const [showSayLess, setShowSayLess] = useState(false);
  const [sayLessPos, setSayLessPos] = useState({ x: 0, y: 0 });
  const [flashRed, setFlashRed] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const currentLevel = Math.min(state.currentLevel, gameLevels.length - 1);
  const level = gameLevels[currentLevel];
  const allLevelsComplete = state.currentLevel >= gameLevels.length;

  const levelFoundMegans = useMemo(
    () => level.megans.filter(m => state.foundMegans.includes(m.id)),
    [level.megans, state.foundMegans]
  );
  const levelComplete = levelFoundMegans.length === level.megans.length;

  // Generate stable clutter positions
  const clutterPositions = useMemo(() => {
    const seed = level.id;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    return Array.from({ length: 60 }, (_, i) => {
      const s = (hash * (i + 1) * 2654435761) >>> 0;
      return {
        x: (s % 90) + 2,
        y: ((s >> 8) % 85) + 2,
        size: 20 + (s % 30),
        emoji: level.clutter[i % level.clutter.length],
        rotation: (s % 60) - 30,
      };
    });
  }, [level.id, level.clutter]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || levelComplete || allLevelsComplete) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Check hit
    let hit: string | null = null;
    for (const megan of level.megans) {
      if (state.foundMegans.includes(megan.id)) continue;
      const dx = clickX - megan.x;
      const dy = clickY - megan.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= megan.size / 2 + 3) {
        hit = megan.id;
        break;
      }
    }

    if (hit) {
      // SUCCESS!
      dispatch({ type: 'FIND_MEGAN', meganId: hit });
      setSayLessPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setShowSayLess(true);
      setTimeout(() => setShowSayLess(false), 1500);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#FF69B4', '#B026FF', '#FFD700', '#FF1493'],
      });
    } else {
      // MISS - shake!
      setShaking(true);
      setFlashRed(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setFlashRed(false), 300);
    }
  }, [level.megans, state.foundMegans, levelComplete, allLevelsComplete, dispatch]);

  const handleNextLevel = () => {
    dispatch({ type: 'NEXT_LEVEL' });
  };

  if (allLevelsComplete) {
    return (
      <Window title="Where's Megan? - ALL COMPLETE!" onClose={() => navigate('/')} icon="🦊" width="600px" height="450px">
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <motion.div
            className="text-6xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🦊👑
          </motion.div>
          <h2 className="text-3xl font-bold text-hot-pink-dark text-shadow-glow" style={{ fontFamily: '"Lobster", cursive' }}>
            ALL MEGANS FOUND!
          </h2>
          <p className="text-gray-600 text-center" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            You found every single Megan Fox. You absolute legend.<br />
            Your happiness meter must be through the roof!
          </p>
          <CringeButton onClick={() => navigate('/')}>
            🏠 Back to Desktop
          </CringeButton>
        </div>
      </Window>
    );
  }

  return (
    <Window
      title={`Where's Megan? - ${level.name}`}
      onClose={() => navigate('/')}
      icon="🦊"
      width="800px"
      height="550px"
    >
      <div className="h-full flex flex-col gap-2">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-hot-pink-dark" style={{ fontFamily: '"Lobster", cursive' }}>
              Level {currentLevel + 1}: {level.name}
            </h3>
            <p className="text-xs text-gray-500">{level.description}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-neon-purple">
              🦊 {levelFoundMegans.length}/{level.megans.length}
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          onClick={handleClick}
          className={`flex-1 relative overflow-hidden rounded-lg cursor-crosshair select-none
            ${shaking ? 'animate-shake' : ''}
            ${flashRed ? 'ring-4 ring-red-500' : ''}
          `}
          style={{
            minHeight: '350px',
            backgroundImage: `url(${level.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Clutter emojis */}
          {clutterPositions.map((item, i) => (
            <span
              key={i}
              className="absolute select-none pointer-events-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}px`,
                transform: `rotate(${item.rotation}deg)`,
                opacity: 0.8,
              }}
            >
              {item.emoji}
            </span>
          ))}

          {/* Megan Fox heads (hidden as emojis) */}
          {level.megans.map(megan => (
            <div
              key={megan.id}
              className="absolute pointer-events-none"
              style={{
                left: `${megan.x}%`,
                top: `${megan.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${megan.size}px`,
                opacity: state.foundMegans.includes(megan.id) ? 0.3 : 0.85,
                filter: state.foundMegans.includes(megan.id) ? 'grayscale(1)' : 'none',
                transition: 'opacity 0.3s, filter 0.3s',
              }}
            >
              {state.foundMegans.includes(megan.id) ? '✅' : '🦊'}
            </div>
          ))}

          {/* SAY LESS overlay */}
          <AnimatePresence>
            {showSayLess && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                className="absolute z-20 pointer-events-none"
                style={{ left: sayLessPos.x, top: sayLessPos.y, transform: 'translate(-50%, -50%)' }}
              >
                <span
                  className="text-4xl font-bold text-shadow-gold"
                  style={{
                    fontFamily: '"Lobster", cursive',
                    color: '#FFD700',
                    WebkitTextStroke: '1px #FFA500',
                  }}
                >
                  SAY LESS 🔥
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Level Complete */}
        <AnimatePresence>
          {levelComplete && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center py-2"
            >
              <p className="text-hot-pink-dark font-bold mb-2" style={{ fontFamily: '"Lobster", cursive' }}>
                Level Complete! All Megans Found! 🎉
              </p>
              {currentLevel < gameLevels.length - 1 ? (
                <CringeButton onClick={handleNextLevel}>
                  ➡️ Next Level
                </CringeButton>
              ) : (
                <CringeButton onClick={() => { dispatch({ type: 'NEXT_LEVEL' }); navigate('/'); }}>
                  🏆 All Levels Done!
                </CringeButton>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
