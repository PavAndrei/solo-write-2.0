import { FC, ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export const Main: FC<MainProps> = ({ children }) => {
  return <div className="relative grow flex flex-col">{children}</div>;
};
