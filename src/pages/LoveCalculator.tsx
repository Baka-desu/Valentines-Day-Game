import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Window from '../components/Layout/Window';
import CringeButton from '../components/shared/CringeButton';
import PinkInput from '../components/shared/PinkInput';
import { useGame } from '../context/useGame';
import { calculateLovePercentage, getLoveMessage } from '../utils/calculations';

export default function LoveCalculator() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [gaugeAngle, setGaugeAngle] = useState(0);

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) return;
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      const pct = calculateLovePercentage(name1, name2);
      setResult(pct);
      setGaugeAngle(pct >= 1000000 ? 180 : (pct / 100) * 180);
      setIsCalculating(false);
      dispatch({ type: 'CALCULATE_LOVE' });
    }, 2500);
  };

  const displayPercent = result !== null ? (result >= 1000000 ? '1,000,000%' : `${result}%`) : '';
  const isMeganMode = result !== null && result >= 1000000;

  return (
    <Window title="Love Probability Calculator v4.20" onClose={() => navigate('/')} icon="💕" width="550px" height="560px">
      <div className="h-full flex flex-col gap-4 items-center">
        <h2 className="text-hot-pink-dark font-bold text-xl" style={{ fontFamily: '"Lobster", cursive' }}>
          💕 Love Probability Calculator 💕
        </h2>

        <div className="w-full flex items-center gap-2">
          <div className="flex-1">
            <PinkInput
              label="Your Name"
              placeholder="Enter your name..."
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <motion.span
            className="text-3xl mt-5"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ❤️
          </motion.span>
          <div className="flex-1">
            <PinkInput
              label="Their Name"
              placeholder="Enter crush's name..."
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
        </div>

        <p className="text-[10px] text-gray-400 -mt-2">psst... try typing "Megan Fox" 🦊</p>

        <CringeButton onClick={handleCalculate} disabled={isCalculating || !name1.trim() || !name2.trim()} size="lg">
          {isCalculating ? '💕 Calculating Love... 💕' : '🔮 Calculate Love 🔮'}
        </CringeButton>

        {/* Gauge */}
        <div className="relative w-52 h-28 mt-2">
          {/* Gauge background */}
          <svg viewBox="0 0 200 110" className="w-full h-full">
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="#eee"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * (gaugeAngle / 180))}
              style={{ transition: isCalculating ? 'none' : 'stroke-dashoffset 1.5s ease-out' }}
            />
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="50%" stopColor="#B026FF" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
          </svg>

          {/* Needle */}
          <motion.div
            className="absolute bottom-1 left-1/2 origin-bottom"
            style={{ width: '2px', height: '70px', marginLeft: '-1px' }}
            animate={{
              rotate: isCalculating
                ? [0, 360, 720, 1080, 1440]
                : -90 + gaugeAngle,
            }}
            transition={
              isCalculating
                ? { duration: 2, ease: 'linear' }
                : { type: 'spring', damping: 8, stiffness: 40 }
            }
          >
            <div className="w-full h-full bg-red-500 rounded-full" />
          </motion.div>
        </div>

        <AnimatePresence>
          {result !== null && !isCalculating && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className={`text-center p-4 rounded-xl w-full ${isMeganMode ? 'bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200' : 'bg-gradient-to-r from-hot-pink/10 to-neon-purple/10'} border-2 border-hot-pink`}
            >
              <motion.p
                className={`font-bold ${isMeganMode ? 'text-4xl text-shadow-gold' : 'text-3xl'} text-hot-pink-dark`}
                animate={isMeganMode ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
                transition={{ repeat: isMeganMode ? Infinity : 0, duration: 1 }}
              >
                {displayPercent}
              </motion.p>
              <p className="text-sm mt-1 text-gray-600">
                {getLoveMessage(result)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
