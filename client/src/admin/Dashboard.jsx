import { useState } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart2b from "./charts/Chart2b";
import Chart3 from "./charts/Chart3";
import Chart3b from "./charts/Chart3b";
import Chart4 from "./charts/Chart4";
import Chart4b from "./charts/Chart4b";
import Chart5 from "./charts/Chart5";
import Maintenance from "./maintenance/Maintenance";
import "./Dashboard.css";

const Dashboard = () => {
    const [chart, setChart] = useState("maintenance");

    const getButtonClassName = (chartName) => {
        return chart === chartName ? "active" : "";
    };

    return (
        <div className="dashboard">
            <div className="lateral-menu">
                <img src="public/logo.svg" alt="Moodly Logo" />
                <nav>
                    <ul>
                        <li>
                            <button className={getButtonClassName("maintenance")} onClick={() => setChart("maintenance")}>
                                Mantenimiento
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("puntuaciones")} onClick={() => setChart("puntuaciones")}>
                                Puntuaciones
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("emociones")} onClick={() => setChart("emociones")}>
                                Emociones
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("reasons")} onClick={() => setChart("reasons")}>
                                Razones
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("nlp")} onClick={() => setChart("nlp")}>
                                NLP
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("votings")} onClick={() => setChart("votings")}>
                                Comentarios
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="chart-container dashboard-main">
                {chart === "puntuaciones" && 
                    <>
                        <h2>Media mensual de puntajes del trabajador a lo largo del tiempo</h2>
                        <Chart1 />
                    </>
                }
                {chart === "emociones" &&
                    <>
                        <h2>Emociones</h2>
                        <Chart2 />
                        <Chart3 />
                    </>
                }
                {chart === "reasons" &&
                    <>
                        <h2>Razones</h2>
                        <Chart2b />
                        <Chart3b />
                    </>
                }
                {chart === "nlp" &&
                    <>
                        <h2>NLP</h2>
                        <Chart4 />
                        <Chart4b />
                    </>
                }
                {chart === "votings" && 
                    <>
                        <h2>Comentarios</h2>
                        <Chart5 />
                    </>
                }
                

                {chart === "maintenance" && <Maintenance />}
            </div>
        </div>
    );
};

export default Dashboard;