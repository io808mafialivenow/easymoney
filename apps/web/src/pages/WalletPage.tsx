import React, { useEffect } from 'react';
import { GlowText, CRTOverlay, Scanlines } from '@easymoney/ui';
import { useWallet } from '@easymoney/wallet';
import { useDemo } from '@easymoney/demo-engine';

export const WalletPage: React.FC = () => {
  const { balances, transactions, addTransaction } = useWallet();
  const { startSimulation, stopSimulation } = useDemo();

  useEffect(() => {
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  return (
    <div className="min-h-screen bg-black text-easymoney-green font-mono p-6 relative">
      <CRTOverlay intensity={0.05} />
      <Scanlines />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="border-b-2 border-easymoney-green pb-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ textShadow: '0 0 20px #00FF66' }}>
            WALLET // ACCOUNTS
          </h1>
          <div className="text-xs text-easymoney-cyan">DEMO MODE — NOT REAL MONEY</div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {balances.map((balance) => (
            <div key={balance.currency} className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
              <div className="text-xs text-easymoney-cyan mb-2">{balance.currency}</div>
              <div className="text-3xl font-bold" style={{ textShadow: '0 0 15px #00FF66' }}>
                ${balance.balance.toFixed(2)}
              </div>
              <div className="text-xs mt-2 space-y-1">
                <div>AVAILABLE: ${balance.available.toFixed(2)}</div>
                <div>PENDING: ${balance.pending.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        <div className="border-2 border-easymoney-green p-4 bg-black bg-opacity-50">
          <div className="text-xs text-easymoney-cyan mb-4">TRANSACTION HISTORY</div>
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-easymoney-cyan">NO TRANSACTIONS YET</div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 10).map((tx) => (
                <div key={tx.id} className="text-xs border-b border-easymoney-green pb-2 flex justify-between">
                  <span>{new Date(tx.timestamp).toLocaleString()}</span>
                  <span>{tx.type}</span>
                  <GlowText color="green" intensity={1}>
                    ${tx.amount.toFixed(2)}
                  </GlowText>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
