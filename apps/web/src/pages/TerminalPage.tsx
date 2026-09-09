import React, { useState, useEffect } from 'react';
import { Terminal as TerminalComponent } from '@easymoney/terminal';
import { CRTOverlay, Scanlines } from '@easymoney/ui';
import { useSwarm } from '@easymoney/swarm';
import { useDemo } from '@easymoney/demo-engine';
import { useWallet } from '@easymoney/wallet';

const COMMANDS = {
  help: 'Available commands: help, clear, status, swarm, agents, jobs, earnings, wallet, device, demo',
  clear: '',
  status: () => {
    const { swarms } = useSwarm();
    const { earnings } = useDemo();
    return `SYSTEM ONLINE\nSWARMS ${swarms.length}\nAGENTS 847293\nCPU 63%\nGPU 81%\nJOBS 18421\nEARNINGS $${earnings.toFixed(4)}\nMODE DEMO`;
  },
  swarm: 'Usage: swarm list | swarm inspect <id>',
  agents: 'AGENTS 847293 ONLINE\nAVG STATUS: WORKING 68%',
  jobs: 'ACTIVE JOBS: 1247\nCOMPLETED TODAY: 12847',
  earnings: () => {
    const { earnings } = useDemo();
    return `TODAY: $${earnings.toFixed(2)}\nTHIS WEEK: $${(earnings * 7).toFixed(2)}\nTOTAL: $${(earnings * 30).toFixed(2)}`;
  },
  wallet: () => {
    const { balances } = useWallet();
    return balances.map((b) => `${b.currency}: $${b.balance.toFixed(2)}`).join('\n');
  },
  device: 'DEVICE: Browser\nOS: Linux\nCPU CORES: 8\nMEMORY: 16GB',
  demo: 'Demo mode is ON. All earnings/resources are simulated.',
};

export const TerminalPage: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]);
  const { swarms } = useSwarm();
  const { earnings } = useDemo();
  const { balances } = useWallet();

  const handleCommand = async (command: string): Promise<string> => {
    const cmd = command.toLowerCase().split(' ')[0];
    const handler = COMMANDS[cmd as keyof typeof COMMANDS];

    if (!handler) {
      return `UNKNOWN COMMAND: ${cmd}\nTYPE 'help' FOR AVAILABLE COMMANDS`;
    }

    if (typeof handler === 'function') {
      return handler();
    }

    return handler;
  };

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono p-4 relative">
      <CRTOverlay intensity={0.05} />
      <Scanlines />

      <div className="relative z-10 max-w-4xl mx-auto h-full">
        <TerminalComponent onCommand={handleCommand} />
      </div>
    </div>
  );
};
