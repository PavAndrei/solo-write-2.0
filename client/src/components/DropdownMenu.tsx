import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logout, signoutUser } from '../redux/auth/slice';

interface DropdownMenu {
  visibility: boolean;
  closeDropdown: () => void;
}

export const DropdownMenu: FC<DropdownMenu> = ({ visibility, closeDropdown }) => {
  const navigate = useNavigate();

  const isAuthorized = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleSignout = async () => {
    try {
      await dispatch(signoutUser()).unwrap();
      navigate('/signin');
    } catch (err) {
      console.error('Signout failed:', err);
      dispatch(logout());
      navigate('/signin');
    }
  };

  return (
    <div
      className={clsx(
        'absolute z-50 flex flex-col top-0 right-0 bg-gray-300 dark:bg-gray-800 p-2.5 text-base sm:text-lg w-1/2 text-center rounded-bl-2xl transition-transform duration-300 ease-in-out',
        visibility ? 'translate-y-0' : 'translate-y-[-200%]'
      )}
    >
      <IoClose onClick={closeDropdown} className="self-end text-2xl sm:text-3xl mr-2" />
      <ul className="flex flex-col gap-2.5">
        <li className="border-b border-b-gray-400 pb-2.5">
          <Link to="/dashboard?tab=profile" onClick={closeDropdown}>
            Profile
          </Link>
        </li>
        <li className="border-b border-b-gray-400 pb-2.5">
          <Link to="/editor" onClick={closeDropdown}>
            Write An Article
          </Link>
        </li>
        <li className="border-b border-b-gray-400 pb-2.5">
          <Link to="/articles" onClick={closeDropdown}>
            Articles
          </Link>
        </li>
        {isAuthorized ? (
          <li className="pb-2.5 bg-inherit">
            <button
              onClick={() => {
                handleSignout();
                closeDropdown();
              }}
            >
              Sign Out
            </button>
          </li>
        ) : (
          <>
            <li className="border-b border-b-gray-400 pb-2.5">
              <Link to="/signin" onClick={closeDropdown}>
                Sign In
              </Link>
            </li>
            <li className="border-b border-b-gray-400 pb-2.5">
              <Link to="/signup" onClick={closeDropdown}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
