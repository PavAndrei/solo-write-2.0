import { useAppSelector } from '../redux/store';

export const Profile = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
};
