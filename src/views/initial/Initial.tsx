import Button from '../../components/button/Button';
import Heading from '../../components/heading/Heading';
import { useModeContext } from '../../contexts';
import './style.scss';

const Initial = () => {
  const { toggleMode } = useModeContext();

  return (
    <>
      <Heading as="h1" size="xl">
        ATM
      </Heading>
      <div className="buttons">
        <Button text={'DEPOSIT'} onClick={() => toggleMode('deposit')} />
        <Button text={'WITHDRAW'} onClick={() => toggleMode('withdraw')} />
      </div>
    </>
  );
};

export default Initial;
