import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  onClickFunc?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, onClickFunc, className }) => {
  return (
    <button
      onClick={onClickFunc}
      className={clsx(
        'flex gap-1 items-center border rounded-xl py-1 px-3 cursor-pointer',
        className
      )}
    >
      {children}
    </button>
  );
};
