import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import PreMoodTracker from './pages/PreMoodTracker';
import Feelings from './pages/Feelings';
import Reasons from './pages/Reasons';
import CurMoodTracker from './pages/CurMoodTracker';
import Ending from './pages/Ending';

import { SessionProvider } from './context/SessionContext';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('login');
  const [registered1, setRegistered1] = useState(false);
  const [registered2, setRegistered2] = useState(false);


 
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
        {registered1 && <div className='blur'>Registrado 1/2</div>}
        {activeComponent == 'curMood' && <CurMoodTracker setActiveComponent={setActiveComponent} /> }
        {registered2 && <div className='blur'>Registrado 2/2</div>}
        {activeComponent == 'ending' && <Ending/> }

        {(activeComponent == 'preMood' || activeComponent == 'feelings' || activeComponent == 'reasons' || activeComponent == 'curMood') &&
        <button onClick={() => 
          {
            if (activeComponent == 'preMood') {
              setActiveComponent('feelings');
            } else if (activeComponent == 'feelings') {
              setActiveComponent('reasons');
            } else if (activeComponent == 'reasons') {
              setRegistered1(true);
              setTimeout(() => {
                setRegistered1(false);
                setActiveComponent('curMood');
              }, 3000);
            } else if (activeComponent == 'curMood') {
              setRegistered2(true);
              setTimeout(() => {
                setRegistered2(false);
                setActiveComponent('ending');
              }, 3000);
            }
          }
        }>Siguiente</button>}

      </SessionProvider>
    </div>
  );
};

export default App;
