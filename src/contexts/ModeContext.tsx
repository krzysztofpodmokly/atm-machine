import { createContext, useContext, useState } from 'react';

import type { IModeContext, ModeType } from './interfaces';

export const ModeContext = createContext<IModeContext>({
  mode: '',
  toggleMode: () => {},
  resetMode: () => {},
});

export const ModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ModeType>('default');

  const toggleMode = (selectedMode: Exclude<ModeType, ''>) => {
    setMode(selectedMode);
  };

  const resetMode = () => setMode('default');

  return (
    <ModeContext.Provider value={{ mode, toggleMode, resetMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useModeContext = (): IModeContext => {
  return useContext(ModeContext);
};
