import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import PreMoodTracker from './pages/PreMoodTracker';
import Feelings from './pages/Feelings';
import Reasons from './pages/Reasons';
import Registered from './pages/Registered';
import CurMoodTracker from './pages/CurMoodTracker';
import Ending from './pages/Ending';

import { SessionProvider } from './context/SessionContext';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('login');
  const [registered, setRegistered] = useState(false);


 
  return (
    <div className="app">
      <SessionProvider>
        {(activeComponent == 'feelings' || activeComponent == 'reasons') &&
        <button onClick={() => {
          if (activeComponent == 'feelings') {
            setActiveComponent('preMood');
          } else if (activeComponent == 'reasons') {
            setActiveComponent('feelings');
          }
        }
        }>
          {activeComponent === 'feelings' ? 'Estado de ánimo' : activeComponent === 'reasons' ? 'Emociones' : 'Atrás'}
          </button>}
        {activeComponent == 'login' && <Login setActiveComponent={setActiveComponent} /> }
        {activeComponent == 'preMood' && <PreMoodTracker setActiveComponent={setActiveComponent} /> }
        {activeComponent == 'feelings' && <Feelings setActiveComponent={setActiveComponent} /> }
        {activeComponent == 'reasons' && <Reasons setActiveComponent={setActiveComponent} /> }
        {registered && <div className='blur'>Registrado</div>}
        {activeComponent == 'registered' && <Registered setActiveComponent={setActiveComponent} /> }
        {activeComponent == 'curMood' && <CurMoodTracker setActiveComponent={setActiveComponent} /> }
        {activeComponent == 'ending' && <Ending/> }

        {(activeComponent == 'preMood' || activeComponent == 'feelings' || activeComponent == 'reasons' || activeComponent == 'curMood') &&
        <button onClick={() => 
          {
            if (activeComponent == 'preMood') {
              setActiveComponent('feelings');
            } else if (activeComponent == 'feelings') {
              setActiveComponent('reasons');
            } else if (activeComponent == 'reasons') {
              setRegistered(true);
              setTimeout(() => {
                setRegistered(false);
                setActiveComponent('curMood');
              }, 3000);
            } else if (activeComponent == 'curMood') {
              setActiveComponent('ending');
            }
          }
        }>Siguiente</button>}

      </SessionProvider>
    </div>
  );
};

export default App;
