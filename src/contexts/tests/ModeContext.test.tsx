import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModeContextProvider, useModeContext } from '../ModeContext';

const TestComponent = () => {
  const { mode, toggleMode, resetMode } = useModeContext();

  return (
    <div>
      <div data-testid="mode">{mode}</div>
      <button onClick={() => toggleMode('deposit')}>DEPOSIT</button>
      <button onClick={() => toggleMode('withdraw')}>WITHDRAW</button>
      <button onClick={() => resetMode()}>GO BACK</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <ModeContextProvider>
      <TestComponent />
    </ModeContextProvider>,
  );

describe('ModeContext', () => {
  it('initializes with default mode', () => {
    renderWithProvider();
    expect(screen.getByTestId('mode')).toHaveTextContent('default');
  });

  it('toggles to deposit mode', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('DEPOSIT'));
    expect(screen.getByTestId('mode')).toHaveTextContent('deposit');
  });

  it('toggles to withdraw mode', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('WITHDRAW'));
    expect(screen.getByTestId('mode')).toHaveTextContent('withdraw');
  });

  it('clicks on go back button', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('DEPOSIT'));
    await userEvent.click(screen.getByText('GO BACK'));
    expect(screen.getByTestId('mode')).toHaveTextContent('default');
  });
});
