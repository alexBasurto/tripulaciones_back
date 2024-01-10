import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import PreMoodTracker from './pages/PreMoodTracker';
import Feelings from './pages/Feelings';
import Reasons from './pages/Reasons';
import CurMoodTracker from './pages/CurMoodTracker';
import Ending from './pages/Ending';
import LogoutButton from './components/LogoutButton';

import { useSession } from './context/SessionContext';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('loading');
  const { session } = useSession();
  const [registered1, setRegistered1] = useState(false);
  const [registered2, setRegistered2] = useState(false);

  const [preMood, setPreMood] = useState(3);
  const [feelings, setFeelings] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [curMood, setCurMood] = useState(3);

  useEffect(() => {
    if (session === null) {
      setActiveComponent('login');
    } else if (session === 'not-started') {
      setActiveComponent('loading');
    } else {
      setActiveComponent('preMood');
    }
  }
  , [session]);

  return (
    <div className="app">
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

        {(activeComponent == 'loading') && <div className='blur'>Cargando...</div>}

        {activeComponent == 'login' && <Login setActiveComponent={setActiveComponent} /> }
        {activeComponent == 'preMood' && <PreMoodTracker preMood={preMood} setPreMood={setPreMood} /> }
        {activeComponent == 'feelings' && <Feelings preMood={preMood} feelings={feelings} setFeelings={setFeelings} /> }
        {activeComponent == 'reasons' && <Reasons preMood={preMood} reasons={reasons} setReasons={setReasons} /> }
        {registered1 && <div className='blur'>Registrado 1/2</div>}
        {activeComponent == 'curMood' && <CurMoodTracker curMood={curMood} setCurMood={setCurMood} /> }
        {registered2 && <div className='blur'>Registrado 2/2</div>}
        {activeComponent == 'ending' && <Ending/> }

        <p>{preMood}</p>
        <p>{feelings}</p>
        <p>{reasons}</p>
        <p>{curMood}</p>

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

        {session !== null && session!== 'not-started' && <LogoutButton />}
    </div>
  );
};

export default App;
