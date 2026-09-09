import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useSwarm } from '@easymoney/swarm';
import { useDemo } from '@easymoney/demo-engine';
import { BootSequence } from './components/BootSequence';
import { Dashboard } from './pages/Dashboard';
import { TerminalPage } from './pages/TerminalPage';
import { WalletPage } from './pages/WalletPage';
import { SwarmPage } from './pages/SwarmPage';
import { EarningsPage } from './pages/EarningsPage';
import { DevicePage } from './pages/DevicePage';
import './index.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { initializeDemo } = useSwarm();
  const { startSimulation } = useDemo();

  useEffect(() => {
    initializeDemo(100);
    startSimulation();
  }, [initializeDemo, startSimulation]);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'SWARM', path: '/swarm' },
    { label: 'WORK', path: '/work' },
    { label: 'EARNINGS', path: '/earnings' },
    { label: 'WALLET', path: '/wallet' },
    { label: 'DEVICE', path: '/device' },
    { label: 'TERMINAL', path: '/terminal' },
  ];

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex border-b-2 border-easymoney-green bg-black bg-opacity-80 sticky top-0 z-40">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 border-r border-easymoney-green text-sm transition-colors ${
              location.pathname === item.path
                ? 'bg-easymoney-green bg-opacity-20'
                : 'hover:bg-easymoney-green hover:bg-opacity-10'
            }`}
            style={{
              textShadow: location.pathname === item.path ? '0 0 10px #00FF66' : 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/swarm" element={<SwarmPage />} />
        <Route path="/work" element={<SwarmPage />} />
        <Route path="/earnings" element={<EarningsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/device" element={<DevicePage />} />
        <Route path="/terminal" element={<TerminalPage />} />
      </Routes>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t-2 border-easymoney-green bg-black bg-opacity-90 flex justify-around z-40">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 py-3 text-xs text-center transition-colors ${
              location.pathname === item.path
                ? 'bg-easymoney-green bg-opacity-20'
                : 'hover:bg-easymoney-green hover:bg-opacity-10'
            }`}
            style={{
              textShadow: location.pathname === item.path ? '0 0 10px #00FF66' : 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const [showBoot, setShowBoot] = useState(() => {
    return localStorage.getItem('skipBoot') !== 'true';
  });

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  const handleSkipBoot = () => {
    localStorage.setItem('skipBoot', 'true');
    setShowBoot(false);
  };

  if (showBoot) {
    return <BootSequence onComplete={handleBootComplete} onSkip={handleSkipBoot} />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
