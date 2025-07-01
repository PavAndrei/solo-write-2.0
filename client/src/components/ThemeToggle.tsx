import { FaMoon } from 'react-icons/fa';
import { LuSun } from 'react-icons/lu';
import { useDispatch } from 'react-redux';

import { Button } from './Button';
import { toggleTheme } from '../redux/theme/slice';
import { useAppSelector } from '../redux/store';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme.themeColor);

  return (
    <Button
      className="order-2 ml-auto mr-0 md:order-4 md:py-2.5"
      onClickFunc={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? <FaMoon /> : <LuSun />}
    </Button>
  );
};
