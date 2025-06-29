import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Container } from './Container';
import { Logo } from './Logo';
import { Button } from './Button';
import { Search } from './Search';
import { ThemeToggle } from './ThemeToggle';
import { DropdownMenu } from './DropdownMenu';

export const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

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
          <div className="items-center gap-2.5 order-4 hidden md:flex">
            <Button>
              <IoLogInOutline /> Sign In
            </Button>
            <Button>
              <FaUserPlus />
              Sign Up
            </Button>
          </div>
        </nav>
      </Container>
      <DropdownMenu
        visibility={isDropdownVisible}
        closeDropdown={() => setIsDropdownVisible(false)}
      />
    </div>
  );
};
