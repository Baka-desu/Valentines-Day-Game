import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Window from '../components/Layout/Window';
import CringeButton from '../components/shared/CringeButton';
import { useGame } from '../context/useGame';
import { dateOptions, dateEnhancements, dateTwists } from '../data/dateScenarios';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function DateScenario() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [selections, setSelections] = useState({
    location: '',
    activity: '',
    weather: '',
    guest: '',
  });
  const [scenario, setScenario] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const dateNumberRef = useRef(Math.floor(Math.random() * 9999));

  const allSelected = selections.location && selections.activity && selections.weather && selections.guest;

  const handleGenerate = () => {
    if (!allSelected) return;
    setIsGenerating(true);
    setScenario('');

    setTimeout(() => {
      const enhancement = pickRandom(dateEnhancements);
      const twist = pickRandom(dateTwists);

      const text = `You are ${selections.activity} with ${selections.guest} at ${selections.location} during ${selections.weather}, ${enhancement}. ${twist}`;
      setScenario(text);
      setIsGenerating(false);
      dispatch({ type: 'GENERATE_DATE' });
    }, 2000);
  };

  const categories = [
    { key: 'location' as const, label: '📍 Location', options: dateOptions.locations },
    { key: 'activity' as const, label: '🎭 Activity', options: dateOptions.activities },
    { key: 'weather' as const, label: '🌦️ Weather', options: dateOptions.weathers },
    { key: 'guest' as const, label: '⭐ Special Guest', options: dateOptions.guests },
  ];

  return (
    <Window title="Cringe Date Scenario Generator" onClose={() => navigate('/')} icon="🌹" width="650px" height="580px">
      <div className="h-full flex flex-col gap-3 overflow-y-auto">
        <h2 className="text-hot-pink-dark font-bold text-xl text-center" style={{ fontFamily: '"Lobster", cursive' }}>
          🌹 Cringe Date Scenario Generator 🌹
        </h2>
        <p className="text-center text-sm text-gray-500">Pick your ingredients for the perfect(ly cringe) date!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map(cat => (
            <div key={cat.key} className="space-y-1">
              <label className="text-sm font-bold text-hot-pink-dark">{cat.label}</label>
              <div className="flex flex-wrap gap-1">
                {cat.options.map(opt => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelections(prev => ({ ...prev, [cat.key]: opt }))}
                    className={`px-2 py-1 text-xs rounded-full border cursor-pointer transition-colors ${
                      selections[cat.key] === opt
                        ? 'bg-hot-pink text-white border-hot-pink-dark'
                        : 'bg-white text-gray-700 border-pink-300 hover:bg-pink-50'
                    }`}
                    style={{ fontFamily: '"Comic Sans MS", cursive' }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CringeButton onClick={handleGenerate} disabled={!allSelected || isGenerating} size="lg">
            {isGenerating ? '🌹 Manifesting Romance... 🌹' : '✨ Generate Date ✨'}
          </CringeButton>
        </div>

        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <motion.div
                className="text-5xl inline-block"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                🌹
              </motion.div>
              <p className="text-hot-pink text-sm mt-2">The romance gods are deliberating...</p>
            </motion.div>
          )}

          {scenario && !isGenerating && (
            <motion.div
              key="result"
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              {/* Polaroid frame */}
              <div className="bg-white p-4 shadow-xl mx-auto max-w-md" style={{ transform: 'rotate(-2deg)' }}>
                <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 h-40 flex items-center justify-center text-5xl rounded">
                  {selections.guest.includes('Megan') ? '🦊' : selections.guest.includes('Shrek') ? '🟢' : selections.guest.includes('Danny') ? '🎬' : '💕'}
                  {selections.weather.includes('thunder') ? '⛈️' : selections.weather.includes('tornado') ? '🌪️' : '✨'}
                  {selections.location.includes('Taco') ? '🌮' : selections.location.includes('McDonald') ? '🍟' : '🍕'}
                </div>
                <p className="mt-3 text-sm text-gray-800 italic text-center" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                  "{scenario}"
                </p>
                <p className="text-[10px] text-gray-400 text-right mt-2">
                  📸 {new Date().toLocaleDateString()} - Cringe Date #{dateNumberRef.current}
                </p>
              </div>

              <div className="flex gap-2 justify-center mt-3">
                <CringeButton size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(scenario)}>
                  📋 Copy
                </CringeButton>
                <CringeButton size="sm" onClick={handleGenerate}>
                  🔄 Another!
                </CringeButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
