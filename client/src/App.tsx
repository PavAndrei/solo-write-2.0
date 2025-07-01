import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';
import { Auth } from './pages/Auth';
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="font-inter">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Auth type="sign-in" />} />
          <Route path="signup" element={<Auth type="sign-up" />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
