import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';
import { Auth } from './pages/Auth';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Layout } from './components/Layout';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastProvider } from './components/ToastProvider';
import { Editor } from './pages/Editor';
import { Articles } from './pages/Articles';
import { SingleArticle } from './pages/SingleArticle';
import { Dashboard } from './pages/Dashboard';
import { useAppDispatch, useAppSelector } from './redux/store';
import { useEffect } from 'react';
import { checkUserSession } from './redux/auth/slice';
import { SpinnerLoading } from './components/SpinnerLoading';

function App() {
  const dispatch = useAppDispatch();

  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <Main>
          <ToastProvider />
          {!isInitialized ? (
            <SpinnerLoading />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor" element={<Editor />} />
              </Route>
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<SingleArticle />} />
              <Route path="/signin" element={<Auth type="sign-in" />} />
              <Route path="/signup" element={<Auth type="sign-up" />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          )}
        </Main>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
