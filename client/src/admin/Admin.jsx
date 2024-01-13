import { useEffect, useState } from 'react';
import './App.css';
import LoginAdmin from './LoginAdmin';
import Dashboard from './Dashboard';
import LogoutButton from '../components/LogoutButton';
import { useSession } from '../context/SessionContext';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('loading');
  const { session } = useSession();

  useEffect(() => {
    if (session === null) {
      setActiveComponent('login');
      } else {
        setActiveComponent('dashboard');
    } 
  }
    , [session]);

  return (
    <div className="admin">
    {(activeComponent == 'loading') && <div className='blur'>Cargando...</div>}
    {activeComponent == 'login' && <LoginAdmin setActiveComponent={setActiveComponent} /> }
    {activeComponent == 'dashboard' && <Dashboard />}
    {session !== null && <LogoutButton />}
    </div>
  );
};

export default Admin;
