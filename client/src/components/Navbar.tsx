import { FC, ReactNode } from 'react';

interface NavbarProps {
  children: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-2.5 justify-between flex-wrap md:flex-nowrap">
      {children}
    </div>
  );
};
