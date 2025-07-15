import { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: string | ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">{children}</h1>
  );
};
