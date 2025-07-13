import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { checkUserSession } from '../redux/auth/slice';

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        await dispatch(checkUserSession()).unwrap();
      } catch (err) {
        navigate('/signin');
      }
    };

    if (!user && !isLoading) verifySession();
  }, []);

  if (isLoading || (!user && !isLoading)) {
    return <div>Checking session...</div>;
  }

  return <Outlet />;
};
