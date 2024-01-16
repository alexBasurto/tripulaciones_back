import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import PreMoodTracker from './pages/PreMoodTracker';
import Feelings from './pages/Feelings';
import Reasons from './pages/Reasons';
import CurMoodTracker from './pages/CurMoodTracker';
import Ending from './pages/Ending';
import LogoutButton from './components/LogoutButton';
import StreakIcons from './components/StreakIcons';
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

  const [justLogged, setJustLogged] = useState(false);


  useEffect(() => {
    if (session === null) {
      setActiveComponent('login');
      } else {
        if (session.latestVoting[0].currentDay === new Date().toISOString().slice(0, 10)) {
          setJustLogged(true);
          setActiveComponent('ending');
        } else {
          setFeelings([]);
          setReasons([]);
          setPreMood(3);
          setCurMood(3);
          setActiveComponent('preMood');
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
        const vote = await createVoteApi(session.idEmployee, session.idCompany, previousDay, preMood, currentDay, curMood);
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
      {(activeComponent === 'feelings' || activeComponent === 'reasons') && (
        <div className="button-container">
          <button
            className="btn-back"
            onClick={() => {
              if (activeComponent === 'feelings') {
                setFeelings([]);
                setActiveComponent('preMood');
              } else if (activeComponent === 'reasons') {
                setActiveComponent('feelings');
              }
            }}
          >
            <span className="back-arrow"><img src="/icons/arrowIcon.svg" alt="Arrow" className='arrow-icon' /></span>
            <span className="header-text">{activeComponent === 'feelings' ? 'Estado de ánimo' : 'Emociones'}</span>
          </button>
        </div>
      )}

      {(activeComponent == 'loading') && <div className='blur'>Cargando...</div>}

      {activeComponent == 'login' && <Login setActiveComponent={setActiveComponent} />}
      {activeComponent == 'preMood' && <PreMoodTracker preMood={preMood} setPreMood={setPreMood} />}
      {activeComponent == 'feelings' && <Feelings preMood={preMood} feelings={feelings} setFeelings={setFeelings} />}
      {activeComponent == 'reasons' && <Reasons preMood={preMood} reasons={reasons} setReasons={setReasons} />}
      {registered1 && <div className='blur'>
        <div className='blur-content'>
          <p className='p-txt'>Registrado 1/2</p>
        </div>
      </div>}
      {activeComponent == 'curMood' && <CurMoodTracker curMood={curMood} setCurMood={setCurMood} />}
      {registered2 && <div className='blur'>
        <div className='blur-content'>
          <span>Registrado 2/2</span>
          <span>¡Gracias por participar!</span>
          <span>Tu racha es de {session.streak + 1} días</span>
          <StreakIcons />

          <span>
            Recuerda que tu voto es anónimo y se registrará junto al de otras {session.employeesCount} personas
            {session.departmentName && ` del departamento ${session.departmentName}`}
            {session.branchName && `, de la sede ${session.branchName}`}
            {session.shiftName && `, del turno ${session.shiftName}`}
            .
          </span>
        </div>

      </div>}

          
        {activeComponent == 'ending' && <Ending justLogged={justLogged} /> }

      {/* <div>
          <p>TEST</p>
          <p>Preemood: {preMood}</p>
          <p>Feelings: {feelings}</p>
          <p>Reasons: {reasons}</p>
          <p>Curmood: {curMood}</p>
          <p>Empleado y empresa {session && session.idEmployee + ' ' + session.idCompany}</p>
          <p>Último voto y racha {session && session.latestVoting[0].currentDay + ' ' + session.streak}</p>
          
        </div> */}

      {(activeComponent == 'preMood' || activeComponent == 'feelings' || activeComponent == 'reasons' || activeComponent == 'curMood') &&

        <button
          className="btn-next text-button"
          onClick={() => {
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

      {session !== null && <LogoutButton />}
    </div>
  );
};

export default App;
