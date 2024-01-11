import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import PreMoodTracker from './pages/PreMoodTracker';
import Feelings from './pages/Feelings';
import Reasons from './pages/Reasons';
import CurMoodTracker from './pages/CurMoodTracker';
import Ending from './pages/Ending';
import LogoutButton from './components/LogoutButton';
import { createVoteApi, createVoteReasonApi, createVoteFeelingApi } from './utils/apiTripu';
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

  const [sendVote, setSendVote] = useState(false);

  useEffect(() => {
    if (session.lastVoting === null) {
      if (session.data === null) {
        setActiveComponent('login');
      } else if (session.data === 'not-started') {
        setActiveComponent('loading');
      } else {
          setActiveComponent('preMood');
      }
    }
  }
  , [session]);

  useEffect(() => {
    if (session.lastVoting !== null) {
    const currentDay = new Date().toISOString().slice(0, 10);
    let lastDay = session.lastVoting.latestVoting.currentDay;
    
    console.log('lastDay', lastDay);
    console.log('currentDay', currentDay);
    

    if (lastDay !== currentDay) {
      setActiveComponent('preMood');
    } else {
      setActiveComponent('ending');
    }
  }
  }
  , [session]);

  useEffect(() => { 
    const sendVoteApi = async () => {
      try {
        if (!sendVote) return;
        const currentDay = new Date().toISOString().slice(0, 10);
        let previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 1);
        previousDay = previousDay.toISOString().slice(0, 10);
        const vote = await createVoteApi(session.data.idEmployee, session.data.idCompany, previousDay, preMood, currentDay, curMood);
        const voteFormated = await vote.json();
          
        for (let i = 0; i < feelings.length; i++) {
          createVoteFeelingApi(voteFormated.idVoting, feelings[i]);
        }
        for (let i = 0; i < reasons.length; i++) {
          createVoteReasonApi(voteFormated.idVoting, reasons[i]);
        }
    } catch (error) {
        console.log(error);
    }
  }
  sendVoteApi();
  }

  , [sendVote]);


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

        <div>
          <p>TEST</p>
          <p>Preemood: {preMood}</p>
          <p>Feelings: {feelings}</p>
          <p>Reasons: {reasons}</p>
          <p>Curmood: {curMood}</p>
          <p>Empleado y empresa {session.data && session.data.idEmployee + ' ' + session.data.idCompany}</p>
          <p>Último voto y racha {session.lastVoting && session.lastVoting.latestVoting.currentDay + ' ' + session.lastVoting.streak}</p>
          
        </div>

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
              setSendVote(true);
              setTimeout(() => {
                setRegistered2(false);
                setActiveComponent('ending');
              }, 3000);
            }
          }
        }>Siguiente</button>}

        {session.data !== null && session.data!== 'not-started' && <LogoutButton />}
    </div>
  );
};

export default App;
