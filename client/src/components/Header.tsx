import { Link } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';

import { Container } from './Container';
import { Logo } from './Logo';
// import { Navbar } from './Navbar';
import { Button } from './Button';
import { Search } from './Search';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-400 py-4 md:py-6">
      <Container>
        <div className="flex items-center gap-2.5 justify-between">
          <Link to="/">
            <Logo />
          </Link>
          {/* <Navbar /> */}
          <Search />
          <ThemeToggle />
          <div className="flex items-center gap-2.5">
            <Button>
              <IoLogInOutline /> Sign In
            </Button>
            <Button>
              <FaUserPlus />
              Sign Up
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
