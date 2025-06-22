import { useModeContext } from '../../contexts';
import Button from '../button/Button';
import Heading from '../heading/Heading';
import type { IModalProps } from './interfaces';
import './style.scss';

const Modal = ({ closeModal }: IModalProps) => {
  const { resetMode } = useModeContext();

  return (
    <div className="modal-container" role="dialog">
      <div className="backdrop" onClick={closeModal} />
      <div className="modal-content">
        <Heading as="h2" size="xl">
          Do you want to cancel the operation?
        </Heading>
        <div className="modal-buttons">
          <Button
            className="modal-close-button"
            onClick={resetMode}
            text={'YES'}
          />
          <Button
            className="modal-close-button"
            onClick={closeModal}
            text={'NO'}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
