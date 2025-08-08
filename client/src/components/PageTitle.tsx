import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: string | ReactNode;
  size?: 'sm' | 'lg';
}

export const PageTitle: FC<PageTitleProps> = ({ children, size = 'lg' }) => {
  return (
    <h1
      className={clsx(
        'text-center',
        size === 'lg' && 'text-3xl md:text-4xl lg:text-5xl font-bold mb-10',
        size === 'sm' && 'text-2xl md:text-3xl lg:text-4xl font-semibold mb-5'
      )}
    >
      {children}
    </h1>
  );
};
