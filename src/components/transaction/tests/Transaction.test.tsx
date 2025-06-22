import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BalanceContextProvider } from '../../../contexts/BalanceContext';
import { ModeContextProvider } from '../../../contexts/ModeContext';
import Transaction from '../Transaction';

const renderTransaction = (type: 'deposit' | 'withdraw') =>
  render(
    <ModeContextProvider>
      <BalanceContextProvider>
        <Transaction
          transactionType={type}
          title={type === 'deposit' ? 'Deposit' : 'Withdraw'}
        />
      </BalanceContextProvider>
    </ModeContextProvider>,
  );

describe('Transaction Component', () => {
  it('disables ENTER button when input is empty', () => {
    renderTransaction('deposit');
    expect(screen.getByTestId('ENTER')).toBeDisabled();
  });

  it('adds digits via keypad and enables ENTER', async () => {
    renderTransaction('deposit');

    await userEvent.click(screen.getByText('1'));
    await userEvent.click(screen.getByText('2'));
    await userEvent.click(screen.getByText('3'));

    expect(screen.getByRole('input-amount')).toHaveTextContent('123');
    expect(screen.getByText('ENTER')).toBeEnabled();
  });

  it('prevents starting with 0', async () => {
    renderTransaction('deposit');
    await userEvent.click(screen.getByText('0'));
    expect(screen.getByText('Value must be positive')).toBeInTheDocument();
  });

  it('shows error when withdrawing more than balance', async () => {
    renderTransaction('withdraw');

    await userEvent.click(screen.getByTestId('key-9'));
    await userEvent.click(screen.getByTestId('key-9'));
    await userEvent.click(screen.getByTestId('key-9'));
    await userEvent.click(screen.getByTestId('key-9'));

    await userEvent.click(screen.getByText('ENTER'));

    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Value must be lower than current deposit',
    );
  });

  it('clears input and error with CLEAR', async () => {
    renderTransaction('deposit');

    await userEvent.click(screen.getByText('1'));
    await userEvent.click(screen.getByText('CLEAR'));

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('shows confirmation modal on CANCEL click', async () => {
    renderTransaction('deposit');
    await userEvent.click(screen.getByText('CANCEL'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('successfully deposits money and resets view after delay', async () => {
    renderTransaction('deposit');

    for (const digit of ['2', '0', '0']) {
      await userEvent.click(screen.getByText(digit));
    }

    await userEvent.click(screen.getByText('ENTER'));

    await waitFor(
      () => {
        expect(
          screen.queryByText('finalizing transaction'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('DEPOSIT')).toBeInTheDocument();
      },
      { timeout: 7000 },
    );
  });
});
