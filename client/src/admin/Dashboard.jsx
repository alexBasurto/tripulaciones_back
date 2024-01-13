import { useState } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart3 from "./charts/Chart3";
import Chart4 from "./charts/Chart4";

const Dashboard = () => {
    const [chart, setChart] = useState("");

    return (
        <div className="dashboard">
            <div className="lateral">
                <nav>
                    <ul>
                        <li>
                            <button onClick={() => setChart("chart1")}>
                                GRÁFICO 1
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart2")}>
                                GRÁFICO 2
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart3")}>
                                GRÁFICO 3
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setChart("chart4")}>
                                GRÁFICO 4
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="chart-container">
                {chart === "chart1" && <Chart1 />}
                {chart === "chart2" && <Chart2 />}
                {chart === "chart3" && <Chart3 />}
                {chart === "chart4" && <Chart4 />}
            </div>
        </div>
    );
};

export default Dashboard;
