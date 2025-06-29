import { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="my-0 mx-auto px-[5px] md:px-2.5 max-w-[1440px]">{children}</div>;
};
