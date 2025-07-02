import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="font-inter flex flex-col min-h-[100vh]">{children}</div>;
};
