import { useModeContext } from './contexts';
import Deposit from './views/deposit/Deposit';
import Finalize from './views/finalize/Finalize';
import Initial from './views/initial/Initial';
import Success from './views/success/Success';
import Withdraw from './views/withdraw/Withdraw';

function App() {
  const { mode } = useModeContext();

  const getCurrentView = () => {
    switch (mode) {
      case 'deposit':
        return <Deposit />;
      case 'withdraw':
        return <Withdraw />;
      case 'finalize':
        return <Finalize />;
      case 'success':
        return <Success />;
      case 'default':
        return <Initial />;
      default:
        return <Initial />;
    }
  };

  return <div className="wrapper">{getCurrentView()}</div>;
}

export default App;
