export interface IButtonProps {
  icon?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  testId?: string;
  text: string;
  onClick: () => void;
}
