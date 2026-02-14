import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Window from '../components/Layout/Window';
import { useGame } from '../context/useGame';
import { chatResponses, keywordResponses, type ChatResponse } from '../data/chatResponses';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function getResponse(userMsg: string, messageCount: number): string {
  const lower = userMsg.toLowerCase();

  // Check keyword responses first
  for (const [keyword, responses] of Object.entries(keywordResponses)) {
    if (lower.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Every 5th message, use a declaration
  if (messageCount % 5 === 0 && messageCount > 0) {
    const declarations = chatResponses.filter(r => r.type === 'declaration');
    return declarations[Math.floor(Math.random() * declarations.length)].text;
  }

  // Every 3rd message, use a question
  if (messageCount % 3 === 0) {
    const questions = chatResponses.filter(r => r.type === 'question');
    return questions[Math.floor(Math.random() * questions.length)].text;
  }

  // Filter by escalating intensity
  let pool: ChatResponse[];
  if (messageCount < 3) {
    pool = chatResponses.filter(r => ['greeting', 'pickup', 'compliment'].includes(r.type));
  } else if (messageCount < 8) {
    pool = chatResponses.filter(r => ['pickup', 'compliment', 'declaration', 'question'].includes(r.type));
  } else {
    pool = chatResponses.filter(r => ['declaration', 'desperate', 'question'].includes(r.type));
  }

  return pool[Math.floor(Math.random() * pool.length)].text;
}

export default function CringeChat() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "OMG HI!!! I've literally been waiting my WHOLE LIFE for you to open this chat 😍💕✨", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now(), text: input.trim(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      const response = getResponse(userMsg.text, msgCount);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
      setIsTyping(false);
      setMsgCount(c => c + 1);
      dispatch({ type: 'SEND_MESSAGE' });
    }, delay);
  };

  return (
    <Window title="Cringe Chat - ❤️ Your Secret Admirer ❤️" onClose={() => navigate('/')} icon="💬" width="450px" height="550px">
      <div className="h-full flex flex-col -m-3">
        {/* Chat header */}
        <div className="bg-gradient-to-r from-hot-pink to-neon-purple px-3 py-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg">
            😍
          </div>
          <div>
            <p className="text-white font-bold text-sm">Your Secret Admirer</p>
            <p className="text-white/70 text-[10px]">
              {isTyping ? 'typing...' : 'online (always, for you)'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-pink-50 to-purple-50">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-hot-pink text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-pink-100'
                  }`}
                  style={{ fontFamily: '"Comic Sans MS", cursive' }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-pink-100 flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-hot-pink rounded-full inline-block"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-2 bg-white border-t border-pink-200 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Say something cringe..."
            className="flex-1 px-3 py-2 rounded-full border-2 border-hot-pink text-sm focus:outline-none focus:border-neon-purple"
            style={{ fontFamily: '"Comic Sans MS", cursive' }}
            disabled={isTyping}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-hot-pink to-neon-purple text-white flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            💌
          </motion.button>
        </div>
      </div>
    </Window>
  );
}
