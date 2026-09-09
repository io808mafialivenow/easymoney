import React, { useEffect } from 'react';
import { GlowText, ProgressBar, CRTOverlay, Scanlines } from '@easymoney/ui';
import { useSwarm } from '@easymoney/swarm';
import { useDemo } from '@easymoney/demo-engine';

export const SwarmPage: React.FC = () => {
  const { swarms, initializeDemo } = useSwarm();
  const { startSimulation, stopSimulation } = useDemo();

  useEffect(() => {
    initializeDemo(100);
    startSimulation();
    return () => stopSimulation();
  }, [initializeDemo, startSimulation, stopSimulation]);

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono p-6 relative">
      <CRTOverlay intensity={0.05} />
      <Scanlines />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="border-b-2 border-easymoney-green pb-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ textShadow: '0 0 20px #00FF66' }}>
            SWARM // NETWORK
          </h1>
          <div className="text-xs text-easymoney-cyan">ACTIVE SWARMS: {swarms.length}</div>
        </div>

        {/* Swarm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {swarms.slice(0, 12).map((swarm) => (
            <div key={swarm.id} className="border-2 border-easymoney-green p-3 bg-black bg-opacity-50 cursor-pointer hover:border-easymoney-cyan transition-colors">
              <div className="text-sm font-bold mb-2">
                <GlowText color="green">{swarm.id}</GlowText>
              </div>
              <div className="text-xs space-y-2">
                <div>
                  STATUS: <GlowText color={swarm.status === 'ONLINE' ? 'green' : 'red'}>{swarm.status}</GlowText>
                </div>
                <div>AGENTS: {swarm.agentCount}</div>
                <div>ACTIVE JOBS: {swarm.activeJobs}</div>
                <div className="mt-2">
                  <div className="text-xs mb-1">CPU</div>
                  <ProgressBar value={swarm.cpu} max={100} color="green" showLabel={false} />
                </div>
                <div>
                  <div className="text-xs mb-1">GPU</div>
                  <ProgressBar value={swarm.gpu} max={100} color="cyan" showLabel={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
