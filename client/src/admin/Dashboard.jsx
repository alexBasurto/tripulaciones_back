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
                            <button className={getButtonClassName("chart1")} onClick={() => setChart("chart1")}>
                                GRÁFICO Lineal Puntuaciones
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart2")} onClick={() => setChart("chart2")}>
                                Estado de ánimo
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart2b")} onClick={() => setChart("chart2b")}>
                                Razones
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart3")} onClick={() => setChart("chart3")}>
                                Sentimientos
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart3b")} onClick={() => setChart("chart3b")}>

                                Razones
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart4")} onClick={() => setChart("chart4")}>
                                NLP Barras
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart4b")} onClick={() => setChart("chart4b")}>
                                NLP Donut
                            </button>
                        </li>
                        <li>
                            <button className={getButtonClassName("chart5")} onClick={() => setChart("chart5")}>
                                Comentarios
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="chart-container dashboard-main">
                {chart === "maintenance" && <Maintenance />}
                {chart === "chart1" && <Chart1 />}
                {chart === "chart2" && <Chart2 />}
                {chart === "chart2b" && <Chart2b />}
                {chart === "chart3" && <Chart3 />}
                {chart === "chart3b" && <Chart3b />}
                {chart === "chart4" && <Chart4 />}
                {chart === "chart4b" && <Chart4b />}
                {chart === "chart5" && <Chart5 />}
            </div>
        </div>
    );
};

export default Dashboard;