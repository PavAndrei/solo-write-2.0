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
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'cursor-pointer border p-1.5 rounded-sm bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-90 transition-all duration-300 ease-in-out',
          className,
          isActive && 'bg-gray-300 dark:bg-gray-800 border-gray-500 border-2',
          tooltipSelector && tooltipSelector
        )}
      >
        {children}
      </button>
      <Tooltip anchorSelect={`.${tooltipSelector}`} content={message} />
    </>
  );
};
