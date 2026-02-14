import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Window from '../components/Layout/Window';
import CringeButton from '../components/shared/CringeButton';
import PinkInput from '../components/shared/PinkInput';
import { useGame } from '../context/useGame';
import { pickupLines } from '../data/pickupLines';

const fields = [
  { key: 'name', label: 'Crush\'s Name', placeholder: 'e.g., Megan' },
  { key: 'food', label: 'A Food', placeholder: 'e.g., pizza' },
  { key: 'hobby', label: 'A Hobby', placeholder: 'e.g., gaming' },
  { key: 'animal', label: 'An Animal', placeholder: 'e.g., penguin' },
  { key: 'adjective', label: 'An Adjective', placeholder: 'e.g., sparkly' },
  { key: 'color', label: 'A Color', placeholder: 'e.g., purple' },
];

export default function RizzOMatic() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult('');

    setTimeout(() => {
      const available = pickupLines.filter(pl =>
        pl.requiredFields.every(f => inputs[f]?.trim())
      );

      const pool = available.length > 0 ? available : pickupLines.slice(0, 5);
      const chosen = pool[Math.floor(Math.random() * pool.length)];

      let line = chosen.template;
      for (const [key, value] of Object.entries(inputs)) {
        line = line.replace(new RegExp(`\\{${key}\\}`, 'g'), value || '???');
      }
      // Replace any remaining placeholders
      line = line.replace(/\{(\w+)\}/g, '???');

      setResult(line);
      setIsGenerating(false);
      dispatch({ type: 'GENERATE_RIZZ' });
    }, 1500);
  };

  return (
    <Window title="Rizz-o-Matic 3000 - Maximum Cringe Edition" onClose={() => navigate('/')} icon="😏" width="650px" height="580px">
      <div className="h-full flex flex-col gap-3">
        <h2 className="text-hot-pink-dark font-bold text-xl text-center" style={{ fontFamily: '"Lobster", cursive' }}>
          🔥 The Rizz-o-Matic 3000 🔥
        </h2>
        <p className="text-center text-sm text-gray-500">Fill in the blanks. Get maximum cringe. No refunds.</p>

        <div className="grid grid-cols-2 gap-2">
          {fields.map(f => (
            <PinkInput
              key={f.key}
              label={f.label}
              placeholder={f.placeholder}
              value={inputs[f.key] || ''}
              onChange={(e) => setInputs(prev => ({ ...prev, [f.key]: e.target.value }))}
            />
          ))}
        </div>

        <div className="text-center">
          <CringeButton onClick={handleGenerate} disabled={isGenerating} size="lg">
            {isGenerating ? '✨ Generating Rizz... ✨' : '🔥 Generate Rizz 🔥'}
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
              <motion.span
                className="text-4xl inline-block"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                💕
              </motion.span>
              <p className="text-hot-pink text-sm mt-2">Consulting the cringe gods...</p>
            </motion.div>
          )}

          {result && !isGenerating && (
            <motion.div
              key="result"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              className="bg-gradient-to-r from-hot-pink/10 to-neon-purple/10 border-2 border-hot-pink rounded-xl p-4 text-center"
            >
              <motion.p
                className="text-lg font-bold text-hot-pink-dark animate-bounce-text"
                style={{ fontFamily: '"Comic Sans MS", cursive' }}
              >
                "{result}"
              </motion.p>
              <div className="flex gap-2 justify-center mt-3">
                <CringeButton
                  size="sm"
                  variant="secondary"
                  onClick={() => navigator.clipboard.writeText(result)}
                >
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
