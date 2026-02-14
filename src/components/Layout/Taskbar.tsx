import { useLocation } from 'react-router-dom';
import { useGame } from '../../context/useGame';

const moduleNames: Record<string, string> = {
  '/': '🏠 Desktop',
  '/rizz': '😏 Rizz-o-Matic',
  '/calculator': '💕 Love Calculator',
  '/chat': '💬 Cringe Chat',
  '/date': '🌹 Date Scenario',
  '/wheres-megan': '🦊 Where\'s Megan?',
};

export default function Taskbar() {
  const location = useLocation();
  const { state } = useGame();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#C0C0C0] win98-border flex items-center px-1 z-50 gap-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
      {/* Start Button */}
      <button className="h-6 px-2 win98-border flex items-center gap-1 text-[11px] font-bold hover:brightness-95 active:win98-border-inset bg-[#C0C0C0]">
        <span className="text-sm">💖</span>
        <span>Start</span>
      </button>

      <div className="w-px h-5 bg-[#808080] mx-1" />

      {/* Active Window */}
      <div className="h-6 px-3 win98-border-inset flex items-center text-[11px] bg-white/50 min-w-[120px]">
        {moduleNames[location.pathname] || '🏠 Desktop'}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System Tray */}
      <div className="h-6 px-2 win98-border-inset flex items-center gap-2 text-[11px]">
        <span title={`Happiness: ${state.happinessMeter}%`}>
          {state.happinessMeter >= 75 ? '❤️‍🔥' : state.happinessMeter >= 50 ? '❤️' : state.happinessMeter >= 25 ? '🩷' : '🤍'}
        </span>
        <span>14:02</span>
      </div>
    </div>
  );
}
