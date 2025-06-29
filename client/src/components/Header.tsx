import { Container } from './Container';
import { Logo } from './Logo';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <div className="border-b border-gray-400 py-4 md:py-6">
      <Container>
        <div className="flex items-center gap-2.5 justify-between">
          <Logo />
          <Navbar />
          <div className="flex items-center gap-2.5">
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
        </div>
      </Container>
    </div>
  );
};
