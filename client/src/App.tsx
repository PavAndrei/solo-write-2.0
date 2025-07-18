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

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <Main>
          <ToastProvider />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signin" element={<Auth type="sign-in" />} />
            <Route path="/signup" element={<Auth type="sign-up" />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </Main>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
