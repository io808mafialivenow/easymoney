import React, { useEffect, useState } from 'react';
import { CRTOverlay, Scanlines, GlowText, ParticleField } from '@easymoney/ui';

interface BootSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, onSkip }) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage < 5) {
      const timer = setTimeout(() => {
        setStage(stage + 1);
        setProgress(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage < 5) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 40, 100));
      }, 300);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const stages = [
    { label: 'MEMORY', status: 'OK' },
    { label: 'GPU', status: 'OK' },
    { label: 'STORAGE', status: 'OK' },
    { label: 'NETWORK', status: 'OK' },
    { label: 'WALLET', status: 'OK' },
  ];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <CRTOverlay intensity={0.1} />
      <Scanlines />

      <div className="text-center font-mono z-10">
        <div className="text-2xl mb-8" style={{ color: '#00FF66', textShadow: '0 0 20px #00FF66' }}>
          EASYMONEY SYSTEMS
          <br />
          COMPUTE EXCHANGE BIOS v1.0
        </div>

        <div className="text-sm mb-8 space-y-2" style={{ color: '#00E5FF' }}>
          {stages.map((s, i) => (
            <div key={i} className="flex justify-center gap-8">
              <span>{s.label}...</span>
              <span>{i < stage ? '✓ ' + s.status : '...'}</span>
            </div>
          ))}
        </div>

        {stage === 5 && (
          <div className="space-y-6">
            <div className="text-lg" style={{ color: '#FF00AA', textShadow: '0 0 10px #FF00AA' }}>
              INITIALIZING SWARM ENGINE
            </div>
            <div className="w-64 h-6 border-2" style={{ borderColor: '#00FF66' }}>
              <div
                className="h-full transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: '#00FF66',
                  boxShadow: '0 0 10px #00FF66',
                }}
              />
            </div>
            <div style={{ color: '#FFB000' }}>{Math.round(progress)}%</div>

            {progress >= 100 && (
              <div className="mt-8 space-y-4">
                <div style={{ color: '#00FF66', textShadow: '0 0 20px #00FF66' }} className="text-xl">
                  WELCOME, OPERATOR.
                </div>
                <button
                  onClick={onComplete}
                  className="px-6 py-2 border-2 hover:bg-opacity-20"
                  style={{
                    borderColor: '#00FF66',
                    color: '#00FF66',
                    textShadow: '0 0 10px #00FF66',
                  }}
                >
                  PRESS ENTER TO CONTINUE
                </button>
                <button
                  onClick={onSkip}
                  className="block mx-auto text-xs mt-4 hover:underline"
                  style={{ color: '#00E5FF' }}
                >
                  SKIP BOOT
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
