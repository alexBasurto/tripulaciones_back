import { useEffect, useState } from 'react';
import LoginAdmin from './LoginAdmin';
import Dashboard from './Dashboard';
import LogoutAdminButton from './LogoutAdminButton';
import { useSession } from './SessionAdminContext';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('loading');
  const { session } = useSession();

  useEffect(() => {
    // si session no tiene la propiedad isAdmin, entonces setear activeComponent a 'login'

    if (session && session.isAdmin === 'isAdmin') {
      setActiveComponent('dashboard');
    } else {
      setActiveComponent('login');
    }
  }
    , [session]);

  return (
    <div className="admin">
    {(activeComponent == 'loading') && <div className='blur'>Cargando...</div>}
    {activeComponent == 'login' && <LoginAdmin setActiveComponent={setActiveComponent} /> }
    {activeComponent == 'dashboard' && <Dashboard />}
    {activeComponent == 'dashboard' && <LogoutAdminButton />}
    </div>
  );
};

export default Admin;
