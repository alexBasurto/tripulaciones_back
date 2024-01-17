import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import PreMoodTracker from "./pages/PreMoodTracker";
import Feelings from "./pages/Feelings";
import Reasons from "./pages/Reasons";
import CurMoodTracker from "./pages/CurMoodTracker";
import Ending from "./pages/Ending";
import StreakIcons from "./components/StreakIcons";
import {
    createVoteApi,
    createVoteReasonApi,
    createVoteFeelingApi,
} from "./utils/apiTripu";
import { useSession } from "./context/SessionContext";

const App = () => {
    const [activeComponent, setActiveComponent] = useState("loading");
    const { session } = useSession();
    const [registered1, setRegistered1] = useState(false);
    const [registered2, setRegistered2] = useState(false);
    const [blurBack, setBlurBack] = useState(false);

    const [preMood, setPreMood] = useState(3);
    const [feelings, setFeelings] = useState([]);
    const [reasons, setReasons] = useState([]);
    const [curMood, setCurMood] = useState(3);

    const [sendVote, setSendVote] = useState(false);

    const [justLogged, setJustLogged] = useState(false);

    useEffect(() => {
        if (session === null) {
            setActiveComponent("login");
        } else {
            if (
                session.latestVoting[0].currentDay ===
                new Date().toISOString().slice(0, 10)
            ) {
                setJustLogged(true);
                setActiveComponent("ending");
            } else {
                setFeelings([]);
                setReasons([]);
                setPreMood(3);
                setCurMood(3);
                setActiveComponent("preMood");
            }
        }
    }, [session]);

    useEffect(() => {
        const sendVoteApi = async () => {
            try {
                if (!sendVote) return;
                const currentDay = new Date().toISOString().slice(0, 10);
                let previousDay = new Date();
                previousDay.setDate(previousDay.getDate() - 1);
                previousDay = previousDay.toISOString().slice(0, 10);
                const vote = await createVoteApi(
                    session.idEmployee,
                    session.idCompany,
                    previousDay,
                    preMood,
                    currentDay,
                    curMood
                );
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
        };
        sendVoteApi();
    }, [sendVote]);

    return (
        <div className="app">
            {registered1 && (
                <div className="blur">
                    <div className="blur-content">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle className="fill" cx="15" cy="15" r="11.7647" strokeWidth="1.47059" />
                            <path d="M21.2735 10.6862L12.134 19.8774L9.01855 16.7444" stroke="white" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="p-txt2">Registrado 1/2</p>
                    </div>
                </div>
            )}
            {registered2 && (
                <div className="blur">
                    <div className="blur-content">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle className="fill" cx="15" cy="15" r="11.7647" strokeWidth="1.47059" />
                            <path d="M21.2735 10.6862L12.134 19.8774L9.01855 16.7444" stroke="white" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="p-txt3">Registrado 2/2</p>
                        <p className="p-txt3">¡Gracias por participar!</p>
                        <p className="p-txt3">Tu racha es de {session.streak + 1} días</p>
                        <StreakIcons />
                        <p className="p-txt4">
                            Recuerda que tu voto es anónimo y se registrará
                            junto al de otras {session.employeesCount} personas
                            {session.departmentName &&
                                ` del departamento ${session.departmentName}`}
                            {session.branchName &&
                                `, de la sede ${session.branchName}`}
                            {session.shiftName &&
                                `, del turno ${session.shiftName}`}
                            .
                        </p>
                    </div>
                </div>
            )}

            <div className={`subapp ${blurBack && "blur-back"}`}>
                {(activeComponent === "feelings" ||
                    activeComponent === "reasons") && (
                        <div className="button-container">
                            <button
                                className="btn-back"
                                onClick={() => {
                                    if (activeComponent === "feelings") {
                                        setFeelings([]);
                                        setActiveComponent("preMood");
                                    } else if (activeComponent === "reasons") {
                                        setActiveComponent("feelings");
                                    }
                                }}
                            >
                                <span className="back-arrow">
                                    <img
                                        src="/icons/arrowIcon.svg"
                                        alt="Arrow"
                                        className="arrow-icon"
                                    />
                                </span>
                                <span className="header-text">
                                    {activeComponent === "feelings"
                                        ? "Estado de ánimo"
                                        : "Emociones"}
                                </span>
                            </button>
                        </div>
                    )}

                {activeComponent == "loading" && (
                    <div className="blur">Cargando...</div>
                )}

                {activeComponent == "login" && (
                    <Login setActiveComponent={setActiveComponent} />
                )}
                {activeComponent == "preMood" && (
                    <PreMoodTracker preMood={preMood} setPreMood={setPreMood} />
                )}
                {activeComponent == "feelings" && (
                    <Feelings
                        preMood={preMood}
                        feelings={feelings}
                        setFeelings={setFeelings}
                    />
                )}
                {activeComponent == "reasons" && (
                    <Reasons
                        preMood={preMood}
                        reasons={reasons}
                        setReasons={setReasons}
                    />
                )}
                {activeComponent == "curMood" && (
                    <CurMoodTracker curMood={curMood} setCurMood={setCurMood} />
                )}

                {activeComponent == "ending" && (
                    <Ending justLogged={justLogged} />
                )}

                {(activeComponent == "preMood" ||
                    activeComponent == "feelings" ||
                    activeComponent == "reasons" ||
                    activeComponent == "curMood") && (
                        <button
                            className="btn-next text-button"
                            onClick={() => {
                                if (activeComponent == "preMood") {
                                    setActiveComponent("feelings");
                                } else if (activeComponent == "feelings") {
                                    setActiveComponent("reasons");
                                } else if (activeComponent == "reasons") {
                                    setBlurBack(true);
                                    setRegistered1(true);
                                    setTimeout(() => {
                                        setBlurBack(false);
                                        setRegistered1(false);
                                        setActiveComponent("curMood");
                                    }, 3000);
                                } else if (activeComponent == "curMood") {
                                    setBlurBack(true);
                                    setRegistered2(true);
                                    setSendVote(true);
                                    setTimeout(() => {
                                        setBlurBack(false);
                                        setRegistered2(false);
                                        setActiveComponent("ending");
                                    }, 6000);
                                }
                            }}
                        >
                            Siguiente
                        </button>
                    )}

            </div>
        </div>
    );
};

export default App;
