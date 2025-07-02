import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';
import { Auth } from './pages/Auth';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Layout } from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<Auth type="sign-in" />} />
            <Route path="signup" element={<Auth type="sign-up" />} />
          </Routes>
        </Main>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
