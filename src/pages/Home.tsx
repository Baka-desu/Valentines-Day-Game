import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/useGame';

const modules = [
  { path: '/rizz', icon: '😏', label: 'Rizz-o-Matic', desc: 'Generate cringe pickup lines', color: 'from-pink-400 to-rose-500' },
  { path: '/calculator', icon: '💕', label: 'Love Calculator', desc: 'Calculate your love %', color: 'from-purple-400 to-violet-500' },
  { path: '/chat', icon: '💬', label: 'Cringe Chat', desc: 'Chat with your crush', color: 'from-fuchsia-400 to-pink-500' },
  { path: '/date', icon: '🌹', label: 'Date Scenario', desc: 'Generate cringe dates', color: 'from-red-400 to-rose-500' },
  { path: '/wheres-megan', icon: '🦊', label: "Where's Megan?", desc: 'Find Megan Fox!', color: 'from-amber-400 to-orange-500' },
  { path: '/win-her-back', icon: '💔', label: 'Win Her Back', desc: 'Win her back with strategy', color: 'from-pink-300 to-rose-400' },
];

export default function Home() {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8">
      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1
          className="text-5xl md:text-7xl text-white text-shadow-glow mb-2"
          style={{ fontFamily: '"Lobster", cursive' }}
        >
          Valentine's Day
        </h1>
        <h2
          className="text-2xl md:text-4xl text-warning-yellow font-bold"
          style={{ fontFamily: '"Comic Sans MS", cursive', textShadow: '2px 2px 0 #B026FF' }}
        >
          CRINGE GAME 💕
        </h2>
        {state.happinessMeter > 0 && (
          <p className="text-white/80 text-sm mt-1">
            Progress: {state.happinessMeter}% | Megans Found: {state.meganFoxesFound}
          </p>
        )}
      </motion.div>

      {/* Desktop Icons Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {modules.map((mod) => (
          <motion.button
            key={mod.path}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(mod.path)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${mod.color} 
              shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border-2 border-white/30
              min-w-[120px]`}
          >
            <span className="text-4xl drop-shadow-lg">{mod.icon}</span>
            <span className="text-white font-bold text-sm text-center drop-shadow" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
              {mod.label}
            </span>
            <span className="text-white/70 text-[10px] text-center">{mod.desc}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-white/60 text-sm text-center"
      >
        Reach 100% happiness to unlock the HAPPY ENDING! 🎉
      </motion.p>

      {/* Reset button */}
      {state.happinessMeter > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (confirm('Reset all progress? Your happiness will go back to 0!')) {
              window.location.reload();
              localStorage.removeItem('valentine-game-state');
            }
          }}
          className="text-white/40 text-xs underline hover:text-white/60 cursor-pointer"
        >
          Reset Progress
        </motion.button>
      )}
    </div>
  );
}
