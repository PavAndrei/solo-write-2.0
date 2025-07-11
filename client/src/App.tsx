import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';
import { Auth } from './pages/Auth';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Layout } from './components/Layout';
import { useAppDispatch } from './redux/store';
import { checkUserSession } from './redux/auth/slice';
import { useEffect } from 'react';
import { Profile } from './pages/Profile';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
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
