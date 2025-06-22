import { createContext, useContext, useState } from 'react';
import type { IBalanceContext } from './interfaces';

const CURRENT_BALANCE = 1000;
const MAX_DIGITS = 5;

export const BalanceContext = createContext<IBalanceContext>({
  balance: CURRENT_BALANCE,
  inputAmount: '',
  updateBalance: () => {},
  clearInput: () => {},
  addDigit: () => {},
  error: null,
  setError: () => {},
});

export const BalanceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balance, setBalance] = useState<number>(CURRENT_BALANCE);
  const [inputAmount, setInputAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const updateBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
    setInputAmount('');
  };

  const clearInput = () => {
    setInputAmount('');
    setError(null);
  };

  const addDigit = (digit: string) => {
    if (!inputAmount && digit === '0') {
      setError('Value must be positive');
      return;
    }

    if (inputAmount.length >= MAX_DIGITS) {
      setError(`Maximum ${MAX_DIGITS} digits allowed`);
      return;
    }

    setError(null);
    setInputAmount((prevState) => prevState + digit);
  };

  return (
    <BalanceContext.Provider
      value={{
        balance,
        updateBalance,
        inputAmount,
        clearInput,
        addDigit,
        error,
        setError,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = (): IBalanceContext => {
  return useContext(BalanceContext);
};
