import React from 'react';
import { CRTOverlay, Scanlines, GlowText } from '@easymoney/ui';

export const EarningsPage: React.FC = () => {
  const earnings = {
    today: Math.random() * 10,
    thisWeek: Math.random() * 70,
    thisMonth: Math.random() * 300,
    pending: Math.random() * 50,
    total: Math.random() * 1000,
  };

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono p-6 relative">
      <CRTOverlay intensity={0.05} />
      <Scanlines />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="border-b-2 border-easymoney-green pb-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ textShadow: '0 0 20px #00FF66' }}>
            EARNINGS // LEDGER
          </h1>
          <div className="text-xs text-easymoney-cyan">DEMO MODE — NOT REAL MONEY</div>
        </div>

        {/* Earnings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'TODAY', value: earnings.today },
            { label: 'THIS WEEK', value: earnings.thisWeek },
            { label: 'THIS MONTH', value: earnings.thisMonth },
            { label: 'PENDING', value: earnings.pending },
            { label: 'TOTAL', value: earnings.total },
          ].map((item) => (
            <div key={item.label} className="border-2 border-easymoney-green p-3 bg-black bg-opacity-50">
              <div className="text-xs text-easymoney-cyan mb-2">{item.label}</div>
              <div className="text-xl font-bold" style={{ textShadow: '0 0 15px #00FF66' }}>
                ${item.value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
          <div className="text-xs text-easymoney-cyan mb-4">RECENT TRANSACTIONS</div>
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="text-xs border-b border-easymoney-green pb-2 flex justify-between">
                <span>{new Date(Date.now() - i * 60000).toLocaleTimeString()}</span>
                <span>JOB-{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</span>
                <span>WORKER-{Math.floor(Math.random() * 100)}</span>
                <GlowText color="green" intensity={1}>
                  +${(Math.random() * 5).toFixed(2)}
                </GlowText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
