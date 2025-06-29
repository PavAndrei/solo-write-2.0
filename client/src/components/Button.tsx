import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClickFunc?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClickFunc }) => {
  return (
    <button
      onClick={onClickFunc}
      className="flex gap-1 items-center border rounded-xl py-1 px-3 cursor-pointer"
    >
      {children}
    </button>
  );
};
