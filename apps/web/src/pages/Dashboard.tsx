import React from 'react';
import { GlowText, ProgressBar, CRTOverlay, Scanlines } from '@easymoney/ui';
import { useSwarm } from '@easymoney/swarm';
import { useDemo } from '@easymoney/demo-engine';
import { useWallet } from '@easymoney/wallet';

export const Dashboard: React.FC = () => {
  const { swarms } = useSwarm();
  const { earnings } = useDemo();
  const { balances } = useWallet();

  const totalAgents = swarms.reduce((sum, s) => sum + s.agentCount, 0);
  const onlineSwarms = swarms.filter((s) => s.status === 'ONLINE').length;
  const avgCPU = (swarms.reduce((sum, s) => sum + s.cpu, 0) / swarms.length) || 0;
  const avgGPU = (swarms.reduce((sum, s) => sum + s.gpu, 0) / swarms.length) || 0;
  const avgStorage = (swarms.reduce((sum, s) => sum + s.storage, 0) / swarms.length) || 0;
  const walletBalance = balances[0]?.balance || 0;

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono p-6 relative">
      <CRTOverlay intensity={0.05} />
      <Scanlines />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-easymoney-green pb-4 mb-6">
          <div className="text-2xl font-bold" style={{ textShadow: '0 0 20px #00FF66' }}>
            EASYMONEY // COMMAND DECK
          </div>
          <div className="text-xs text-easymoney-cyan">DEMO MODE — NOT REAL MONEY</div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* System Status */}
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-2">● SYSTEM STATUS</div>
            <div className="text-2xl mb-4">
              <GlowText color="green" intensity={1.5}>
                ● ONLINE
              </GlowText>
            </div>
            <div className="text-xs space-y-1">
              <div>SWARMS {onlineSwarms} / {swarms.length}</div>
              <div>AGENTS {totalAgents} / 1000000</div>
            </div>
          </div>

          {/* CPU Utilization */}
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-2">CPU UTILIZATION</div>
            <ProgressBar value={avgCPU} max={100} color="green" showLabel={true} />
          </div>

          {/* GPU Utilization */}
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-2">GPU UTILIZATION</div>
            <ProgressBar value={avgGPU} max={100} color="cyan" showLabel={true} />
          </div>

          {/* Storage Utilization */}
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-2">STORAGE UTILIZATION</div>
            <ProgressBar value={avgStorage} max={100} color="amber" showLabel={true} />
          </div>

          {/* Jobs Per Second */}
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-2">JOBS/SEC</div>
            <div className="text-3xl font-bold" style={{ textShadow: '0 0 15px #00FF66' }}>
              {(Math.random() * 20000).toFixed(0)}
            </div>
          </div>

          {/* Demo Earnings */}
          <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
            <div className="text-xs text-easymoney-cyan mb-2">DEMO EARNINGS</div>
            <div className="text-3xl font-bold" style={{ textShadow: '0 0 15px #00FF66' }}>
              ${earnings.toFixed(4)}/sec
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="border-2 border-easymoney-magenta p-4 bg-black bg-opacity-50">
          <div className="text-xs text-easymoney-magenta mb-2">WALLET BALANCE</div>
          <div className="text-4xl font-bold" style={{ textShadow: '0 0 20px #FF00AA' }}>
            ${walletBalance.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
