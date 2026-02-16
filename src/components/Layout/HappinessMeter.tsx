import { useGame } from '../../context/useGame';
import { motion } from 'framer-motion';
import { useRef, useSyncExternalStore, useCallback } from 'react';
import { happinessMilestones } from '../../data/gameConfig';

// Simple external store for milestone message to avoid setState in effects
let milestoneMsg = '';
const listeners = new Set<() => void>();
function setMilestone(msg: string) {
  milestoneMsg = msg;
  listeners.forEach(l => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function getSnapshot() {
  return milestoneMsg;
}

export default function HappinessMeter() {
  const { state } = useGame();
  const showMilestone = useSyncExternalStore(subscribe, getSnapshot);
  const lastTriggered = useRef(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const triggerMilestone = useCallback((msg: string) => {
    clearTimeout(timerRef.current);
    setMilestone(msg);
    timerRef.current = setTimeout(() => setMilestone(''), 3000);
  }, []);

  // Check for milestone - only trigger when happiness changes to a milestone value
  if (state.happinessMeter !== lastTriggered.current) {
    const milestone = happinessMilestones.find(m => m.threshold === state.happinessMeter);
    if (milestone) {
      lastTriggered.current = state.happinessMeter;
      // Schedule the milestone display for after render
      queueMicrotask(() => triggerMilestone(milestone.message));
    }
  }

  const isNear100 = state.happinessMeter >= 90;

  return (
    <div className="fixed top-3 right-3 z-50 w-56">
      <div className="bg-[#C0C0C0] win98-border p-2">
        <div className="text-[11px] font-bold text-center mb-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          ❤️ Happiness Meter ❤️
        </div>
        <div className="w-full h-5 win98-border-inset bg-white relative overflow-hidden">
          <motion.div
            className={`h-full ${isNear100 ? 'animate-pulse-glow' : ''}`}
            style={{
              background: `linear-gradient(90deg, #FF69B4, #B026FF, #FF1493)`,
            }}
            animate={{ width: `${state.happinessMeter}%` }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 0 white' }}
          >
            {state.happinessMeter}%
          </span>
        </div>

        {isNear100 && (
          <motion.div
            className="text-[9px] text-center text-hot-pink-dark font-bold mt-1"
            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            ⚠️ CRITICAL MASS ⚠️
          </motion.div>
        )}

        <div className="flex justify-between text-[9px] mt-1 text-gray-600" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          <span>🦊 {state.meganFoxesFound} found</span>
          <span>💬 {state.chatMessagesSent} msgs</span>
        </div>
      </div>

      {showMilestone && (
        <motion.div
          key={showMilestone}
          initial={{ y: -20, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="mt-1 bg-hot-pink text-white text-center text-sm font-bold py-1 px-2 rounded shadow-lg"
        >
          {showMilestone}
        </motion.div>
      )}
    </div>
  );
}
