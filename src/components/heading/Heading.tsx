import type { IHeadingProps } from './interfaces';
import './style.scss';

const Heading = ({
  as: Comp = 'h1',
  className,
  size = 'm',
  children,
}: IHeadingProps) => {
  return (
    <Comp className={['heading', className, size].filter(Boolean).join(' ')}>
      {children}
    </Comp>
  );
};

export default Heading;
