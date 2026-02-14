import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Window from '../components/Layout/Window';
import CringeButton from '../components/shared/CringeButton';
import { useGame } from '../context/useGame';

type Personality = 'Romantic' | 'Practical' | 'Materialistic' | 'Intellectual' | 'Dramatic';

const personalities: Personality[] = ['Romantic', 'Practical', 'Materialistic', 'Intellectual', 'Dramatic'];

const ACTIONS = [
  { key: 'flowers', label: 'Flowers', cost: 500 },
  { key: 'chocolate', label: 'Chocolate', cost: 700 },
  { key: 'letter', label: 'Handwritten Letter', cost: 0 },
  { key: 'apologize', label: 'Sincere Apology', cost: 0 },
  { key: 'spam', label: 'Spam Texting', cost: 0 },
  { key: 'bag', label: 'Expensive Bag', cost: 20000 },
];

export default function WinHerBack() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [budget, setBudget] = useState(5000);
  const [turns, setTurns] = useState(0);
  const [reaction, setReaction] = useState<{ text: string; type: 'positive' | 'neutral' | 'negative' } | null>(null);
  const [localMeter, setLocalMeter] = useState(0);
  const [finalResult, setFinalResult] = useState<null | { outcome: 'reunited' | 'friendzone' | 'left' | 'close'; message: string }>(null);

  // assign hidden personality once per mount
  const personality = useMemo(() => personalities[Math.floor(Math.random() * personalities.length)], []);

  useEffect(() => {
    // init local meter
    setLocalMeter(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function makeReaction(person: typeof personalities[number], key: string, delta: number, meter: number) {
    const positiveReplies: Record<string, string[]> = {
      flowers: [
        'Aww, that made me smile.',
        'Cute! Thank you.',
        'That was unexpected—and sweet.',
        'You actually remembered the small things.'
      ],
      chocolate: [
        'Sweet!',
        'You remembered my favorite.',
        'This hits the sweet spot.',
        'I like that you tried.'
      ],
      letter: [
        'This is so thoughtful.',
        'You actually wrote this?',
        'I can tell you put effort in.',
        'Reading this made me tear up a bit.'
      ],
      apologize: [
        'That means a lot.',
        'I appreciate your honesty.',
        'This is a start.',
        'Okay—thank you for saying that.'
      ],
      bag: [
        'Wow, that is flashy.',
        'Lip gloss and receipts—ok?',
        'I see you went all out.',
        'Impressive, but words matter too.'
      ],
      spam: [
        'Please stop texting me so much.',
        'This is too much.',
        'You\'re being clingy.',
        'I need space.'
      ],
    };

    const negativeReplies: Record<string, string[]> = {
      flowers: [
        'Nice, but it feels fake.',
        'Flowers aren\'t enough.',
        'Is this a last-minute move?',
        'It feels performative.'
      ],
      chocolate: [
        'Thanks, but actions matter more.',
        'I like it, but...'
      ],
      letter: [
        'A letter? Hmm.',
        'You can do better.',
        'Words without change are empty.'
      ],
      apologize: [
        'Talk is cheap.',
        'Show, don\'t tell.',
        'Sorry doesn\'t fix everything.'
      ],
      bag: [
        'Is this supposed to fix things?',
        'I don\'t like being bought.',
        'This makes me uncomfortable.'
      ],
      spam: [
        'Stop. Block.',
        'You\'re being clingy.'
      ],
    };

    // personality tweaks for flavor (not full logic)
    if (delta >= 12) {
      const p = pick(positiveReplies[key] ?? ['Thanks.']);
      return { text: p, type: 'positive' as const };
    }

    if (delta <= -5) {
      const p = pick(negativeReplies[key] ?? ['...']);
      return { text: p, type: 'negative' as const };
    }

    // neutral / mixed
    const neutral = [
      'Hmm.',
      'I need time to think.',
      'Okay.',
      'Can we not do this right now?',
      'I\'m not sure what to say.'
    ];
    return { text: pick(neutral), type: 'neutral' as const };
  }

  function applyAction(key: string) {
    // action must allow even if cost > budget for free items; otherwise block
    let cost = ACTIONS.find(a => a.key === key)!.cost;
    if (cost > budget) {
      setReaction({ text: 'You look broke. Nice try.', type: 'negative' });
      return;
    }

    setBudget(b => b - cost);
    setTurns(t => t + 1);

    // base effects
    let delta = 0;
    switch (key) {
      case 'flowers': delta = 5; break;
      case 'chocolate': delta = 7; break;
      case 'letter': delta = 15; break;
      case 'apologize': delta = 20; break;
      case 'spam': delta = -10; break;
      case 'bag': delta = 25; break;
      default: delta = 0;
    }

    // personality modifiers (secret)
    switch (personality) {
      case 'Romantic':
        if (key === 'letter') delta += 10;
        if (key === 'bag') delta -= 10;
        break;
      case 'Practical':
        if (key === 'apologize') delta += 10;
        if (key === 'flowers') delta -= 2;
        break;
      case 'Materialistic':
        if (key === 'bag') delta += 15;
        if (key === 'letter') delta -= 5;
        break;
      case 'Intellectual':
        if (key === 'letter') delta += 5;
        if (key === 'spam') delta -= 5;
        break;
      case 'Dramatic':
        if (key === 'bag') delta += 5;
        if (key === 'apologize') delta -= 5;
        break;
    }

    // timing / chance based backfires
    if (key === 'bag' && localMeter < 70) {
      // higher chance to backfire when meter low
      if (Math.random() < 0.6) {
        delta -= 15;
        setReaction({ text: 'Flashy gift backfired badly (timing).', type: 'negative' });
      }
    }

    // small random flare: sometimes even good actions do little
    if (delta > 0 && Math.random() < 0.12) {
      delta = Math.max(0, delta - 8);
      setReaction({ text: "It didn't land as expected.", type: 'neutral' });
    }

    // apply to local meter only
    setLocalMeter(m => Math.max(0, Math.min(100, m + delta)));

    const react = makeReaction(personality, key, delta, localMeter + delta);
    setReaction(react);
  }

  function finishEarly() {
    // final evaluation based on global meter
    const meter = localMeter;
    if (meter >= 100) {
      navigate('/happy-ending');
      return;
    }

    if (meter >= 85) {
      setFinalResult({ outcome: 'reunited', message: 'She said yes — you reunited! ❤️' });
      // reward global happiness only when reunited
      dispatch({ type: 'INCREASE_HAPPINESS', amount: 40 });
      return;
    }

    if (meter >= 60) {
      setFinalResult({ outcome: 'close', message: 'She is considering you — almost there.' });
      return;
    }

    if (meter >= 40) {
      setFinalResult({ outcome: 'friendzone', message: 'You are talking again but it looks like the friendzone.' });
      return;
    }

    setFinalResult({ outcome: 'left', message: 'She moved on. Ouch.' });
  }

  return (
    <Window title="Win Her Back" onClose={() => navigate('/')} icon="💔" width="700px" height="620px">
      <div className="h-full flex flex-col gap-3">
        <h2 className="text-hot-pink-dark font-bold text-xl text-center" style={{ fontFamily: '"Lobster", cursive' }}>
          💔 Win Her Back — Mini Game
        </h2>

        <div className="flex gap-4 items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Budget: <span className="font-bold">₹{budget}</span></p>
            <p className="text-sm text-gray-600">Turns used: <span className="font-bold">{turns}</span></p>
            <p className="text-sm text-gray-600">Relationship Meter: <span className="font-bold">{localMeter}%</span></p>
          </div>

            <div className="flex gap-2">
              <CringeButton size="sm" onClick={() => {
                // reset this mini-game only
                setBudget(5000);
                setLocalMeter(0);
                setTurns(0);
                setReaction(null);
                setFinalResult(null);
              }}>
                Play Again
              </CringeButton>
              <CringeButton size="sm" variant="secondary" onClick={() => navigate('/') }>
                Back to Desktop
              </CringeButton>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {ACTIONS.map(act => (
            <div key={act.key} className="p-2 bg-white/90 rounded shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">{act.label}</div>
                  <div className="text-[12px] text-gray-500">Cost: ₹{act.cost}</div>
                </div>
                <div>
                  <CringeButton size="sm" onClick={() => applyAction(act.key)} disabled={!!finalResult}>
                    Do
                  </CringeButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live reaction box */}
        <div className="mt-3">
          <div className="text-sm font-bold mb-1">Her Reaction</div>
          <div className={`p-3 rounded ${reaction ? (reaction.type === 'positive' ? 'bg-green-50 text-green-800' : reaction.type === 'negative' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800') : 'bg-white/80 text-gray-500'}`}>
            {reaction ? reaction.text : 'No reaction yet.'}
          </div>
        </div>

        {/* no action log — reactions are live below */}

        <div className="text-center mt-auto">
          <div className="text-xs text-gray-500 mb-1">(Hidden personality affects outcomes)</div>
          <div className="flex gap-2 justify-center">
            <CringeButton variant="secondary" onClick={finishEarly} disabled={!!finalResult}>
              Finish Attempt
            </CringeButton>
          </div>
        </div>
        
        {/* Final result panel */}
        {finalResult && (
          <div className="mt-3 p-3 bg-white/95 rounded shadow-inner text-center">
            <div className="font-bold text-lg mb-1">{finalResult.outcome === 'reunited' ? 'Reunited ❤️' : finalResult.outcome === 'friendzone' ? 'Friendzone 😐' : finalResult.outcome === 'close' ? 'Close Call' : 'She Left 💔'}</div>
            <div className="text-sm text-gray-700 mb-3">{finalResult.message}</div>
            <div className="flex gap-2 justify-center">
              <CringeButton onClick={() => {
                // reset local mini-game only
                setBudget(5000);
                setLocalMeter(0);
                setTurns(0);
                setReaction(null);
                setFinalResult(null);
              }}>
                Play Again
              </CringeButton>
              <CringeButton variant="secondary" onClick={() => navigate('/')}>
                Back to Desktop
              </CringeButton>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
}
