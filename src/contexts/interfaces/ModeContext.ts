export interface IModeContext {
  mode: string;
  toggleMode: (selectedMode: Exclude<ModeType, ''>) => void;
  resetMode: () => void;
}

export type ModeType =
  | 'deposit'
  | 'withdraw'
  | 'finalize'
  | 'success'
  | 'default';
