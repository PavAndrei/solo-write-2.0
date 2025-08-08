import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

export const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="signin" />;
};
