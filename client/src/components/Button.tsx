import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  onClickFunc?: () => void;
  className?: string;
  size?: 'sm' | 'lg';
  variant?: 'dark' | 'light';
  center?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export const Button: FC<ButtonProps> = ({
  children,
  onClickFunc,
  className,
  size = 'sm',
  variant = 'light',
  center,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClickFunc}
      className={clsx(
        'flex gap-1 items-center text-center justify-center rounded-xl cursor-pointer border-1 text-sm md:text-base lg:text-lg font-medium transition-all duration-300 ease-in-out hover:scale-95 active:scale-90',
        size === 'sm' && 'py-1.5 px-2.5',
        size === 'lg' && 'py-3.5 px-12 font-semibold',
        variant === 'dark' &&
          'bg-gradient-to-r from-gray-900 to-gray-400 text-gray-100 border-gray-400',
        variant === 'light' &&
          'bg-gradient-to-r from-gray-400 to-gray-100 text-gray-900 border-gray-500 ',
        center && 'mx-auto',
        className
      )}
    >
      {children}
    </button>
  );
};
