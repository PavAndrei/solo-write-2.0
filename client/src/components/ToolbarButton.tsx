import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
  isActive,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'cursor-pointer border p-1.5 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-90',
        className,
        isActive && 'bg-gray-300 dark:bg-gray-800'
      )}
    >
      {children}
    </button>
  );
};
