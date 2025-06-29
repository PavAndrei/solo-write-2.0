import { FC, ReactNode } from 'react';
import { useAppSelector } from '../redux/store';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.themeColor);

  return (
    <div className={theme}>
      <div className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700">{children}</div>
    </div>
  );
};
