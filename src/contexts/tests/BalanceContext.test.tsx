import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BalanceContextProvider, useBalanceContext } from '../BalanceContext';

const TestComponent = () => {
  const { inputAmount, addDigit, clearInput, updateBalance, balance, error } =
    useBalanceContext();

  return (
    <div>
      <div data-testid="input">{inputAmount}</div>
      <div data-testid="balance">{balance}</div>
      <div data-testid="error">{error}</div>
      <button onClick={() => addDigit('1')}>Add 1</button>
      <button onClick={() => addDigit('0')}>Add 0</button>
      <button onClick={() => clearInput()}>Clear</button>
      <button onClick={() => updateBalance(500)}>Deposit 500</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <BalanceContextProvider>
      <TestComponent />
    </BalanceContextProvider>,
  );

describe('BalanceContext', () => {
  it('adds a digit normally', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add 1'));
    expect(screen.getByTestId('input')).toHaveTextContent('1');
    expect(screen.getByTestId('error')).toBeEmptyDOMElement();
  });

  it('prevents "0" as the first digit', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add 0'));
    expect(screen.getByTestId('input')).toHaveTextContent('');
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Value must be positive',
    );
  });

  it('limits input to 5 digits', async () => {
    renderWithProvider();
    const add1 = screen.getByText('Add 1');
    for (let i = 0; i < 6; i++) {
      await userEvent.click(add1);
    }
    expect(screen.getByTestId('input')).toHaveTextContent('11111');
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Maximum 5 digits allowed',
    );
  });

  it('clears input and error', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add 1'));
    await userEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('input')).toHaveTextContent('');
    expect(screen.getByTestId('error')).toBeEmptyDOMElement();
  });

  it('updates the balance correctly', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Deposit 500'));
    expect(screen.getByTestId('balance')).toHaveTextContent('1500');
    expect(screen.getByTestId('input')).toHaveTextContent('');
  });
});
