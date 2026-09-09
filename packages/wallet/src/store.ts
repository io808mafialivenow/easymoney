import { create } from 'zustand';
import { WalletBalance, Transaction } from '@easymoney/shared';

interface WalletState {
  balances: WalletBalance[];
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getBalance: (currency: string) => WalletBalance | undefined;
}

export const useWallet = create<WalletState>((set, get) => ({
  balances: [
    { currency: 'DEMO_USD', balance: 284.61, available: 250.0, pending: 34.61 },
    { currency: 'DEMO_USDC', balance: 100.0, available: 100.0, pending: 0 },
    { currency: 'DEMO_EASY', balance: 5000.0, available: 5000.0, pending: 0 },
  ],
  transactions: [],
  addTransaction: (transaction: Transaction) => {
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    }));
  },
  getBalance: (currency: string) => {
    return get().balances.find((b) => b.currency === currency);
  },
}));
