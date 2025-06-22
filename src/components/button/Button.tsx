import type { IButtonProps } from './interfaces';

import './style.scss';

const Button = ({
  onClick,
  text,
  icon,
  className,
  isDisabled,
  testId,
}: IButtonProps) => {
  return (
    <div>
      <button
        className={['button', className].filter(Boolean).join(' ')}
        onClick={onClick}
        disabled={isDisabled}
        data-testid={testId}
      >
        <span>{text}</span>
        {icon && <span className="icon">{icon}</span>}
      </button>
    </div>
  );
};

export default Button;
