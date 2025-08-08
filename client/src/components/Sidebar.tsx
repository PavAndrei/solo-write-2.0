import { useEffect, useState } from 'react';
import { FaUsers, FaCog, FaSignOutAlt, FaUserAlt, FaComments } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { GrArticle } from 'react-icons/gr';
import clsx from 'clsx';

const menuItems = [
  { name: 'Profile', icon: <FaUserAlt />, path: 'profile' },
  { name: 'Users', icon: <FaUsers />, path: 'users' },
  { name: 'Articles', icon: <GrArticle />, path: 'articles' },
  { name: 'Comments', icon: <FaComments />, path: 'comments' },
  { name: 'Settings', icon: <FaCog />, path: 'settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <aside className="w-54 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div className="text-2xl font-bold px-6 py-4 border-b border-gray-800">AdminPanel</div>

      <nav className="mt-4 flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={`/dashboard?tab=${item.path}`}
                className={clsx(
                  'flex items-center px-6 py-3 hover:bg-gray-800 transition duration-300 ease-in-out',
                  item.path === tab && 'bg-gray-800'
                )}
              >
                <span className="w-5 h-5 mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-gray-800">
        <button className="flex items-center text-red-400 hover:text-red-300 transition">
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
