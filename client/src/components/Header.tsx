import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Container } from './Container';
import { Logo } from './Logo';
import { Button } from './Button';
import { Search } from './Search';
import { ThemeToggle } from './ThemeToggle';
import { DropdownMenu } from './DropdownMenu';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout, signoutUser } from '../redux/auth/slice';

export const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuthorized = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleSignout = async () => {
    try {
      await dispatch(signoutUser()).unwrap();
      navigate('/signin');
    } catch (err) {
      console.error('Signout failed:', err);
      dispatch(logout());
      navigate('/signin');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-400 py-4 md:py-6 transition-colors duration-300 ease-in-out">
      <Container>
        <nav className="flex items-center gap-2.5 justify-between flex-wrap md:flex-nowrap">
          <Link className="order-first" to="/">
            <Logo />
          </Link>
          <Search />

          <ThemeToggle />
          <Button className="order-3 md:hidden" onClickFunc={() => setIsDropdownVisible(true)}>
            <GiHamburgerMenu />
          </Button>

          {isAuthorized ? (
            <Button onClickFunc={handleSignout} className="order-4 hidden md:flex">
              Sign Out
            </Button>
          ) : (
            <div className="items-center gap-2.5 order-4 hidden md:flex">
              <Link to="/signin">
                <Button variant={pathname === '/signin' ? 'dark' : 'light'}>
                  <IoLogInOutline /> Sign In
                </Button>
              </Link>

              <Link to="/signup">
                <Button variant={pathname === '/signup' ? 'dark' : 'light'}>
                  <FaUserPlus /> Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </Container>
      <DropdownMenu
        visibility={isDropdownVisible}
        closeDropdown={() => setIsDropdownVisible(false)}
      />
    </div>
  );
};
