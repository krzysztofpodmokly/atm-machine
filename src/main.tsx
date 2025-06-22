import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BalanceContextProvider, ModeContextProvider } from './contexts';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModeContextProvider>
      <BalanceContextProvider>
        <App />
      </BalanceContextProvider>
    </ModeContextProvider>
  </StrictMode>,
);
