import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  message: string;
  tooltipSelector: string;
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({
  onClick,
  disabled,
  className,
  children,
  isActive,
  message,
  tooltipSelector,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        className={clsx(
          'cursor-pointer disabled:cursor-not-allowed p-1.5 rounded-sm bg-gray-200 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-90 transition-all duration-300 ease-in-out border-2 border-gray-400 focus:border-gray-500 dark:focus:outline-2 dark:focus:outline-gray-200',
          isActive &&
            'bg-gray-300 dark:bg-gray-800 border-2 border-gray-400 outline-2 outline-gray-400',
          disabled && 'opacity-50 grayscale hover:bg-gray-200 dark:hover:bg-gray-600',
          className,
          tooltipSelector && tooltipSelector
        )}
      >
        {children}
      </button>
      <Tooltip anchorSelect={`.${tooltipSelector}`} content={message} />
    </>
  );
};
