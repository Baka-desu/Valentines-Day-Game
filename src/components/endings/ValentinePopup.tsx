import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface ValentinePopupProps {
  onYes: () => void;
}

export default function ValentinePopup({ onYes }: ValentinePopupProps) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [noScale, setNoScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const padding = 60;
    const maxX = container.width - padding;
    const maxY = container.height - padding;

    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
    setNoAttempts(prev => {
      const next = prev + 1;
      if (next >= 5) setNoScale(Math.max(0.1, 1 - (next - 4) * 0.2));
      return next;
    });
  }, []);

  const noVisible = noScale > 0.1;

  return (
    <motion.div
      ref={containerRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15 }}
      className="z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-4 text-center relative"
      style={{ border: '4px solid #FF69B4', minHeight: '300px', minWidth: '400px' }}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        💕
      </motion.div>

      <h2
        className="text-3xl md:text-4xl font-bold text-hot-pink-dark mb-2 text-shadow-glow"
        style={{ fontFamily: '"Lobster", cursive' }}
      >
        Will You Be My Valentine?
      </h2>

      <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
        Choose wisely... (there's only one right answer)
      </p>

      <div className="flex items-center justify-center gap-8 relative" style={{ minHeight: '80px' }}>
        {/* YES Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="px-10 py-4 bg-gradient-to-r from-hot-pink to-neon-purple text-white text-xl font-bold rounded-full shadow-xl cursor-pointer z-10"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Yes! 💕
        </motion.button>

        {/* NO Button (runs away) */}
        {noVisible && (
          <motion.button
            animate={{ x: noPos.x, y: noPos.y, scale: noScale, opacity: noScale }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="px-6 py-3 bg-gray-300 text-gray-600 text-lg font-bold rounded-full shadow cursor-pointer absolute"
            style={{ fontFamily: '"Comic Sans MS", cursive' }}
          >
            No
          </motion.button>
        )}
      </div>

      {noAttempts > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400 mt-6"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          {noAttempts < 3
            ? "The 'No' button seems to be... running away? 🤔"
            : noAttempts < 6
              ? "It really doesn't want to be clicked! 😂"
              : "Fine, 'No' has left the chat. Only love remains. 💕"}
        </motion.p>
      )}
    </motion.div>
  );
}
