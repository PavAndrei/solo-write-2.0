import { useEffect, useState } from 'react';
import { DashProfile } from '../components/DashProfile';
import { Sidebar } from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import { DashArticles } from '../components/DashArticles';
import { DashUsers } from '../components/DashUsers';
import { DashComments } from '../components/DashComments';

export const Dashboard = () => {
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
    <div className="flex gap-2">
      <Sidebar />
      <div>
        {tab === 'profile' && <DashProfile />}
        {tab === 'articles' && <DashArticles />}
        {tab === 'users' && <DashUsers />}
        {tab === 'comments' && <DashComments />}
      </div>
    </div>
  );
};
