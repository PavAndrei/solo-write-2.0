import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div className="font-inter">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
