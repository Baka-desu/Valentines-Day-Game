import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/useGame';
import Desktop from './components/Layout/Desktop';
import Home from './pages/Home';
import RizzOMatic from './pages/RizzOMatic';
import LoveCalculator from './pages/LoveCalculator';
import CringeChat from './pages/CringeChat';
import DateScenario from './pages/DateScenario';
import WheresMegan from './pages/WheresMegan';
import HappyEnding from './components/endings/HappyEnding';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function HappinessWatcher() {
  const { state } = useGame();
  const navigate = useNavigate();
  const location = useLocation();
  const triggered = useRef(false);

  useEffect(() => {
    if (state.happinessMeter >= 100 && !triggered.current && location.pathname !== '/happy-ending') {
      triggered.current = true;
      const timer = setTimeout(() => navigate('/happy-ending'), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.happinessMeter, navigate, location.pathname]);

  return null;
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <HappinessWatcher />
        <Routes>
          <Route path="/" element={<Desktop />}>
            <Route index element={<Home />} />
            <Route path="rizz" element={<RizzOMatic />} />
            <Route path="calculator" element={<LoveCalculator />} />
            <Route path="chat" element={<CringeChat />} />
            <Route path="date" element={<DateScenario />} />
            <Route path="wheres-megan" element={<WheresMegan />} />
          </Route>
          <Route path="/happy-ending" element={<HappyEnding />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
