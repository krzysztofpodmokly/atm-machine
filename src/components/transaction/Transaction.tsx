import { useState } from 'react';
import { MdArrowBack, MdArrowOutward, MdClear } from 'react-icons/md';

import { useBalanceContext, useModeContext } from '../../contexts';
import Button from '../button/Button';
import Heading from '../heading/Heading';
import Modal from '../modal/Modal';
import type { ITransaction } from './interfaces';
import './style.scss';

const Transaction = ({ transactionType, title }: ITransaction) => {
  const { resetMode } = useModeContext();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { toggleMode } = useModeContext();
  const {
    balance,
    updateBalance,
    inputAmount,
    clearInput,
    addDigit,
    error,
    setError,
  } = useBalanceContext();

  const isDisabled = inputAmount === '' || error !== null;

  const handleSubmit = async () => {
    if (transactionType === 'withdraw' && parseInt(inputAmount) > balance) {
      setError('Value must be lower than current deposit');
      return;
    }

    toggleMode('finalize');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toggleMode('success');

    const amount = parseInt(inputAmount);
    updateBalance(transactionType === 'deposit' ? amount : -amount);

    await new Promise((resolve) => setTimeout(resolve, 4000));
    toggleMode('default');
  };

  return (
    <>
      <div>
        <Heading as="h2" size="xl" className="mb-lg">
          {transactionType === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'}
        </Heading>

        <div className="atm-grid">
          <div className="back-wrapper">
            <div onClick={resetMode} className="back-btn">
              <MdArrowBack />
            </div>
          </div>
          <div className="amount">
            <Heading as="h3" size="s">
              Amount to {title.toLowerCase()}
            </Heading>
            {error && (
              <span className="error" data-testid="error">
                {error}
              </span>
            )}
            <br />
            <output role="input-amount">{inputAmount || '\u00A0'}</output>
          </div>
          <div className="balance">
            <Heading as="h3" size="s">
              Current balance
            </Heading>
            <br />
            <output>{balance}</output>
          </div>

          <div className="keypad">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(
              (digit: string) => (
                <button
                  key={digit}
                  onClick={() => addDigit(digit)}
                  data-testid={`key-${digit}`}
                >
                  {digit}
                </button>
              ),
            )}
          </div>

          <div className="actions">
            <Button
              text={'CANCEL'}
              onClick={() => setIsModalOpened(true)}
              className="w-full"
              icon={<MdClear />}
            />
            <Button text={'CLEAR'} onClick={clearInput} className="w-full" />
            <Button
              text={'ENTER'}
              onClick={handleSubmit}
              isDisabled={!!isDisabled}
              className="w-full"
              icon={<MdArrowOutward />}
              testId="ENTER"
            />
          </div>
        </div>
      </div>
      {isModalOpened && <Modal closeModal={() => setIsModalOpened(false)} />}
    </>
  );
};

export default Transaction;
