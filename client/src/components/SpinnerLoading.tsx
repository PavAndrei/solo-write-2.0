import clsx from 'clsx';
import { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface SpinnerLoadingProps {
  className?: string;
}

export const SpinnerLoading: FC<SpinnerLoadingProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-opacity-50 z-50',
        className
      )}
    >
      <FaSpinner className="animate-spin text-4xl" />
    </div>
  );
};
