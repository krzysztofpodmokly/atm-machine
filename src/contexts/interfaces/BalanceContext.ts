export interface IBalanceContext {
  balance: number;
  inputAmount: string;
  updateBalance: (deposit: number) => void;
  clearInput: () => void;
  addDigit: (digit: string) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}
