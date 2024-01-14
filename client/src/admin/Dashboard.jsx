import { useState } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart2b from "./charts/Chart2b";
import Chart3 from "./charts/Chart3";
import Chart3b from "./charts/Chart3b";
import Chart4 from "./charts/Chart4";
import Chart4b from "./charts/Chart4b";

const Dashboard = () => {
    const [chart, setChart] = useState("");

    return (
        <div className="dashboard">
            <div className="lateral">
                <nav>
                    <ul>
                        <li>
                            <button onClick={() => setChart("chart1")}>
                                GRÁFICO Lineal Puntuaciones
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart2")}>
                                GRÁFICO Barras Sentimientos
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart2b")}>
                                GRÁFICO Barras Motivos
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart3")}>
                                GRÁFICO Donut Sentimientos
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart3b")}>
                                GRÁFICO Donut Motivos
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart4")}>
                                GRÁFICO NLP Barras
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart4b")}>
                                GRÁFICO NLP Donut
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="chart-container">
                {chart === "chart1" && <Chart1 />}
                {chart === "chart2" && <Chart2 />}
                {chart === "chart2b" && <Chart2b />}
                {chart === "chart3" && <Chart3 />}
                {chart === "chart3b" && <Chart3b />}
                {chart === "chart4" && <Chart4 />}
                {chart === "chart4b" && <Chart4b />}
            </div>
        </div>
    );
};

export default Dashboard;
