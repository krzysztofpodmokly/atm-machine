import { PiConfetti } from 'react-icons/pi';

import Heading from '../../components/heading/Heading';
import { useBalanceContext } from '../../contexts';
import './style.scss';

const Success = () => {
  const { balance } = useBalanceContext();
  return (
    <div>
      <Heading as="h3" size="xl">
        Transaction Complete{' '}
        <span>
          <PiConfetti />
        </span>
      </Heading>
      <p className="info">
        Your Total Deposit: <strong>{balance}</strong>
      </p>
    </div>
  );
};

export default Success;
